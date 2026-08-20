CREATE TABLE `umkm` (
	`id` text PRIMARY KEY NOT NULL,
	`nama_usaha` text NOT NULL,
	`nama_pemilik` text NOT NULL,
	`deskripsi` text NOT NULL,
	`kategori` text NOT NULL,
	`nomor_wa` text NOT NULL,
	`alamat` text NOT NULL,
	`koordinat` text,
	`badge_khusus` text,
	`sistem_harga` text NOT NULL,
	`range_harga` text NOT NULL,
	`produk_layanan` text,
	`foto_utama` text NOT NULL,
	`link_eksternal` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
