<script>
	import UmkmCard from '$lib/components/UmkmCard.svelte';
	import CategoryChips from '$lib/components/CategoryChips.svelte';
	import { goto } from '$app/navigation';

	let { data } = $props();

	let all = $derived(data.all || []);
	let q = $derived(data.q || '');
	let kat = $derived(data.kat || '');
	let total = $derived(data.total ?? all.length);

	let searchVal = $state(q);

	$effect(() => {
		searchVal = q;
	});

	function handleSearch(e) {
		e.preventDefault();
		const params = new URLSearchParams();
		if (searchVal.trim()) params.set('q', searchVal.trim());
		if (kat) params.set('kat', kat);
		const qs = params.toString();
		goto(`/umkm${qs ? '?' + qs : ''}`);
	}

	function handleClear() {
		searchVal = '';
		const params = new URLSearchParams();
		if (kat) params.set('kat', kat);
		const qs = params.toString();
		goto(`/umkm${qs ? '?' + qs : ''}`);
	}
</script>

<svelte:head>
	<title>Daftar UMKM — UMKM Caturharjo</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
	<!-- Header -->
	<div class="text-center">
		<h1 class="text-2xl font-extrabold text-text md:text-3xl lg:text-4xl">Daftar UMKM Caturharjo</h1>
		<p class="mt-2 text-sm md:text-base text-muted">
			Temukan berbagai usaha lokal di Padukuhan Caturharjo, Tamanmartani
		</p>
	</div>

	<div class="flex flex-col items-start p-4 md:p-6 mt-4 md:mt-6 lg:mt-8 bg-primary-soft rounded-lg">
		<!-- Search pill -->
		<form onsubmit={handleSearch} class="mx-auto flex w-full items-center">
			<div class="relative flex-1">
				<svg class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
				<input
					type="text"
					bind:value={searchVal}
					placeholder="Cari UMKM, produk, atau layanan…"
					class="h-11 w-full rounded-l-lg border border-border border-r-0 bg-white pl-11 pr-4 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
				/>
			</div>
			<button type="submit" class="inline-flex h-11 items-center justify-center rounded-r-lg bg-primary px-5 text-white transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
				<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
			</button>
		</form>
	
		<!-- Category chips -->
		<div class="mt-2 flex justify-center">
			<CategoryChips selected={kat} />
		</div>
	</div>

	<!-- Meta M5 -->
	<p class="mt-6 text-sm text-muted">Menampilkan {total} UMKM</p>

	<!-- Grid atau Empty M6 -->
	{#if all.length === 0}
		<div class="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white px-6 py-12 text-center">
			<svg class="h-10 w-10 text-muted/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
			<p class="mt-3 max-w-md text-sm leading-relaxed text-muted">
				UMKM tidak ditemukan. Coba kata kunci lain seperti "kanopi", "pisang", "nila", atau "snack".
			</p>
			{#if q || kat}
				<a href="/umkm" onclick={handleClear} class="mt-4 inline-flex items-center rounded-full border border-primary px-4 py-1.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
					Reset Pencarian
				</a>
			{/if}
		</div>
	{:else}
		<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each all as item}
				<UmkmCard umkm={item} />
			{/each}
		</div>
	{/if}
</div>
