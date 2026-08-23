<script>
	import '../app.css';
	import '@fontsource/plus-jakarta-sans/400.css';
	import '@fontsource/plus-jakarta-sans/500.css';
	import '@fontsource/plus-jakarta-sans/600.css';
	import '@fontsource/plus-jakarta-sans/700.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';

	let { children } = $props();
	let isAdmin = $derived($page.url.pathname.startsWith('/admin'));
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if isAdmin}
	<main class="min-h-screen bg-background">{@render children()}</main>
{:else}
	<div class="flex min-h-screen flex-col">
		<Navbar />
		<main class="flex-1">{@render children()}</main>
		<Footer />
	</div>
{/if}
