<script>
	let { badge } = $props();
	const halal = badge === 'Sertifikat Halal';
	let cls = $derived(halal ? 'bg-badge-green-soft text-badge-green-text' : 'bg-badge-yellow-soft text-badge-yellow-text');
</script>
<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {cls}">{badge}</span>
