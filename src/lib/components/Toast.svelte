<script>
	import { fly, fade } from 'svelte/transition';

	let { message = '', type = 'success' } = $props();

	let visible = $state(!!message);

	$effect(() => {
		if (message) {
			visible = true;
			const t = setTimeout(() => {
				visible = false;
			}, 2800);
			return () => clearTimeout(t);
		}
	});
</script>

{#if visible && message}
	<div
		in:fly={{ y: 16, duration: 220 }}
		out:fade={{ duration: 180 }}
		class="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 rounded-xl border px-3 py-1.5 md:px-4 md:py-2.5 text-xs md:text-sm font-medium shadow-lg backdrop-blur {type === 'success'
			? 'border-action-green/20 bg-badge-green-soft text-badge-green-text'
			: type === 'error'
				? 'border-danger/20 bg-danger-soft text-danger'
				: 'border-border bg-white text-text'}"
		role="status"
		aria-live="polite"
	>
		{message}
	</div>
{/if}
