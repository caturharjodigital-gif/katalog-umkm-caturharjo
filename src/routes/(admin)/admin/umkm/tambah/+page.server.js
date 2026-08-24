import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db.js';
import { umkm } from '$lib/server/schema.js';
import { umkmSchema, formatZodErrors } from '$lib/server/validation.js';
import { slugify } from '$lib/utils.js';
import { eq } from 'drizzle-orm';

function parseForm(data) {
	const get = (k) => String(data.get(k) ?? '').trim();
	let badge_khusus = [];
	try {
		const raw = get('badge_khusus');
		if (raw) badge_khusus = JSON.parse(raw);
		if (!Array.isArray(badge_khusus)) badge_khusus = [];
	} catch {
		badge_khusus = get('badge_khusus') ? [get('badge_khusus')] : [];
	}
	let produk_layanan = [];
	try {
		const raw = get('produk_layanan');
		if (raw) produk_layanan = JSON.parse(raw);
		if (!Array.isArray(produk_layanan)) produk_layanan = [];
	} catch {
		produk_layanan = [];
	}
	// Normalize daftar_harga if sent as string (newline)
	produk_layanan = produk_layanan.map((p) => ({
		nama_produk: String(p?.nama_produk ?? '').trim(),
		foto_produk: String(p?.foto_produk ?? '').trim() || null,
		range_harga_produk: String(p?.range_harga_produk ?? '').trim() || null,
		daftar_harga: Array.isArray(p?.daftar_harga) ? p.daftar_harga.map((x) => String(x).trim()).filter(Boolean) : []
	}));

	return {
		nama_usaha: get('nama_usaha'),
		nama_pemilik: get('nama_pemilik'),
		kategori: get('kategori'),
		badge_khusus,
		nomor_wa: get('nomor_wa'),
		alamat: get('alamat'),
		lat: get('lat'),
		lng: get('lng'),
		google_maps: get('google_maps'),
		instagram: get('instagram') || null,
		shopeefood: get('shopeefood') || null,
		foto_utama: get('foto_utama'),
		deskripsi: get('deskripsi'),
		sistem_harga: get('sistem_harga'),
		range_harga: get('range_harga'),
		produk_layanan
	};
}

export async function load() {
	const rows = await db.select().from(umkm);
	const set = new Set();
	for (const r of rows) {
		for (const b of r.badge_khusus || []) set.add(b);
	}
	return {
		existingBadgeSet: [...set],
		values: {
			nama_usaha: '',
			nama_pemilik: '',
			kategori: '',
			badge_khusus: [],
			nomor_wa: '',
			alamat: '',
			lat: '',
			lng: '',
			google_maps: '',
			instagram: '',
			shopeefood: '',
			foto_utama: '',
			deskripsi: '',
			sistem_harga: '',
			range_harga: '',
			produk_layanan: [{ nama_produk: '', foto_produk: '', range_harga_produk: '', daftar_harga: [] }]
		}
	};
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const parsed = parseForm(data);

		const result = umkmSchema.safeParse(parsed);

		if (!result.success) {
			const errors = formatZodErrors(result.error);
			return fail(400, { errors, values: parsed, error: 'Periksa kembali isian form.' });
		}

		const v = result.data;

		// Slug with anti-duplicate -2
		let base = slugify(v.nama_usaha);
		if (!base) base = 'umkm';
		let slug = base;
		let counter = 2;
		while (true) {
			const existing = await db.select().from(umkm).where(eq(umkm.id, slug));
			if (existing.length === 0) break;
			slug = `${base}-${counter}`;
			counter++;
			if (counter > 100) return fail(400, { errors: { nama_usaha: 'Nama usaha duplikat terlalu banyak.' }, values: parsed });
		}

		const row = {
			id: slug,
			nama_usaha: v.nama_usaha,
			nama_pemilik: v.nama_pemilik,
			deskripsi: v.deskripsi,
			kategori: v.kategori,
			nomor_wa: v.nomor_wa,
			alamat: v.alamat,
			koordinat: { lat: v.lat, lng: v.lng },
			badge_khusus: v.badge_khusus,
			sistem_harga: v.sistem_harga,
			range_harga: v.range_harga,
			produk_layanan: v.produk_layanan,
			foto_utama: v.foto_utama,
			link_eksternal: {
				google_maps: v.google_maps,
				instagram: v.instagram || null,
				shopeefood: v.shopeefood || null
			}
		};

		try {
			await db.insert(umkm).values(row);
		} catch (e) {
			return fail(500, { errors: {}, values: parsed, error: e?.message || 'Gagal menyimpan.' });
		}

		throw redirect(303, '/admin');
	}
};
