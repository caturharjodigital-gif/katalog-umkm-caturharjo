<script>
	import UmkmCard from '$lib/components/UmkmCard.svelte';
	import CategoryCard from '$lib/components/CategoryCard.svelte';
	import { KATEGORI_OPTIONS } from '$lib/constants.js';
	import latarWebsite from '$lib/assets/latar-website2.jpeg';
    import paperMap from '$lib/assets/paper-map.svg'

	let { data } = $props();

	const preview = $derived(data.preview || []);

	const categoryIcons = {
		'Kuliner': `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-badge-yellow-text" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="currentColor" d="M1 22c0 .54.45 1 1 1h13c.56 0 1-.46 1-1v-1H1zM8.5 9C4.75 9 1 11 1 15h15c0-4-3.75-6-7.5-6m-4.88 4c1.11-1.55 3.47-2 4.88-2s3.77.45 4.88 2zM1 17h15v2H1zM18 5V1h-2v4h-5l.23 2h9.56l-1.4 14H18v2h1.72c.84 0 1.53-.65 1.63-1.47L23 5z" />
                    </svg>`,
		'Jasa & Industri': `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
		'Agribisnis': `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-action-green" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="currentColor" d="M23 4.1V2.3l-1.8-.2c-.1 0-.7-.1-1.7-.1c-4.1 0-7.1 1.2-8.8 3.3C9.4 4.5 7.6 4 5.5 4c-1 0-1.7.1-1.7.1l-1.9.3l.1 1.7c.1 3 1.6 8.7 6.8 8.7H9v3.4c-3.8.5-7 1.8-7 1.8v2h20v-2s-3.2-1.3-7-1.8V15c6.3-.1 8-7.2 8-10.9M12 18h-1v-5.6S10.8 9 8 9c0 0 1.5.8 1.9 3.7c-.4.1-.8.1-1.1.1C4.2 12.8 4 6.1 4 6.1S4.6 6 5.5 6c1.9 0 5 .4 5.9 3.1C11.9 4.6 17 4 19.5 4c.9 0 1.5.1 1.5.1s0 9-6.3 9H14c0-2 2-5 2-5c-3 1-3 4.9-3 4.9v5z" />
                    </svg>`
	};

	let searchQ = $state('');

	function handleSearch(e) {
		e.preventDefault();
		if (searchQ.trim()) {
			window.location.href = `/umkm?q=${encodeURIComponent(searchQ.trim())}`;
		} else {
			window.location.href = '/umkm';
		}
	}
</script>

<svelte:head>
	<title>UMKM Caturharjo — Katalog Digital UMKM Padukuhan Caturharjo</title>
	<meta name="description" content="Katalog digital UMKM Padukuhan Caturharjo, Tamanmartani, Kalasan, Sleman — cari kuliner, jasa, agribisnis, hubungi via WhatsApp & lihat di peta." />
</svelte:head>

<!-- Herosection -->
<section class="relative overflow-hidden bg-text">
	<!-- Background image -->
	<img src={latarWebsite} alt="" class="absolute inset-0 h-full w-full object-cover" fetchpriority="high" />
	<!-- Overlay -->
	<div class="absolute inset-0 bg-text/60"></div>
	<div class="relative flex justify-center mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-40">
		<div class="max-w-full flex flex-col justify-center items-center">
			<h1 class="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight text-white text-center">
				Selamat Datang di Katalog <span class="whitespace-nowrap">UMKM Digital</span>
			</h1>
			<h1 class="text-xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
				Padukuhan Caturharjo
			</h1>
			<p class="mt-3 text-xs leading-relaxed text-white/85 md:text-base text-center">
				Jelajahi berbagai UMKM unggulan di Padukuhan Caturharjo, Tamanmartani, Kalasan, Sleman.
			</p>

			<!-- Search pill → /umkm?q= -->
			<form onsubmit={handleSearch} class="mt-6 flex max-w-lg md:min-w-2xl items-center">
				<div class="relative flex-1 flex justify-between bg-white py-1 px-4 md:py-2 md:px-8 rounded-full">
                    <div class="flex-1 flex gap-2 items-center">
                        <input                  
                            type="text"     
                            bind:value={searchQ}
                            placeholder="Cari UMKM atau produk..."
                            class="h-8 md:h-11 w-full border-0 pl-0 text-xs md:text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-white/60"
                        />
                    </div>
                    <button type="submit" class="rounded-full bg-primary py-1 md:py-2 px-4 md:px-8 text-xs md:text-sm font-semibold text-white transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer">
                        Lihat UMKM
                    </button>
				</div>
			</form>
		</div>
	</div>
</section>

<!-- Preview 3 UMKM -->
<section class="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
	<div class="flex items-center justify-between">
		<h2 class="text-lg font-bold text-text md:text-xl">UMKM Unggulan</h2>
		<a href="/umkm" class="text-sm font-semibold text-primary hover:underline">Lihat Selengkapnya →</a>
	</div>

	{#if preview.length > 0}
		<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			{#each preview as item}
				<UmkmCard umkm={item} />
			{/each}
		</div>
	{:else}
		<p class="mt-6 text-center text-sm text-muted">UMKM tidak ditemukan. Coba kata kunci lain seperti "kanopi", "pisang", "nila", atau "snack".</p>
	{/if}
</section>

<!-- Jelajahi Berdasarkan Kategori -->
<section class="bg-surface/60 py-10 md:py-12">
	<div class="mx-auto max-w-7xl px-5 md:px-8">
		<h2 class="text-lg font-bold text-text md:text-xl">Jelajahi Berdasarkan Kategori</h2>
		<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
			{#each KATEGORI_OPTIONS as kategori}
				<CategoryCard kategori={kategori} icon={categoryIcons[kategori]} query={encodeURIComponent(kategori)} />
			{/each}
		</div>
	</div>
</section>

<!-- CTA Peta — bg primary -->
<section class="bg-primary py-4 md:py-6">
	<div class="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
		<div class="grid grid-cols-1 gap-2 md:gap-8 md:grid-cols-2">
           <div class="w-full mx-auto flex justify-center">
                <div class="flex  items-center justify-center rounded-xl bg-transparant">
                    <img src={paperMap} alt="" class="h-auto w-80 md:h-60 md:w-96 object-cover" fetchpriority="high" />
                </div>
           </div>
            <div class="flex flex-col justify-center space-y-6">
                <div class="flex flex-col justify-center space-y-6">
                    <h2 class="text-2xl md:text-4xl font-bold text-white flex justify-center md:justify-start">Temukan Lokasi UMKM</h2>
                    <p class="mt-2 text-sm md:text-base leading-relaxed text-white/80 flex text-center md:text-left">Lihat lokasi UMKM di seluruh Padukuhan Caturharjo melalui peta interaktif ini. Temukan UMKM terdekat dari lokasi Anda dengan mudah.</p>
                </div>
                <div class="flex justify-center md:justify-start">
                    <a href="/pemetaan" class="inline-flex items-center rounded-lg bg-action-yellow px-6 py-2.5 text-sm font-semibold text-main transition hover:bg-action-yellow/80">
                        Lihat Peta Lengkap
                    </a>
                </div>
            </div>
        </div>
	</div>
</section>
