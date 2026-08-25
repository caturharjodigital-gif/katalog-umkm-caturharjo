<script>
	import { KATEGORI_OPTIONS, SISTEM_HARGA_OPTIONS } from '$lib/constants.js';
	import TagInput from './TagInput.svelte';
	import PhotoUpload from './PhotoUpload.svelte';
	import ProductSubForm from './ProductSubForm.svelte';

	let {
		values = $bindable({}),
		errors = {},
		mode = 'create',
		existingBadgeSet = []
	} = $props();

	let kategoriOpen = $state(false);
	let sistemHargaOpen = $state(false);

	function pickKategori(v) {
		values.kategori = v;
		kategoriOpen = false;
	}
	function pickSistemHarga(v) {
		values.sistem_harga = v;
		sistemHargaOpen = false;
	}

	let slugPreview = $derived(
		(values.nama_usaha || '')
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-|-$/g, '')
	);

	let descLen = $derived((values.deskripsi || '').length);
</script>

<div class="space-y-6">
	<!-- Sync hidden fields consumed by +page.server.js safeParse -->
	<input type="hidden" name="foto_utama" value={values.foto_utama ?? ''} />
	<input type="hidden" name="badge_khusus" value={JSON.stringify(values.badge_khusus ?? [])} />
	<input type="hidden" name="produk_layanan" value={JSON.stringify(values.produk_layanan ?? [])} />

	<!-- IDENTITAS USAHA -->
	<section class="rounded-xl border border-border bg-white p-4 md:p-5">
		<h3 class="text-xs font-bold uppercase tracking-wide text-primary">Identitas Usaha</h3>

		<div class="mt-4 grid gap-4 md:grid-cols-2">
			<div class="md:col-span-2">
				<label for="nama_usaha" class="text-xs font-semibold text-text">Nama Usaha <span class="text-danger">*</span></label>
				<input
					id="nama_usaha"
					name="nama_usaha"
					type="text"
					bind:value={values.nama_usaha}
					maxlength="60"
					placeholder="Contoh: Fena Snack & Catering"
					class="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.nama_usaha
						? 'border-danger'
						: 'border-border'}"
				/>
				{#if errors.nama_usaha}
					<p class="mt-1 text-xs text-danger">{errors.nama_usaha}</p>
				{/if}

				{#if mode === 'create'}
					<p class="mt-1 text-xs text-muted">
						Slug: <code class="rounded bg-surface px-1 py-0.5 text-text">/umkm/{slugPreview || 'slug-otomatis'}</code> · anti-duplikat <code>-2</code>
					</p>
				{:else}
					<p class="mt-1 flex items-center gap-1 text-xs text-muted">
						<svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
						Slug terkunci — URL tidak dapat diubah agar tautan lama tetap aktif: <code class="rounded bg-surface px-1">{values.id || ''}</code>
					</p>
				{/if}
			</div>

			<div>
				<label for="nama_pemilik" class="text-xs font-semibold text-text">Nama Pemilik <span class="text-danger">*</span></label>
				<input
					id="nama_pemilik"
					name="nama_pemilik"
					type="text"
					bind:value={values.nama_pemilik}
					placeholder="Contoh: Ibu Marsini"
					class="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.nama_pemilik
						? 'border-danger'
						: 'border-border'}"
				/>
				{#if errors.nama_pemilik}<p class="mt-1 text-xs text-danger">{errors.nama_pemilik}</p>{/if}
			</div>

			<div>
				<span class="text-xs font-semibold text-text">Kategori <span class="text-danger">*</span></span>
				<div class="relative mt-1">
					<button
						type="button"
						onclick={() => (kategoriOpen = !kategoriOpen)}
						class="flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-left text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.kategori
							? 'border-danger'
							: 'border-border'}"
					>
						<span class={values.kategori ? '' : 'text-muted'}>{values.kategori || 'Pilih Kategori'}</span>
						<svg class="h-4 w-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
					</button>
					{#if kategoriOpen}
						<div class="absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded-lg border border-border bg-white shadow-lg">
							{#each KATEGORI_OPTIONS as opt}
								<button
									type="button"
									onclick={() => pickKategori(opt)}
									class="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-surface {values.kategori === opt
										? 'font-semibold text-primary'
										: 'text-text'}"
								>
									{opt}
									{#if values.kategori === opt}
										<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
											><path d="M5 13l4 4L19 7" /></svg
										>
									{/if}
								</button>
							{/each}
						</div>
					{/if}
				</div>
				<input type="hidden" name="kategori" value={values.kategori || ''} />
				{#if errors.kategori}<p class="mt-1 text-xs text-danger">{errors.kategori}</p>{/if}
			</div>

			<div class="md:col-span-2">
				<span class="text-xs font-semibold text-text">Badge Khusus</span>
				<div class="mt-1">
					<TagInput bind:tags={values.badge_khusus} suggestions={existingBadgeSet} error={errors.badge_khusus || ''} />
				</div>
			</div>
		</div>
	</section>

	<!-- KONTAK & LOKASI -->
	<section class="rounded-xl border border-border bg-white p-4 md:p-5">
		<h3 class="text-xs font-bold uppercase tracking-wide text-primary">Kontak & Lokasi</h3>

		<div class="mt-4 grid gap-4 md:grid-cols-2">
			<div>
				<label for="nomor_wa" class="text-xs font-semibold text-text">Nomor WhatsApp <span class="text-danger">*</span></label>
				<p class="text-[11px] text-muted">Format 08xxxxxxxx tanpa spasi</p>
				<input
					id="nomor_wa"
					name="nomor_wa"
					type="text"
					bind:value={values.nomor_wa}
					inputmode="numeric"
					placeholder="081234567890"
					class="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.nomor_wa
						? 'border-danger'
						: 'border-border'}"
				/>
				{#if errors.nomor_wa}<p class="mt-1 text-xs text-danger">{errors.nomor_wa}</p>{/if}
			</div>

			<div class="md:col-span-2">
				<label for="alamat" class="text-xs font-semibold text-text">Alamat Lengkap <span class="text-danger">*</span></label>
				<textarea
					id="alamat"
					name="alamat"
					rows="2"
					bind:value={values.alamat}
					placeholder="Contoh: Caturharjo, Tamanmartani, Kalasan, Sleman, Yogyakarta"
					class="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.alamat
						? 'border-danger'
						: 'border-border'}"
				></textarea>
				{#if errors.alamat}<p class="mt-1 text-xs text-danger">{errors.alamat}</p>{/if}
			</div>

			<div>
				<label for="lat" class="text-xs font-semibold text-text">Latitude <span class="text-danger">*</span></label>
				<input
					id="lat"
					name="lat"
					type="text"
					bind:value={values.lat}
					placeholder="Contoh: -7.71495"
					class="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.lat
						? 'border-danger'
						: 'border-border'}"
				/>
				{#if errors.lat}<p class="mt-1 text-xs text-danger">{errors.lat}</p>{/if}
			</div>

			<div>
				<label for="lng" class="text-xs font-semibold text-text">Longitude <span class="text-danger">*</span></label>
				<input
					id="lng"
					name="lng"
					type="text"
					bind:value={values.lng}
					placeholder="Contoh: 110.485072"
					class="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.lng
						? 'border-danger'
						: 'border-border'}"
				/>
				{#if errors.lng}<p class="mt-1 text-xs text-danger">{errors.lng}</p>{/if}
			</div>

			<div class="md:col-span-2">
				<label for="google_maps" class="text-xs font-semibold text-text">Link Google Maps <span class="text-danger">*</span></label>
				<input
					id="google_maps"
					name="google_maps"
					type="url"
					bind:value={values.google_maps}
					placeholder="https://maps.google.com/?q=-7.71495,110.485072"
					class="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.google_maps
						? 'border-danger'
						: 'border-border'}"
				/>
				{#if errors.google_maps}<p class="mt-1 text-xs text-danger">{errors.google_maps}</p>{/if}
			</div>

			<div>
				<label for="instagram" class="text-xs font-semibold text-text">Link Instagram</label>
				<input
					id="instagram"
					name="instagram"
					type="url"
					bind:value={values.instagram}
					placeholder="https://instagram.com/..."
					class="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.instagram
						? 'border-danger'
						: 'border-border'}"
				/>
				{#if errors.instagram}<p class="mt-1 text-xs text-danger">{errors.instagram}</p>{/if}
			</div>

			<div>
				<label for="shopeefood" class="text-xs font-semibold text-text">Link ShopeeFood</label>
				<input
					id="shopeefood"
					name="shopeefood"
					type="url"
					bind:value={values.shopeefood}
					placeholder="https://shopee.co.id/..."
					class="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.shopeefood
						? 'border-danger'
						: 'border-border'}"
				/>
				{#if errors.shopeefood}<p class="mt-1 text-xs text-danger">{errors.shopeefood}</p>{/if}
			</div>
		</div>
	</section>

	<!-- KONTEN & VISUAL -->
	<section class="min-w-0 overflow-hidden rounded-xl border border-border bg-white p-4 md:p-5">
		<h3 class="text-xs font-bold uppercase tracking-wide text-primary">Konten & Visual</h3>

		<div class="mt-4 grid gap-4">
			<div>
				<span class="text-xs font-semibold text-text">Foto Utama <span class="text-danger">*</span></span>
				<div class="mt-1">
					<PhotoUpload bind:url={values.foto_utama} label="Foto utama" required helpText="JPG/PNG ≤1MB" error={errors.foto_utama || ''} />
				</div>
			</div>

			<div>
				<label for="deskripsi" class="text-xs font-semibold text-text"
					>Deskripsi UMKM <span class="text-danger">*</span>
					<span class="font-normal text-muted">· {(values.deskripsi || '').length}/600</span></label
				>
				<textarea
					id="deskripsi"
					name="deskripsi"
					rows="5"
					bind:value={values.deskripsi}
					maxlength="600"
					placeholder="Kalimat pertama adalah pitch. Contoh: Snack box isi 4–5 jajanan…"
					class="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.deskripsi
						? 'border-danger'
						: 'border-border'}"
				></textarea>
				{#if errors.deskripsi}<p class="mt-1 text-xs text-danger">{errors.deskripsi}</p>{/if}
			</div>
		</div>
	</section>

	<!-- PRICING & SKEMA BIAYA -->
	<section class="rounded-xl border border-border bg-white p-4 md:p-5">
		<h3 class="text-xs font-bold uppercase tracking-wide text-primary">Pricing & Skema Biaya</h3>

		<div class="mt-4 grid gap-4 md:grid-cols-2">
			<div>
				<span class="text-xs font-semibold text-text">Sistem Harga <span class="text-danger">*</span></span>
				<div class="relative mt-1">
					<button
						type="button"
						onclick={() => (sistemHargaOpen = !sistemHargaOpen)}
						class="flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-left text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.sistem_harga
							? 'border-danger'
							: 'border-border'}"
					>
						<span class={values.sistem_harga ? '' : 'text-muted'}
							>{SISTEM_HARGA_OPTIONS.find((o) => o.value === values.sistem_harga)?.label || 'Pilih Sistem Harga'}</span
						>
						<svg class="h-4 w-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
					</button>
					{#if sistemHargaOpen}
						<div class="absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded-lg border border-border bg-white shadow-lg">
							{#each SISTEM_HARGA_OPTIONS as opt}
								<button
									type="button"
									onclick={() => pickSistemHarga(opt.value)}
									class="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-surface {values.sistem_harga === opt.value
										? 'font-semibold text-primary'
										: 'text-text'}"
								>
									{opt.label}
									{#if values.sistem_harga === opt.value}
										<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
											><path d="M5 13l4 4L19 7" /></svg
										>
									{/if}
								</button>
							{/each}
						</div>
					{/if}
				</div>
				<input type="hidden" name="sistem_harga" value={values.sistem_harga || ''} />
				{#if errors.sistem_harga}<p class="mt-1 text-xs text-danger">{errors.sistem_harga}</p>{/if}
			</div>

			<div>
				<label for="range_harga" class="text-xs font-semibold text-text">Range Harga <span class="text-danger">*</span></label>
				<input
					id="range_harga"
					name="range_harga"
					type="text"
					bind:value={values.range_harga}
					placeholder="Contoh: Rp1.000/biji atau Mengikuti bahan"
					class="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.range_harga
						? 'border-danger'
						: 'border-border'}"
				/>
				{#if errors.range_harga}<p class="mt-1 text-xs text-danger">{errors.range_harga}</p>{/if}
			</div>
		</div>
	</section>

	<!-- PRODUK & LAYANAN -->
	<section class="rounded-xl border border-border bg-white p-4 md:p-5">
		<h3 class="text-xs font-bold uppercase tracking-wide text-primary">Produk & Layanan Unggulan</h3>
		<div class="mt-4">
			<ProductSubForm bind:items={values.produk_layanan} errors={errors} />
		</div>
	</section>
</div>
