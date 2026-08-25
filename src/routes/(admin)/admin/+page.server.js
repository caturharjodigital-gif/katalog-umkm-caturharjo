import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db.js';
import { umkm } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';
import { auth } from '$lib/server/auth.js';

export async function load({ request, parent, url }) {
	const { user } = await parent();
	const rows = await db.select().from(umkm);
	const toast = url.searchParams.get('toast') ? decodeURIComponent(url.searchParams.get('toast')) : null;
	return { rows, user, toast };
}

export const actions = {
	logout: async ({ request, cookies }) => {
		try {
			const res = await auth.api.signOut({ headers: request.headers, asResponse: true });
			const raw = res.headers.get('set-cookie');
			if (raw) {
				for (const c of raw.split(', ')) {
					const [kv] = c.split(';');
					if (!kv || !kv.includes('=')) continue;
					const idx = kv.indexOf('=');
					const k = kv.slice(0, idx).trim();
					if (!k) continue;
					cookies.delete(k, { path: '/' });
				}
			}
		} catch {}
		throw redirect(303, '/admin/login');
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = String(data.get('id') || '').trim();
		if (!id) return fail(400, { error: 'ID tidak valid.' });

		// Collect blobs first then delete row then delete blobs
		let blobUrls = [];
		try {
			const rows = await db.select().from(umkm).where(eq(umkm.id, id));
			if (rows.length) {
				const r = rows[0];
				const { collectBlobUrls } = await import('$lib/server/blob.js');
				blobUrls = collectBlobUrls(r);
			}
		} catch {}

		try {
			await db.delete(umkm).where(eq(umkm.id, id));
		} catch (e) {
			return fail(500, { error: e?.message || 'Gagal menghapus.' });
		}

		for (const u of blobUrls) {
			const { deleteBlobUrl } = await import('$lib/server/blob.js');
			await deleteBlobUrl(u);
		}

		return { success: true, deletedId: id };
	}
};
