import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth.js';

export async function load({ locals, request }) {
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
					msg = body?.message || body?.error || msg;
				} catch {}
				return fail(400, { error: msg, email });
			}

			const raw = res.headers.get('set-cookie');
			if (raw) {
				for (const c of raw.split(', ')) {
					const [kv, ...rest] = c.split(';');
					if (!kv || !kv.includes('=')) continue;
					const idx = kv.indexOf('=');
					const k = kv.slice(0, idx).trim();
					const v = kv.slice(idx + 1).trim();
					if (!k || !v) continue;
					const opts = { path: '/' };
					for (const part of rest) {
						const p = part.trim().toLowerCase();
						if (p.startsWith('max-age=')) opts.maxAge = parseInt(p.split('=')[1], 10);
						if (p === 'httponly') opts.httpOnly = true;
						if (p === 'secure') opts.secure = true;
						if (p.startsWith('samesite=')) {
							const val = p.split('=')[1];
							if (val) opts.sameSite = val;
						}
					}
					cookies.set(k, v, opts);
				}
			}

			throw redirect(303, '/admin');
		} catch (e) {
			if (e?.status === 303 || e?.status === 302) throw e;
			console.error('[login] signInEmail error', e);
			const msg = e?.message || 'Internal Error';
			return fail(400, { error: msg, email });
		}
	}
};
