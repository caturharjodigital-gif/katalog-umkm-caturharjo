import 'dotenv/config';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { umkm } from './schema.js';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) {
	console.error('Missing TURSO_DATABASE_URL / TURSO_AUTH_TOKEN');
	process.exit(1);
}

const client = createClient({ url, authToken });
const db = drizzle(client);

// 4 UMKM dummy — PRD §9 (WA & koordinat placeholder)
const data = [
	{
		id: 'bengkel-las-rigen',
		nama_usaha: 'Bengkel Las Rigen',
		nama_pemilik: 'Pak Sunaryo',
		deskripsi:
			'Bengkel Las Rigen melayani jasa las & pembuatan kanopi, pagar, dan papan reklame secara borongan, berdiri sejak 2016. Harga mengikuti harga bahan baku (umumnya galvalume) ditambah biaya jasa, sehingga tetap wajar bagi kedua pihak. Pemesanan dilayani melalui WhatsApp atau datang langsung, dengan 2–3 proyek dikerjakan setiap bulannya.',
		kategori: 'Jasa & Industri',
		nomor_wa: '081234567890',
		alamat: 'Caturharjo, Tamanmartani, Kalasan, Sleman, Yogyakarta',
		koordinat: { lat: -7.73, lng: 110.45 },
		badge_khusus: ['Sistem Borongan'],
		sistem_harga: 'Borongan',
		range_harga: 'Mengikuti harga bahan baku (galvalume) + jasa; per proyek',
		produk_layanan: [
			{ nama_produk: 'Kanopi', foto_produk: null, range_harga_produk: null, daftar_harga: [] },
			{ nama_produk: 'Pagar', foto_produk: null, range_harga_produk: null, daftar_harga: [] },
			{ nama_produk: 'Papan Reklame 2×3', foto_produk: null, range_harga_produk: null, daftar_harga: [] },
			{ nama_produk: 'Papan Reklame 2×2', foto_produk: null, range_harga_produk: null, daftar_harga: [] },
			{ nama_produk: 'Pengerjaan las custom', foto_produk: null, range_harga_produk: null, daftar_harga: [] }
		],
		foto_utama: '/static/placeholder.jpg',
		link_eksternal: {
			google_maps: 'https://maps.google.com/?q=-7.73,110.45',
			instagram: null,
			shopeefood: null
		}
	},
	{
		id: 'pisang-aroma',
		nama_usaha: 'Pisang Aroma',
		nama_pemilik: 'Pak Tarjo',
		deskripsi:
			'Pisang coklat (pisang aroma) renyah bersertifikat halal, langganan kampus & pasar sejak 2003 — eceran Rp1.000/biji hingga pesanan acara ratusan biji. Produksi rutin menyetor ke UGM, UII, LPMP, dan Pasar Demangan; hari biasa ±700 biji dan dapat mencapai 1.000 biji saat ada pesanan. Pembayaran mudah karena sudah tersedia QRIS.',
		kategori: 'Kuliner',
		nomor_wa: '081234567891',
		alamat: 'Caturharjo, Tamanmartani, Kalasan, Sleman, Yogyakarta',
		koordinat: { lat: -7.731, lng: 110.451 },
		badge_khusus: ['Sertifikat Halal', 'Menerima Pesanan Besar'],
		sistem_harga: 'Satuan',
		range_harga: 'Rp1.000/biji (harga rumah) – Rp2.000 (eceran)',
		produk_layanan: [
			{ nama_produk: 'Pisang Aroma (Pisang Coklat)', foto_produk: null, range_harga_produk: 'Rp1.000/biji', daftar_harga: ['Pisang Aroma @1.000'] }
		],
		foto_utama: '/static/placeholder.jpg',
		link_eksternal: {
			google_maps: 'https://maps.google.com/?q=-7.731,110.451',
			instagram: null,
			shopeefood: null
		}
	},
	{
		id: 'peternakan-ikan-nila-pak-pur',
		nama_usaha: 'Peternakan Ikan Nila Pak Pur',
		nama_pemilik: 'Pak Pur',
		deskripsi:
			'Ikan nila segar hasil kolam terpal, dijual per kg isi 3–4 ekor hasil sortir; pembelian satu kolam dilayani dengan negosiasi, siapa cepat dia dapat. Usaha berjalan sejak 2010, dari kolam tanah hingga beralih ke kolam terpal. Harga terakhir Rp26.500/kg dan dapat mencapai Rp29.000–Rp30.000/kg pada Desember.',
		kategori: 'Agribisnis',
		nomor_wa: '081234567892',
		alamat: 'Caturharjo, Tamanmartani, Kalasan, Sleman, Yogyakarta',
		koordinat: { lat: -7.732, lng: 110.452 },
		badge_khusus: ['Menerima Pesanan Besar'],
		sistem_harga: 'Per Kg',
		range_harga: 'Rp26.500/kg (Desember s.d. Rp29.000–Rp30.000)',
		produk_layanan: [
			{ nama_produk: 'Ikan Nila Konsumsi (sortir 3–4 ekor/kg)', foto_produk: null, range_harga_produk: 'Rp26.500/kg', daftar_harga: [] }
		],
		foto_utama: '/static/placeholder.jpg',
		link_eksternal: {
			google_maps: 'https://maps.google.com/?q=-7.732,110.452',
			instagram: null,
			shopeefood: null
		}
	},
	{
		id: 'fena-snack-catering',
		nama_usaha: 'Fena Snack & Catering',
		nama_pemilik: 'Ibu Marsini',
		deskripsi:
			'Snack box isi 4–5 jajanan (Rp1.300–Rp2.000) serta catering custom seperti tumpeng, ingkung, dan nasi kenduri — tanpa minimal pesanan dan bisa menyesuaikan budget. Berjalan 10 tahun dengan produksi sendiri; pelanggan menjangkau UGM Fakultas Pertanian hingga Cangkringan. Pemesanan bisa datang langsung atau melalui WhatsApp dengan transfer.',
		kategori: 'Kuliner',
		nomor_wa: '081234567893',
		alamat: 'Caturharjo, Tamanmartani, Kalasan, Sleman, Yogyakarta',
		koordinat: { lat: -7.733, lng: 110.453 },
		badge_khusus: ['Menerima Pesanan Besar'],
		sistem_harga: 'Custom Budget',
		range_harga: 'Rp1.300–Rp2.000/snack; catering menyesuaikan budget',
		produk_layanan: [
			{ nama_produk: 'Snack Box', foto_produk: null, range_harga_produk: 'Rp1.300–Rp2.000', daftar_harga: [] },
			{ nama_produk: 'Nasi Kotak', foto_produk: null, range_harga_produk: null, daftar_harga: [] },
			{ nama_produk: 'Tumpeng & Ingkung', foto_produk: null, range_harga_produk: null, daftar_harga: [] },
			{ nama_produk: 'Nasi Kenduri/Oprokan', foto_produk: null, range_harga_produk: null, daftar_harga: [] }
		],
		foto_utama: '/static/placeholder.jpg',
		link_eksternal: {
			google_maps: 'https://maps.google.com/?q=-7.733,110.453',
			instagram: null,
			shopeefood: null
		}
	}
];

async function main() {
	console.log('Seeding 4 UMKM...');
	for (const row of data) {
		await db.insert(umkm).values(row).onConflictDoUpdate({ target: umkm.id, set: row });
		console.log('  upsert:', row.id);
	}
	const rows = await db.select().from(umkm);
	console.log(`Done. Total: ${rows.length}`);
	for (const r of rows) console.log(` - ${r.id} | ${r.nama_usaha} | ${r.kategori}`);
}
main().catch((e) => {
	console.error(e);
	process.exit(1);
});
