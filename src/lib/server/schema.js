import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Skema Turso v2.1 — PRD §6 + §11
// PK = id (slug), kolom nested pakai text({ mode: "json" })
export const umkm = sqliteTable('umkm', {
	id: text('id').primaryKey(), // slug — anti-duplikat -2, terkunci setelah insert
	nama_usaha: text('nama_usaha').notNull(),
	nama_pemilik: text('nama_pemilik').notNull(),
	deskripsi: text('deskripsi').notNull(),
	kategori: text('kategori').notNull(), // Kuliner | Jasa & Industri | Agribisnis
	nomor_wa: text('nomor_wa').notNull(), // ^08\d{7,11}$
	alamat: text('alamat').notNull(),
	koordinat: text('koordinat', { mode: 'json' }), // { lat, lng } | null
	badge_khusus: text('badge_khusus', { mode: 'json' }), // string[]
	sistem_harga: text('sistem_harga').notNull(), // Satuan | Per Kg | Borongan | Custom Budget
	range_harga: text('range_harga').notNull(),
	produk_layanan: text('produk_layanan', { mode: 'json' }), // [{nama_produk,foto_produk,range_harga_produk,daftar_harga[]}] | null
	foto_utama: text('foto_utama').notNull(),
	link_eksternal: text('link_eksternal', { mode: 'json' }), // {google_maps,instagram,shopeefood} | null
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdate(() => new Date())
});
