<script>
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { fallbackHarga } from '$lib/utils.js';
	import shoopefood from '$lib/assets/ShopeeFood.svg'

	let { data } = $props();
	let item = $derived(data.item);
	let slug = $derived(data.slug);

	let produkLayanan = $derived(item?.produk_layanan || []);
</script>

<svelte:head>
	<title>{item ? item.nama_usaha : 'UMKM Tidak Ditemukan'} — UMKM Caturharjo</title>
</svelte:head>

{#if !item}
	<div class="mx-auto max-w-7xl px-5 py-16 md:px-8">
		<div class="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white px-6 py-12 text-center">
			<h2 class="text-lg font-bold text-text">UMKM Tidak Ditemukan</h2>
			<p class="mt-2 max-w-md text-sm leading-relaxed text-muted">
				UMKM tidak ditemukan. Coba kata kunci lain seperti "kanopi", "pisang", "nila", atau "snack".
			</p>
			<a href="/umkm" class="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover">
				Lihat Semua UMKM
			</a>
		</div>
	</div>
{:else}
	<!-- Foto utama / banner -->
	<div class="relative w-full overflow-hidden bg-surface">
		{#if item.foto_utama && !item.foto_utama.includes('placeholder')}
			<img src={item.foto_utama} alt={item.nama_usaha} class="h-56 w-full object-cover aspect-video md:h-[420px]" fetchpriority="high" />
		{:else}
			<div class="flex h-56 w-full items-center justify-center bg-surface md:h-[340px]">
				<span class="text-6xl text-muted/30">{item.nama_usaha[0]}</span>
			</div>
		{/if}
	</div>

	<!-- Breadcrumb -->
	<div class="mx-auto max-w-7xl px-5 py-4 md:px-8 md:py-6">
		<nav class="flex items-center gap-1 text-xs md:text-sm text-muted" aria-label="breadcrumb">
			<a href="/" class="hover:text-primary">Home</a>
			<span class="text-muted/50">
				<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
			</span>
			<a href="/umkm" class="hover:text-primary">Daftar UMKM</a>
			<span class="text-muted/50">
				<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
			</span>
			<span class="text-text font-medium truncate">{item.nama_usaha}</span>
		</nav>
	</div>

	<!-- Kontainer utama: single-column -->
	<div class="mx-auto max-w-7xl px-5 py-5 md:px-8 md:py-6 bg-surface rounded-lg shadow-2xl">
		<!-- H1 -->
		<h1 class="text-2xl font-bold text-primary md:text-3xl lg:text-4x">{item.nama_usaha}</h1>

		<!-- Tentang Kami + separator -->
		<div class="mt-5 flex items-center gap-2">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7 text-primary" viewBox="0 0 24 24">
				<path d="M0 0h24v24H0z" fill="none" />
				<path fill="currentColor" d="M11 9h2V7h-2m1 13c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m-1 15h2v-6h-2z" />
			</svg>

			<h2 class="text-lg md:text-xl font-semibold text-text">Tentang Kami</h2>
		</div>
		<div class="mt-2 h-px w-full bg-muted"></div>
		<p class="mt-3 text-sm leading-relaxed text-muted whitespace-pre-wrap">{item.deskripsi}</p>

		<!-- Badge kategori + badge khusus -->
		<div class="mt-4 flex flex-wrap items-center gap-2">
			<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium border {item.kategori === 'Agribisnis' ? 'bg-badge-green-soft text-badge-green-text' : item.kategori === 'Jasa & Industri' ? 'bg-badge-blue-soft text-badge-blue-text border-badge-blue-borde' : item.kategori === 'Kuliner' ? 'bg-badge-orange-soft text-badge-orange-text border border-badge-orange-border' : 'bg-border text-muted'}">{item.kategori}</span>
			{#each (item.badge_khusus || []) as b}
				{@const halal = b === 'Sertifikat Halal'}
				<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium {halal ? 'bg-badge-green-soft text-badge-green-text' : 'bg-badge-yellow-soft text-badge-yellow-text'}">{b}</span>
			{/each}
		</div>

		<!-- Alamat -->
		<div class="mt-3 flex items-center gap-2 text-sm text-muted">
			<svg class="h-6 w-6 md:h-7 md:w-7 text-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M12 21s-7-5.373-7-11a7 7 0 0114 0c0 5.627-7 11-7 11z"/>
				<circle cx="12" cy="10" r="3"/>
			</svg>
			<span>{item.alamat}</span>
		</div>

		<!-- Tombol kontak -->
		<div class="mt-5 flex flex-wrap items-center gap-3">
			<a
				href="https://wa.me/62{item.nomor_wa.replace(/^0/, '')}"
				target="_blank"
				rel="noreferrer"
				class="inline-flex items-center justify-center gap-2 rounded-lg bg-action-green px-4 py-1.5 md:px-6 md:py-2.5 text-xs md:text-sm font-semibold text-white transition hover:opacity-90"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-badge-green-soft" viewBox="0 0 24 24">
					<path d="M0 0h24v24H0z" fill="none" />
					<path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" />
				</svg>
				Hubungi via WhatsApp
			</a>

			{#if item.link_eksternal?.google_maps}
				<a href={item.link_eksternal.google_maps} target="_blank" rel="noreferrer" class="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-1.5 md:px-6 md:py-2.5 text-xs md:text-sm font-semibold text-text transition hover:border-primary hover:text-primary">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-3.5" viewBox="0 0 256 367">
						<path d="M0 0h256v367H0z" fill="none" />
						<path fill="#34a853" d="M70.585 271.865a371 371 0 0 1 28.911 42.642c7.374 13.982 10.448 23.463 15.837 40.31c3.305 9.308 6.292 12.086 12.714 12.086c6.998 0 10.173-4.726 12.626-12.035c5.094-15.91 9.091-28.052 15.397-39.525c12.374-22.15 27.75-41.833 42.858-60.75c4.09-5.354 30.534-36.545 42.439-61.156c0 0 14.632-27.035 14.632-64.792c0-35.318-14.43-59.813-14.43-59.813l-41.545 11.126l-25.23 66.451l-6.242 9.163l-1.248 1.66l-1.66 2.078l-2.914 3.319l-4.164 4.163l-22.467 18.304l-56.17 32.432z" />
						<path fill="#fbbc04" d="M12.612 188.892c13.709 31.313 40.145 58.839 58.031 82.995l95.001-112.534s-13.384 17.504-37.662 17.504c-27.043 0-48.89-21.595-48.89-48.825c0-18.673 11.234-31.501 11.234-31.501l-64.489 17.28z" />
						<path fill="#4285f4" d="M166.705 5.787c31.552 10.173 58.558 31.53 74.893 63.023l-75.925 90.478s11.234-13.06 11.234-31.617c0-27.864-23.463-48.68-48.81-48.68c-23.969 0-37.735 17.475-37.735 17.475v-57z" />
						<path fill="#1a73e8" d="M30.015 45.765C48.86 23.218 82.02 0 127.736 0c22.18 0 38.89 5.823 38.89 5.823L90.29 96.516H36.205z" />
						<path fill="#ea4335" d="M12.612 188.892S0 164.194 0 128.414c0-33.817 13.146-63.377 30.015-82.649l60.318 50.759z" />
					</svg>

					Google Maps
				</a>
			{/if}
			{#if item.link_eksternal?.instagram}
				<a href={item.link_eksternal.instagram} target="_blank" rel="noreferrer" class="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-1.5 md:px-6 md:py-2.5 text-xs md:text-sm font-semibold text-text transition hover:border-primary hover:text-primary">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 256 256">
						<path d="M0 0h256v256H0z" fill="none" />
						<g fill="none">
							<rect width="256" height="256" fill="url(#SVGKdMMobCR)" rx="60" />
							<rect width="256" height="256" fill="url(#SVGqYUiQbXV)" rx="60" />
							<path fill="#fff" d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396s-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413s.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5s6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355s22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334s-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334" />
							<defs>
								<radialGradient id="SVGKdMMobCR" cx="0" cy="0" r="1" gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)" gradientUnits="userSpaceOnUse">
									<stop stop-color="#fd5" />
									<stop offset=".1" stop-color="#fd5" />
									<stop offset=".5" stop-color="#ff543e" />
									<stop offset="1" stop-color="#c837ab" />
								</radialGradient>
								<radialGradient id="SVGqYUiQbXV" cx="0" cy="0" r="1" gradientTransform="rotate(78.68 -32.69 -16.937)scale(113.412 467.488)" gradientUnits="userSpaceOnUse">
									<stop stop-color="#3771c8" />
									<stop offset=".128" stop-color="#3771c8" />
									<stop offset="1" stop-color="#60f" stop-opacity="0" />
								</radialGradient>
							</defs>
						</g>
					</svg>
					Instagram
				</a>
			{/if}
			{#if item.link_eksternal?.shoopefood}
				<a href={item.link_eksternal.shoopefood} target="_blank" rel="noreferrer" class="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-1.5 md:px-6 md:py-2.5 text-xs md:text-sm font-semibold text-text transition hover:border-primary hover:text-primary">
					<img src={shoopefood} alt="shoopefood" class="h-5 w-5">

					Shoope Food
				</a>
			{/if}
		</div>
	</div>

	<div class="mx-auto max-w-7xl px-5 py-5 md:px-10 md:py-6 ">
		<!-- Katalog Produk -->
		<div class="mt-8">
			<h2 class="text-lg font-bold text-text">Katalog Produk</h2>

			{#if produkLayanan.length > 0}
				<div class="mt-4 grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{#each produkLayanan as produk}
						<ProductCard {produk}/>
					{/each}
				</div>
			{:else}
				<p class="mt-3 text-sm text-muted">Belum ada katalog produk.</p>
			{/if}

			<!-- Disclaimer M7 -->
			<p class="mt-6 text-center text-xs italic text-muted">*Gambar mungkin tidak akurat. Harga dapat berubah sewaktu-waktu. Hubungi pemilik untuk harga terbaru.</p>
		</div>
	</div>
{/if}
