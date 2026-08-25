<script>
	import { enhance } from '$app/forms';
	import UmkmForm from '$lib/components/admin/UmkmForm.svelte';

	let { data, form } = $props();

	let values = $state({
		id: data?.values?.id ?? data?.rowId ?? '',
		nama_usaha: data?.values?.nama_usaha ?? '',
		nama_pemilik: data?.values?.nama_pemilik ?? '',
		kategori: data?.values?.kategori ?? '',
		badge_khusus: data?.values?.badge_khusus ?? [],
		nomor_wa: data?.values?.nomor_wa ?? '',
		alamat: data?.values?.alamat ?? '',
		lat: data?.values?.lat ?? '',
		lng: data?.values?.lng ?? '',
		google_maps: data?.values?.google_maps ?? '',
		instagram: data?.values?.instagram ?? '',
		shopeefood: data?.values?.shopeefood ?? '',
		foto_utama: data?.values?.foto_utama ?? '',
		deskripsi: data?.values?.deskripsi ?? '',
		sistem_harga: data?.values?.sistem_harga ?? '',
		range_harga: data?.values?.range_harga ?? '',
		produk_layanan: data?.values?.produk_layanan ?? [{ nama_produk: '', foto_produk: '', range_harga_produk: '', daftar_harga: [] }]
	});

	// If form failed, restore entered values (preserve id)
	$effect(() => {
		if (form?.values) {
			values = { ...values, ...form.values, id: values.id };
		}
	});

	let errors = $derived(form?.errors || {});
	let submitting = $state(false);
	let existingBadgeSet = $derived(data?.existingBadgeSet || []);
</script>

<svelte:head>
	<title>Edit UMKM — Admin</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-5 py-6 md:px-8 md:py-8">
	<nav class="mb-4 flex items-center gap-1 text-sm text-muted" aria-label="breadcrumb">
		<a href="/admin" class="hover:text-primary">Admin</a>
		<span class="text-muted/50">
			<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6" /></svg>
		</span>
		<span class="font-medium text-text">Edit UMKM</span>
	</nav>

	<div class="rounded-xl bg-primary px-5 py-4 text-white md:px-6">
		<h1 class="text-lg font-bold">Edit Data UMKM</h1>
		<p class="mt-1 text-sm text-white/80">Edit data UMKM yang akan ditampilkan di halaman publik.</p>
	</div>

	{#if form?.error}
		<div class="mt-4 rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger">{form.error}</div>
	{/if}

	<div class="mt-6">
		<form
			method="POST"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					await update();
					submitting = false;
				};
			}}
		>
			<UmkmForm bind:values {errors} mode="edit" {existingBadgeSet} />

			<div class="mt-6 flex items-center justify-end gap-3">
				<a href="/admin" class="rounded-lg border border-border bg-white px-4 md:px-5 py-1.5 md:py-2.5 text-xs md:text-sm font-semibold text-text hover:bg-background">Batal</a>
				<button
					type="submit"
					disabled={submitting}
					class="rounded-lg bg-primary px-4 md:px-6 py-1.5 md:py-2.5 text-xs md:text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-60 cursor-pointer"
				>
					{submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
				</button>
			</div>
		</form>
	</div>
</div>
