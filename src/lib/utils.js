// PRD §6 — slug + WA link + harga fallback

export function slugify(nama) {
	return nama
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}

export function waLink(nomorWa) {
	// 08xx → 62xx untuk https://wa.me/62...
	const normalized = nomorWa.replace(/^0/, '62').replace(/[^0-9]/g, '');
	return `https://wa.me/${normalized}`;
}

export function fallbackHarga(rangeHargaProduk) {
	return rangeHargaProduk || 'Hubungi pemilik untuk harga terbaru';
}
