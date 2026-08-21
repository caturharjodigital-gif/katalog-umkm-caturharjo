<script>
	let { kategori } = $props();

	const styles = {
		'Kuliner': 'bg-badge-orange-soft text-badge-orange-text',
		'Jasa & Industri': 'bg-badge-blue-soft text-badge-blue-text',
		'Agribisnis': 'bg-badge-green-soft text-badge-green-text'
	};

	let cls = $derived(styles[kategori] || 'bg-primary-soft text-badge-blue-text');
</script>

<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {cls}">
	{kategori}
</span>
