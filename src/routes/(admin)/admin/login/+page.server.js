import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth.js';

export async function load({ request }) {
	try {
		const session = await auth.api.getSession({ headers: request.headers });
		if (session?.user) throw redirect(302, '/admin');
	} catch (e) {
		if (e?.status === 302) throw e;
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = String(data.get('email') || '').trim();
		const password = String(data.get('password') || '');

		if (!email || !password) {
			return fail(400, { error: 'Email dan password wajib diisi.', email });
		}

		try {
			const res = await auth.api.signInEmail({
				body: { email, password },
				headers: request.headers,
				asResponse: true
			});

			if (!res.ok) {
				let msg = 'Email atau password salah.';
				try {
					const body = await res.json();
					msg = body?.message || body?.error || body?.body?.message || msg;
				} catch {}
				return fail(400, { error: msg, email });
			}

			// Forward Set-Cookie from internal Better Auth response to browser cookies
			const setCookie = res.headers.get('set-cookie');
			if (setCookie) {
				// Manual split: Better Auth may combine multiple cookies with ', ' but dates also contain ', '
				// Simpler: use getSetCookie if available, else regex split
				const raw = res.headers.getSetCookie ? res.headers.getSetCookie() : splitSetCookie(setCookie);
				for (const c of raw) {
					const [kv, ...rest] = c.split(';');
					if (!kv || !kv.includes('=')) continue;
					const eq = kv.indexOf('=');
					const k = kv.slice(0, eq).trim();
					const v = kv.slice(eq + 1).trim();
					if (!k || v === undefined) continue;
					const opts = { path: '/', httpOnly: false, secure: false, sameSite: 'lax' };
					for (const part of rest) {
						const p = part.trim().toLowerCase();
						if (p.startsWith('max-age=')) opts.maxAge = parseInt(p.split('=')[1], 10);
						if (p === 'httponly') opts.httpOnly = true;
						if (p.startsWith('samesite=')) {
							const val = p.split('=')[1];
							if (val) opts.sameSite = val;
						}
						// secure hanya jika https / production
						if (p === 'secure') opts.secure = false;
					}
					// Vite dev is http — force insecure so cookie sticks
					cookies.set(k, decodeURIComponent(v), opts);
				}
			}

			throw redirect(303, '/admin');
		} catch (e) {
			if (e?.status === 303 || e?.status === 302) throw e;
			const msg = e?.body?.message || e?.message || 'Internal Error';
			console.error('[login] signInEmail error', e);
			return fail(400, { error: msg, email });
		}
	}
};

function splitSetCookie(header) {
	// Split combined Set-Cookie where commas inside Expires confuse naive split
	const parts = [];
	let current = '';
	let inExpires = false;
	for (let i = 0; i < header.length; i++) {
		const ch = header[i];
		if (ch === ',' && header.slice(i + 1, 2).trim() !== ';' && !header.slice(i - 7, i).toLowerCase().includes('expires')) {
			parts.push(current.trim());
			current = '';
			continue;
		}
		current += ch;
	}
	if (current.trim()) parts.push(current.trim());
	return parts.length ? parts : [header];
}
