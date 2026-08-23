<script>
	let {
		open = $bindable(false),
		title = 'Hapus UMKM?',
		message = 'Data yang dihapus tidak dapat dikembalikan.',
		confirmLabel = 'Hapus',
		cancelLabel = 'Batal',
		loading = false,
		onConfirm,
		onCancel
	} = $props();

	function close() {
		open = false;
		onCancel?.();
	}

	function confirm() {
		onConfirm?.();
	}
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-text/50 backdrop-blur-sm p-4"
		role="presentation"
		onclick={(e) => { if (e.target === e.currentTarget) close(); }}
		onkeydown={(e) => { if (e.key === 'Escape') close(); }}
		tabindex="-1"
	>
		<div class="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg" role="dialog" aria-modal="true">
			<h3 class="text-base font-bold text-text">{title}</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">{message}</p>
			<div class="mt-6 flex justify-end gap-3">
				<button type="button" onclick={close} disabled={loading} class="rounded-full border border-border bg-white px-5 py-2 text-sm font-semibold text-text hover:bg-background disabled:opacity-50">
					{cancelLabel}
				</button>
				<button type="button" onclick={confirm} disabled={loading} class="rounded-full bg-danger px-5 py-2 text-sm font-semibold text-white hover:bg-danger/90 disabled:opacity-50">
					{loading ? 'Menghapus...' : confirmLabel}
				</button>
			</div>
		</div>
	</div>
{/if}
