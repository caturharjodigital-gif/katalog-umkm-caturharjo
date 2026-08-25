<script>
	import { KATEGORI_OPTIONS } from '$lib/constants.js';

	let { selected = '' } = $props();

	const rawIcons = {
		'Kuliner': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M1 22c0 .54.45 1 1 1h13c.56 0 1-.46 1-1v-1H1zM8.5 9C4.75 9 1 11 1 15h15c0-4-3.75-6-7.5-6m-4.88 4c1.11-1.55 3.47-2 4.88-2s3.77.45 4.88 2zM1 17h15v2H1zM18 5V1h-2v4h-5l.23 2h9.56l-1.4 14H18v2h1.72c.84 0 1.53-.65 1.63-1.47L23 5z" /></svg>`,
		'Jasa & Industri': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
		'Agribisnis': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M23 4.1V2.3l-1.8-.2c-.1 0-.7-.1-1.7-.1c-4.1 0-7.1 1.2-8.8 3.3C9.4 4.5 7.6 4 5.5 4c-1 0-1.7.1-1.7.1l-1.9.3l.1 1.7c.1 3 1.6 8.7 6.8 8.7H9v3.4c-3.8.5-7 1.8-7 1.8v2h20v-2s-3.2-1.3-7-1.8V15c6.3-.1 8-7.2 8-10.9M12 18h-1v-5.6S10.8 9 8 9c0 0 1.5.8 1.9 3.7c-.4.1-.8.1-1.1.1C4.2 12.8 4 6.1 4 6.1S4.6 6 5.5 6c1.9 0 5 .4 5.9 3.1C11.9 4.6 17 4 19.5 4c.9 0 1.5.1 1.5.1s0 9-6.3 9H14c0-2 2-5 2-5c-3 1-3 4.9-3 4.9v5z" /></svg>`
	};
	const iconColor = {
		'Kuliner': 'text-badge-yellow-text',
		'Jasa & Industri': 'text-muted',
		'Agribisnis': 'text-action-green'
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
			<span class="flex h-4 w-4 items-center justify-center {selected === kategori ? 'text-white' : iconColor[kategori]}">
				{@html rawIcons[kategori] || ''}
			</span>
			{kategori}
		</a>
	{/each}
</div>
