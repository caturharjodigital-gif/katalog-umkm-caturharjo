import { json } from '@sveltejs/kit';
import { del } from '@vercel/blob';

export async function POST({ request }) {
	const token = process.env.BLOB_READ_WRITE_TOKEN;
	if (!token) return json({ error: 'BLOB_READ_WRITE_TOKEN belum diisi.' }, { status: 400 });

	let body;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Body JSON tidak valid.' }, { status: 400 });
	}

	const url = String(body?.url || '').trim();
	if (!url) return json({ error: 'url wajib diisi.' }, { status: 400 });
	if (!url.includes('.public.blob.vercel-storage.com')) {
		return json({ error: 'Hanya Blob URL yang bisa dihapus.' }, { status: 400 });
	}

	try {
		await del(url, { token });
		return json({ ok: true });
	} catch (e) {
		return json({ error: e?.message || String(e) }, { status: 500 });
	}
}
