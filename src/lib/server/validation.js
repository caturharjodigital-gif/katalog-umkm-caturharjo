import { z } from 'zod';

export const KATEGORI_VALUES = ['Kuliner', 'Jasa & Industri', 'Agribisnis'];
export const SISTEM_HARGA_VALUES = ['Satuan', 'Per Kg', 'Borongan', 'Custom Budget'];

const produkSchema = z.object({
	nama_produk: z.string().trim().min(1, 'Nama produk wajib diisi').max(60, 'Nama produk ≤60 karakter'),
	foto_produk: z.string().trim().url('Foto produk harus URL valid').or(z.literal('')).nullable().optional(),
	range_harga_produk: z.string().trim().max(100, 'Range harga produk ≤100 karakter').nullable().optional(),
	daftar_harga: z.array(z.string().trim()).default([])
});

export const umkmSchema = z.object({
	nama_usaha: z.string().trim().min(1, 'Nama usaha wajib diisi').max(60, 'Nama usaha ≤60 karakter'),
	nama_pemilik: z.string().trim().min(1, 'Nama pemilik wajib diisi').max(60, 'Nama pemilik ≤60 karakter'),
	kategori: z.enum(KATEGORI_VALUES, { message: 'Kategori tidak valid' }),
	badge_khusus: z
		.array(z.string().trim().min(1).max(30, 'Badge ≤30 karakter'))
		.max(3, 'Maksimal 3 badge')
		.default([]),
	nomor_wa: z
		.string()
		.trim()
		.regex(/^08\d{7,11}$/, 'Nomor WA harus format 08xxxxxxxx (10–13 digit)'),
	alamat: z.string().trim().min(1, 'Alamat wajib diisi').max(300, 'Alamat ≤300 karakter'),
	lat: z
		.string()
		.trim()
		.regex(/^-?\d+(\.\d+)?$/, 'Latitude harus desimal dengan titik')
		.transform((v) => parseFloat(v))
		.refine((v) => !Number.isNaN(v) && v >= -90 && v <= 90, 'Latitude harus -90 s.d. 90'),
	lng: z
		.string()
		.trim()
		.regex(/^-?\d+(\.\d+)?$/, 'Longitude harus desimal dengan titik')
		.transform((v) => parseFloat(v))
		.refine((v) => !Number.isNaN(v) && v >= -180 && v <= 180, 'Longitude harus -180 s.d. 180'),
	google_maps: z
		.string()
		.trim()
		.url('Link Google Maps harus URL valid')
		.refine((v) => v.startsWith('https://'), 'Link Google Maps harus https://')
		.superRefine((v, ctx) => {
			try {
				const host = new URL(v).hostname.toLowerCase();
				const ok = host === 'maps.google.com' || host === 'www.google.com' || host === 'maps.app.goo.gl' || host === 'goo.gl' || host === 'google.com' || host.endsWith('.google.com');
				if (!ok) ctx.addIssue({ code: 'custom', message: 'Link Google Maps harus link Google Maps (maps.google.com / maps.app.goo.gl / google.com/maps)' });
			} catch {
				ctx.addIssue({ code: 'custom', message: 'Link Google Maps tidak valid' });
			}
		}),
	instagram: z
		.string()
		.trim()
		.url('Link Instagram harus URL valid')
		.superRefine((v, ctx) => {
			if (!v) return;
			try {
				const host = new URL(v).hostname.toLowerCase();
				const ok = host === 'instagram.com' || host.endsWith('.instagram.com');
				if (!ok) ctx.addIssue({ code: 'custom', message: 'Link Instagram harus instagram.com' });
			} catch {
				ctx.addIssue({ code: 'custom', message: 'Link Instagram tidak valid' });
			}
		})
		.or(z.literal(''))
		.nullable()
		.optional(),
	shopeefood: z
		.string()
		.trim()
		.url('Link ShopeeFood harus URL valid')
		.superRefine((v, ctx) => {
			if (!v) return;
			try {
				const host = new URL(v).hostname.toLowerCase();
				const ok = host === 'shopee.co.id' || host.endsWith('.shopee.co.id') || host === 'shopeefood.co.id' || host.endsWith('.shopeefood.co.id') || host.includes('shopee');
				if (!ok) ctx.addIssue({ code: 'custom', message: 'Link ShopeeFood harus link ShopeeFood / Shopee' });
			} catch {
				ctx.addIssue({ code: 'custom', message: 'Link ShopeeFood tidak valid' });
			}
		})
		.or(z.literal(''))
		.nullable()
		.optional(),
	foto_utama: z.string().trim().min(1, 'Foto utama wajib diisi').url('Foto utama harus URL valid'),
	deskripsi: z
		.string()
		.trim()
		.min(1, 'Deskripsi wajib diisi')
		.max(600, 'Deskripsi ≤600 karakter'),
	sistem_harga: z.enum(SISTEM_HARGA_VALUES, { message: 'Sistem harga tidak valid' }),
	range_harga: z.string().trim().min(1, 'Range harga wajib diisi').max(150, 'Range harga ≤150 karakter'),
	produk_layanan: z.array(produkSchema).default([])
});

export function formatZodErrors(parsedError) {
	const out = {};
	for (const issue of parsedError.issues) {
		const key = issue.path.join('.') || '_root';
		if (!out[key]) out[key] = issue.message;
	}
	return out;
}
