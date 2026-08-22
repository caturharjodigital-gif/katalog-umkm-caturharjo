<script>
	import MapView from '$lib/components/MapView.svelte';

	let { data } = $props();
	let pins = $derived(data.pins || []);
</script>

<svelte:head>
	<title>Peta Sebaran UMKM — UMKM Caturharjo</title>
</svelte:head>

<!-- Header bar biru — sesuai Pemetaan_Random_Map.png -->
<div class="bg-primary">
	<div class="flex mx-auto justify-between max-w-7xl px-5 py-2 md:px-8 md:py-3">
		<div>
			<h1 class="text-xl font-bold text-white md:text-2xl">Peta Sebaran UMKM</h1>
			<p class="mt-1 text-sm text-white/80">Klik penanda untuk melihat detail UMKM.</p>
		</div>
		<div>
			<!-- Meta count -->
			{#if pins.length > 0}
			<p class="text-sm text-white/80">{pins.length} UMKM ditampilkan di peta</p>
			{/if}
		</div>
	</div>
</div>

<!-- Map -->
<div class="mx-auto max-w-full h-auto px-0 py-0 md:px-0">
	{#if pins.length === 0}
		<div class="flex flex-col items-center justify-center px-5 py-16 text-center">
			<div class="flex h-16 w-16 items-center justify-center rounded-full bg-surface">
				<svg class="h-8 w-8 text-muted/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M12 21s-7-5.373-7-11a7 7 0 0114 0c0 5.627-7 11-7 11z"/>
					<circle cx="12" cy="10" r="3"/>
				</svg>
			</div>
			<p class="mt-4 max-w-md text-sm leading-relaxed text-muted">
				Belum ada UMKM dengan koordinat. Koordinat akan ditambahkan melalui halaman Edit UMKM.
			</p>
		</div>
	{:else}
		<MapView pins={pins} />
	{/if}
</div>


