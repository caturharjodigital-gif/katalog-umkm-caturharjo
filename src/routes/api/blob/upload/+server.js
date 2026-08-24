import { put } from '@vercel/blob';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const token = process.env.BLOB_READ_WRITE_TOKEN;
	if (!token) {
		return json({ error: 'BLOB_READ_WRITE_TOKEN belum diisi (.env). Upload dinonaktifkan.' }, { status: 400 });
	}

	const form = await request.formData();
	const file = form.get('file');
	if (!file || typeof file === 'object' && !file.arrayBuffer) {
		return json({ error: 'File tidak ditemukan.' }, { status: 400 });
	}

	// @vercel/blob expects a File/Blob
	const blob = await put(file.name || `upload-${Date.now()}`, file, {
		access: 'public',
		addRandomSuffix: true,
		token
	});

	return json({ url: blob.url, pathname: blob.pathname });
}
