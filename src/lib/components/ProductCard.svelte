<script>
	let { produk } = $props();
	let harga = $derived(produk.range_harga_produk || 'Hubungi pemilik untuk harga terbaru');
	let isFallback = $derived(!produk.range_harga_produk);
</script>
<div class="flex flex-col gap-1.5">
	<div class="aspect-4/3 w-full overflow-hidden rounded-lg bg-surface">
		{#if produk.foto_produk}
			<img src={produk.foto_produk} alt={produk.nama_produk} loading="lazy" class="h-full w-full object-cover" />
		{:else}
			<div class="flex h-full w-full items-center justify-center text-sm text-muted/50">Tidak ada foto</div>
		{/if}
	</div>
	<h4 class="text-sm font-semibold text-text">{produk.nama_produk}</h4>
	<p class="text-sm font-semibold text-primary">{harga}</p>
	{#if produk.daftar_harga && produk.daftar_harga.length > 0}
		<ul class="mt-1 list-disc pl-4 text-xs text-muted">
			{#each produk.daftar_harga as item}
				<li>{item}</li>
			{/each}
		</ul>
	{/if}
</div>
