<script>
	import { page } from '$app/stores';
	import logoWebsite from '$lib/assets/logo-website.svg'
	let path = $derived($page.url.pathname);
	let open = $state(false);

	$effect(() => {
		// auto-close on route change
		path;
		open = false;
	});

	function isActive(href) {
		if (href === '/') return path === '/';
		return path.startsWith(href);
	}
</script>

<header class="sticky top-0 z-40 border-b border-border bg-surface">
	<nav class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-2.5">
			<img src="{logoWebsite}" alt="Logo" class="w-7 h-7 md:w-8 md:h-8">
			<span class="text-lg md:text-xl font-bold tracking-tight text-primary">UMKM</span>
			<span class="text-lg md:text-xl font-bold tracking-tight text-yellow-600">Caturharjo</span>
		</a>

		<!-- Desktop -->
		<div class="hidden items-center gap-7 md:flex">
			<a href="/" class="relative text-[15px] font-medium transition duration-150 {isActive('/') ? 'text-primary -translate-y-2' : 'text-muted hover:text-text'}">
				Beranda
				{#if isActive('/')}
					<span class="absolute -bottom-1 left-0 h-[2.5px] w-full rounded-full bg-action-yellow"></span>
				{/if}
			</a>
			<a href="/umkm" class="relative text-[15px] font-medium transition duration-150 {isActive('/umkm') ? 'text-primary -translate-y-2' : 'text-muted hover:text-text'}">
				Daftar UMKM
				{#if isActive('/umkm')}
					<span class="absolute -bottom-1 left-0 h-[2.5px] w-full rounded-full bg-action-yellow"></span>
				{/if}
			</a>
			<a href="/pemetaan" class="relative text-[15px] font-medium transition duration-150 {isActive('/pemetaan') ? 'text-primary -translate-y-2' : 'text-muted hover:text-text'}">
				Peta
				{#if isActive('/pemetaan')}
					<span class="absolute -bottom-1 left-0 h-[2.5px] w-full rounded-full bg-action-yellow"></span>
				{/if}
			</a>
		</div>

		<!-- Mobile -->
		<details bind:open class="relative md:hidden">
			<summary class="list-none cursor-pointer rounded-lg border border-border p-2 text-muted">
				<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
			</summary>
			<div class="absolute right-0 top-full z-50 mt-2 w-44 rounded-xl border border-border bg-white py-1 shadow-lg">
				<a href="/" class="block px-4 py-2.5 text-[15px] {isActive('/') ? 'bg-primary-soft font-semibold text-primary' : 'text-muted'}">Beranda</a>
				<a href="/umkm" class="block px-4 py-2.5 text-[15px] {isActive('/umkm') ? 'bg-primary-soft font-semibold text-primary' : 'text-muted'}">Daftar UMKM</a>
				<a href="/pemetaan" class="block px-4 py-2.5 text-[15px] {isActive('/pemetaan') ? 'bg-primary-soft font-semibold text-primary' : 'text-muted'}">Peta</a>
			</div>
		</details>
	</nav>
</header>
