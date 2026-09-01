<script>
	let {
		url = $bindable(''),
		label = 'Foto',
		required = false,
		error = '',
		maxBytes = 1024 * 1024,
		helpText = 'JPG/PNG ≤1MB, rasio 16:9.'
	} = $props();

	let dragging = $state(false);
	let localPreview = $state('');
	let uploadError = $state('');
	let uploading = $state(false);
	let fileInput;

	const ACCEPT = 'image/jpeg,image/png,image/webp';

	function validateFile(file) {
		if (!file) return 'Tidak ada file.';
		const typeOk = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
		if (!typeOk) return 'Hanya JPG/PNG/WebP.';
		if (file.size > maxBytes) return `File melebihi ${Math.round(maxBytes / 1024)} KB.`;
		return '';
	}

	function onPick(e) {
		const file = e.target.files?.[0];
		handleFile(file);
		if (fileInput) fileInput.value = '';
	}

	function onDrop(e) {
		dragging = false;
		const file = e.dataTransfer?.files?.[0];
		handleFile(file);
	}

	async function handleFile(file) {
		uploadError = '';
		const msg = validateFile(file);
		if (msg) {
			uploadError = msg;
			return;
		}

		const previousUrl = url;

		const reader = new FileReader();
		reader.onload = () => (localPreview = String(reader.result || ''));
		reader.readAsDataURL(file);

		await doUpload(file);
		if (previousUrl && previousUrl !== url && previousUrl.includes('.public.blob.vercel-storage.com')) {
			deleteBlob(previousUrl);
		}
	}

	async function doUpload(file) {
		uploading = true;
		try {
			const form = new FormData();
			form.set('file', file);
			const res = await fetch('/api/blob/upload', { method: 'POST', body: form });
			if (!res.ok) {
				const j = await res.json().catch(() => ({}));
				throw new Error(j?.error || j?.message || 'Gagal upload.');
			}
			const j = await res.json();
			url = j?.url || j?.pathname || '';
			localPreview = '';
		} catch (e) {
			uploadError = e?.message || String(e);
		} finally {
			uploading = false;
		}
	}

	async function deleteBlob(urlToDelete) {
		if (!urlToDelete || !urlToDelete.includes('.public.blob.vercel-storage.com')) return;
		try {
			await fetch('/api/blob/delete', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ url: urlToDelete })
			});
		} catch {}
	}

	function clear() {
		const old = url;
		url = '';
		localPreview = '';
		uploadError = '';
		if (fileInput) fileInput.value = '';
		if (old) deleteBlob(old);
	}

	let previewSrc = $derived(localPreview || url);
</script>

<div class="min-w-0 space-y-2 overflow-hidden">
	<div
		class="relative flex aspect-video min-w-0 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed bg-white px-4 py-6 text-center {error ||
		uploadError
			? 'border-danger'
			: dragging
				? 'border-primary bg-primary-soft/40'
				: 'border-border'}"
		ondragover={(e) => {
			e.preventDefault();
			dragging = true;
		}}
		ondragleave={() => (dragging = false)}
		ondrop={(e) => {
			e.preventDefault();
			onDrop(e);
		}}
		role="button"
		tabindex="0"
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') fileInput?.click();
		}}
	>
		{#if previewSrc}
			<img src={previewSrc} alt={label} class="absolute inset-0 h-full w-full object-cover" />
			<div class="absolute inset-0 bg-text/10"></div>
		{/if}

		<div class="relative flex flex-col items-center gap-2">
			{#if !previewSrc}
				<div class="flex h-10 w-10 items-center justify-center rounded-full bg-surface">
					<svg class="h-5 w-5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
						><path d="M12 16a4 4 0 100-8 4 4 0 000 8z" /><path
							d="M3 8a2 2 0 012-2h2l2-2h6l2 2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
						/></svg
					>
				</div>
				<p class="text-xs md:text-sm font-medium text-text">
					Tarik foto ke sini atau
					<button
						type="button"
						onclick={() => fileInput?.click()}
						class="text-primary underline decoration-primary/30 underline-offset-2 hover:text-primary-hover cursor-pointer hover:underline"
					>Pilih</button
					>
				</p>
				<p class="text-[11px] md:text-xs text-muted">Rekomendasi 16:9 · {helpText}</p>
			{:else}
				<div class="flex gap-2">
					<button
						type="button"
						onclick={() => fileInput?.click()}
						class="rounded-lg bg-white px-4 py-1.5 text-xs font-semibold text-text shadow-sm hover:bg-background cursor-pointer"
					>
						Ganti Foto
					</button>
					<button
						type="button"
						onclick={clear}
						class="rounded-lg border border-white bg-white/90 px-4 py-1.5 text-xs font-semibold text-danger shadow-sm hover:bg-white cursor-pointer"
					>
						Hapus Foto
					</button>
				</div>
			{/if}

			{#if uploading}
				<p class="text-xs font-medium text-primary">Mengupload…</p>
			{/if}
		</div>
	</div>

	<input
		bind:this={fileInput}
		type="file"
		accept={ACCEPT}
		onchange={onPick}
		class="hidden"
		aria-label={label}
	/>

	{#if url}
		<p class="flex min-w-0 items-start gap-1 overflow-hidden text-xs text-muted">
			<span class="shrink-0">URL:</span><a href={url} target="_blank" rel="noreferrer" class="min-w-0 flex-1 break-all text-primary underline">{url}</a>
		</p>
	{/if}

	{#if error}
		<p class="text-xs text-danger">{error}</p>
	{:else if uploadError}
		<p class="text-xs text-danger">{uploadError}</p>
	{/if}

	{#if required && !url && !localPreview}
		<p class="text-xs text-muted">Wajib upload 1 foto.</p>
	{/if}
</div>
