import { db } from '$lib/server/db.js';
import { umkm } from '$lib/server/schema.js';

export async function load({ url }) {
	const q = (url.searchParams.get('q') || '').trim().toLowerCase();
	const kat = url.searchParams.get('kat') || '';

	let all = await db.select().from(umkm);

	// Filter kategori (AND)
	if (kat) {
		all = all.filter((u) => u.kategori === kat);
	}

	// Filter search case-insensitive: nama_usaha + produk_layanan + deskripsi
	if (q) {
		all = all.filter((u) => {
			const haystack = [
				u.nama_usaha || '',
				u.deskripsi || '',
				...(Array.isArray(u.produk_layanan)
					? u.produk_layanan.map((p) => p?.nama_produk || '')
					: [])
			]
				.join(' ')
				.toLowerCase();
			return haystack.includes(q);
		});
	}

	return { all, q, kat, total: all.length };
}
