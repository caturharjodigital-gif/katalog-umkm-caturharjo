<script>
	import { enhance } from '$app/forms';

	let { user = null } = $props();
</script>

<header class="sticky top-0 z-40 border-b border-border bg-white">
	<nav class="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
		<div class="flex items-center gap-2.5">
			<a href="/admin" class="flex items-center gap-2.5">
				<span class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
					<svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d="M12 3.5L2 11.5V20a1 1 0 001 1h5.5a1 1 0 001-1v-4.5h5V21a1 1 0 001 1H21a1 1 0 001-1V11.5L12 3.5z"/>
					</svg>
				</span>
				<span class="text-sm md:text-[16px] font-bold tracking-tight text-primary">UMKM Caturharjo</span>
			</a>
			<span class="rounded-full bg-action-yellow px-2 py-0.5 text-[10px] font-bold tracking-wide text-text">ADMIN</span>
		</div>

		<div class="flex items-center gap-3">
			<a href="/" target="_blank" rel="noreferrer" class="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:inline-flex">
				<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
				Lihat Situs
			</a>

			{#if user}
			<form method="POST" action="/admin?/logout" use:enhance>
				<button type="submit" class="flex gap-1 items-center rounded-lg border border-border bg-danger px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-md font-semibold text-white/80 hover:bg-danger/80 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 font-semibold " viewBox="0 0 24 24">
						<path d="M0 0h24v24H0z" fill="none" />
						<path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z" />
					</svg>
					Keluar
				</button>
			</form>
			{/if}
		</div>
	</nav>
</header>
