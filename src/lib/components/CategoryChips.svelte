<script>
	import { KATEGORI_OPTIONS } from '$lib/constants.js';

	let { selected = '' } = $props();

	const icons = {
		'Kuliner': `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
		'Jasa & Industri': `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
		'Agribisnis': `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
	};
</script>

<div class="flex flex-wrap items-center gap-2">
	<a
		href="/umkm"
		class="inline-flex items-center gap-1.5 rounded-lg border px-4 py-1.5 text-sm font-medium transition
			{selected === '' ? 'border-primary bg-primary text-white' : 'border-border bg-white text-muted hover:border-primary hover:text-primary'}"
	>
		Semua
	</a>
	{#each KATEGORI_OPTIONS as kategori}
		<a
			href="/umkm?kat={encodeURIComponent(kategori)}"
			class="inline-flex items-center gap-1.5 rounded-lg border px-4 py-1.5 text-sm font-medium transition
				{selected === kategori ? 'border-primary bg-primary text-white' : 'border-border bg-white text-muted hover:border-primary hover:text-primary'}"
		>
			<span>{@html icons[kategori] || ''}</span>
			{kategori}
		</a>
	{/each}
</div>
