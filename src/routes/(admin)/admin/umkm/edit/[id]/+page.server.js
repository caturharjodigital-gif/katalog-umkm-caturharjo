import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db.js';
import { umkm } from '$lib/server/schema.js';
import { umkmSchema, formatZodErrors } from '$lib/server/validation.js';
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

export async function load({ params }) {
	const id = params.id;
	const rows = await db.select().from(umkm).where(eq(umkm.id, id));
	if (rows.length === 0) throw error(404, 'UMKM tidak ditemukan');
	const row = rows[0];

	// Distinct badge set for suggestions?
	const all = await db.select().from(umkm);
	const set = new Set();
	for (const r of all) for (const b of r.badge_khusus || []) set.add(b);

	const coord = row.koordinat || {};
	const link = row.link_eksternal || {};

	return {
		existingBadgeSet: [...set],
		rowId: row.id,
		values: {
			id: row.id,
			nama_usaha: row.nama_usaha,
			nama_pemilik: row.nama_pemilik,
			kategori: row.kategori,
			badge_khusus: row.badge_khusus || [],
			nomor_wa: row.nomor_wa,
			alamat: row.alamat,
			lat: coord.lat != null ? String(coord.lat) : '',
			lng: coord.lng != null ? String(coord.lng) : '',
			google_maps: link.google_maps || '',
			instagram: link.instagram || '',
			shopeefood: link.shopeefood || '',
			foto_utama: row.foto_utama,
			deskripsi: row.deskripsi,
			sistem_harga: row.sistem_harga,
			range_harga: row.range_harga,
			produk_layanan: Array.isArray(row.produk_layanan) && row.produk_layanan.length ? row.produk_layanan : [{ nama_produk: '', foto_produk: '', range_harga_produk: '', daftar_harga: [] }]
		}
	};
}

export const actions = {
	default: async ({ request, params }) => {
		const id = params.id;
		const data = await request.formData();
		const parsed = parseForm(data);

		const result = umkmSchema.safeParse(parsed);
		if (!result.success) {
			const errors = formatZodErrors(result.error);
			return fail(400, { errors, values: parsed, error: 'Periksa kembali isian form.' });
		}

		const v = result.data;

		const existing = await db.select().from(umkm).where(eq(umkm.id, id));
		if (existing.length === 0) return fail(404, { error: 'UMKM tidak ditemukan.' });

		const oldRow = existing[0];
		const oldUrls = [oldRow.foto_utama, ...(oldRow.produk_layanan || []).map((p) => p?.foto_produk)].filter(
			(u) => typeof u === 'string' && u.includes('.public.blob.vercel-storage.com')
		);
		const newUrls = new Set([v.foto_utama, ...(v.produk_layanan || []).map((p) => p?.foto_produk)].filter(Boolean));

		const patch = {
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
			await db.update(umkm).set(patch).where(eq(umkm.id, id));
		} catch (e) {
			return fail(500, { errors: {}, values: parsed, error: e?.message || 'Gagal menyimpan.' });
		}

		// Cleanup orphan blobs: foto yang diganti/dihapus di edit
		for (const u of oldUrls) {
			if (!newUrls.has(u)) {
				const { deleteBlobUrl } = await import('$lib/server/blob.js');
				await deleteBlobUrl(u);
			}
		}

		throw redirect(303, '/admin');
	}
};
