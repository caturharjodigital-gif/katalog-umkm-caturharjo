<script>
	import BadgeKategori from './BadgeKategori.svelte';
	import BadgeKhusus from './BadgeKhusus.svelte';
	let { umkm } = $props();
	let badges = $derived(umkm.badge_khusus || []);
</script>
<a href="/umkm/{umkm.id}" class="group block overflow-hidden rounded-lg border border-border bg-white shadow-sm transition hover:-translate-y-2 duration-200 hover:shadow-md">
	<div class="relative aspect-video w-full overflow-hidden bg-surface">
		{#if umkm.foto_utama && !umkm.foto_utama.includes('placeholder')}
			<img src={umkm.foto_utama} alt={umkm.nama_usaha} loading="lazy" class="h-full w-full object-cover transition group-hover:scale-105" />
		{:else}
			<div class="flex h-full w-full items-center justify-center bg-surface">
				<span class="text-3xl text-muted/40">{umkm.nama_usaha[0]}</span>
			</div>
		{/if}
	</div>
	<div class="flex flex-col gap-2 p-4">
		<h3 class="text-sm md:text-base font-semibold leading-tight text-text">{umkm.nama_usaha}</h3>
		<p class="line-clamp-2 text-xs md:text-sm leading-relaxed text-muted">{umkm.deskripsi}</p>
		<div class="mt-1 flex flex-wrap items-center gap-1.5">
			<BadgeKategori kategori={umkm.kategori} />
			{#each badges as b}
				<BadgeKhusus badge={b} />
			{/each}
		</div>
		<div class="mt-1 text-right text-sm font-semibold text-primary group-hover:underline">Lihat Detail →</div>
	</div>
</a>
