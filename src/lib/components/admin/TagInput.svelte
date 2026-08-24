<script>
	let { tags = $bindable([]), suggestions = [], maxTags = 3, maxChars = 30, error = '' } = $props();

	let input = $state('');
	let focused = $state(false);

	const suggs = [
		'Sertifikat Halal',
		'Menerima Pesanan Besar',
		'Sistem Borongan',
		'Bisa Antar',
		'Terima Custom'
	];

	let allSuggestions = $derived(suggestions.length ? suggestions : suggs);

	let filtered = $derived(
		allSuggestions.filter(
			(s) => !tags.includes(s) && s.toLowerCase().includes(input.toLowerCase().trim())
		)
	);

	function addTag(raw) {
		const val = (raw || '').trim().replace(/,$/, '').trim();
		if (!val) return;
		if (val.length > maxChars) return;
		if (tags.includes(val)) return;
		if (tags.length >= maxTags) return;
		tags = [...tags, val];
		input = '';
	}

	function removeTag(idx) {
		tags = tags.filter((_, i) => i !== idx);
	}

	function onKeydown(e) {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			addTag(input);
		} else if (e.key === 'Backspace' && !input && tags.length) {
			removeTag(tags.length - 1);
		}
	}

	function onBlur() {
		if (input.trim()) addTag(input);
		setTimeout(() => (focused = false), 150);
	}
</script>

<div class="space-y-2">
	<div
		class="flex min-h-10 flex-wrap items-center gap-1.5 rounded-lg border bg-white px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 {error
			? 'border-danger'
			: 'border-border'}"
	>
		{#each tags as tag, i}
			<span class="inline-flex items-center gap-1 rounded-full bg-badge-yellow-soft px-2.5 py-0.5 text-xs font-medium text-badge-yellow-text">
				{tag}
				<button
					type="button"
					onclick={() => removeTag(i)}
					class="ml-1 rounded-full p-0.5 hover:bg-black/5"
					aria-label="Hapus {tag}"
				>
					<svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
						><path d="M6 18L18 6M6 6l12 12" /></svg
					>
				</button>
			</span>
		{/each}

		{#if tags.length < maxTags}
			<input
				type="text"
				bind:value={input}
				onkeydown={onKeydown}
				onfocus={() => (focused = true)}
				onblur={onBlur}
				placeholder={tags.length === 0 ? 'Ketik badge lalu Enter atau koma…' : ''}
				maxlength={maxChars}
				class="min-w-24 flex-1 border-0 bg-transparent p-0 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-0"
			/>
		{/if}
	</div>

	{#if focused && filtered.length > 0 && tags.length < maxTags}
		<div class="flex flex-wrap gap-1.5">
			{#each filtered.slice(0, 5) as s}
				<button
					type="button"
					onclick={() => addTag(s)}
					class="rounded-full border border-border bg-white px-2.5 py-1 text-xs font-medium text-text hover:border-primary hover:text-primary"
				>
					+ {s}
				</button>
			{/each}
		</div>
	{/if}

	<div class="flex items-center justify-between text-xs">
		<span class="text-muted">{tags.length}/{maxTags} badge · tiap badge ≤{maxChars} karakter</span>
	</div>

	{#if error}
		<p class="text-xs text-danger">{error}</p>
	{/if}
</div>
