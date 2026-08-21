<script>
	let { value = $bindable(''), placeholder = 'Cari UMKM, produk, atau layanan...' } = $props();
</script>

<div class="flex items-center gap-0">
	<div class="relative flex-1">
		<svg class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="11" cy="11" r="8" />
			<path d="M21 21l-4.35-4.35" />
		</svg>
		<input
			type="text"
			{placeholder}
			bind:value
			class="h-11 w-full rounded-l-lg border border-border border-r-0 bg-white pl-11 pr-4 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1"
		/>
	</div>
	<button
		type="submit"
		class="inline-flex h-11 items-center justify-center rounded-r-lg bg-primary px-5 text-white transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
	>
		<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="11" cy="11" r="8" />
			<path d="M21 21l-4.35-4.35" />
		</svg>
	</button>
</div>
