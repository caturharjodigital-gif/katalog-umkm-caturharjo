<script>
	import PhotoUpload from './PhotoUpload.svelte';

	let { items = $bindable([{ nama_produk: '', foto_produk: '', range_harga_produk: '', daftar_harga: [] }]), errors = {} } = $props();

	function addItem() {
		items = [...items, { nama_produk: '', foto_produk: '', range_harga_produk: '', daftar_harga: [] }];
	}

	function removeItem(idx) {
		if (items.length <= 1) return;
		items = items.filter((_, i) => i !== idx);
	}

	function onDaftarHargaChange(idx, raw) {
		const arr = raw
			.split('\n')
			.map((s) => s.trim())
			.filter(Boolean);
		items[idx].daftar_harga = arr;
	}
</script>

<div class="space-y-4">
	{#each items as item, idx}
		<div class="relative rounded-xl border border-border bg-white p-4 shadow-sm">
			<div class="mb-3 flex items-center justify-between">
				<h4 class="text-sm font-semibold text-text">Produk {idx + 1}</h4>
				{#if items.length > 1}
					<button
						type="button"
						onclick={() => removeItem(idx)}
						class="rounded-full p-1.5 text-danger hover:bg-danger-soft"
						aria-label="Hapus produk {idx + 1}"
					>
						<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
							><polyline points="3 6 5 6 21 6" /><path
								d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
							/></svg
						>
					</button>
				{/if}
			</div>

			<div class="grid gap-3">
				<div>
					<label for="produk-nama-{idx}" class="text-xs font-semibold text-text"
						>Nama Produk <span class="text-danger">*</span></label
					>
					<input
						id="produk-nama-{idx}"
						type="text"
						bind:value={item.nama_produk}
						placeholder="Contoh: Kanopi"
						class="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
					/>
					{#if errors[`produk_layanan.${idx}.nama_produk`]}
						<p class="mt-1 text-xs text-danger">{errors[`produk_layanan.${idx}.nama_produk`]}</p>
					{/if}
				</div>

				<div>
					<label for="produk-range-{idx}" class="text-xs font-semibold text-text">Range Harga Produk</label>
					<input
						id="produk-range-{idx}"
						type="text"
						bind:value={item.range_harga_produk}
						placeholder="Contoh: Rp1.000/biji atau Mengikuti bahan"
						class="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
					/>
				</div>

				<div>
					<span class="text-xs font-semibold text-text">Foto Produk</span>
					<div class="mt-1">
						<PhotoUpload bind:url={item.foto_produk} label="Foto produk {idx + 1}" helpText="Opsional · JPG/PNG ≤1MB" />
					</div>
				</div>

				<div>
					<label for="produk-daftar-{idx}" class="text-xs font-semibold text-text">Daftar Harga / Detail</label>
					<p class="text-[11px] text-muted">Satu baris = satu item, format: <code class="rounded bg-surface px-1">nama item @harga</code></p>
					<textarea
						id="produk-daftar-{idx}"
						rows="3"
						value={(item.daftar_harga || []).join('\n')}
						oninput={(e) => onDaftarHargaChange(idx, e.currentTarget.value)}
						placeholder="Contoh:&#10;Kanopi 3x4 @Rp2.500.000&#10;Pagar besi @Rp1.200.000"
						class="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
					></textarea>
				</div>
			</div>
		</div>
	{/each}

	<button
		type="button"
		onclick={addItem}
		class="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-text hover:bg-background"
	>
		<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
			><path d="M12 5v14M5 12h14" /></svg
		>
		Tambah Produk
	</button>
</div>
