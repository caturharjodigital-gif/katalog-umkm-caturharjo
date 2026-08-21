<script>
	let { kategori, icon, query } = $props();
</script>

<a
	href="/umkm?kat={query}"
	class="flex flex-col items-center gap-3 rounded-lg bg-surface shadow-sm px-6 py-6 text-center transition hover:shadow-lg hover:-translate-y-2 duration-200"
>
	<div class="text-primary">{@html icon}</div>
	<span class="text-sm font-semibold text-text">{kategori}</span>
</a>
