import { del } from '@vercel/blob';

function isBlobUrl(url) {
	if (!url || typeof url !== 'string') return false;
	return url.includes('.public.blob.vercel-storage.com');
}

export async function deleteBlobUrl(url, token) {
	if (!isBlobUrl(url)) return;
	try {
		const t = token || process.env.BLOB_READ_WRITE_TOKEN;
		if (!t) return;
		await del(url, { token: t });
	} catch {}
}

export function collectBlobUrls(row) {
	const urls = [];
	if (isBlobUrl(row?.foto_utama)) urls.push(row.foto_utama);
	for (const p of row?.produk_layanan || []) {
		if (isBlobUrl(p?.foto_produk)) urls.push(p.foto_produk);
	}
	return urls;
}

export { isBlobUrl };
