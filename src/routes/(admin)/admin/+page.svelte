<script>
	import { enhance } from '$app/forms';
	import BadgeKategori from '$lib/components/BadgeKategori.svelte';
	import DeleteModal from '$lib/components/admin/DeleteModal.svelte';

	let { data, form } = $props();

	let rows = $derived(data?.rows || []);
	let count = $derived(rows.length);

	let modalOpen = $state(false);
	let pendingId = $state(null);
	let pendingName = $state('');
	let formNode = $state(null);

	function openDelete(row) {
		pendingId = row.id;
		pendingName = row.nama_usaha;
		modalOpen = true;
	}

	function confirmDelete() {
		if (!formNode || !pendingId) return;
		const input = formNode.querySelector('input[name="id"]');
		if (input) input.value = pendingId;
		formNode.requestSubmit();
	}
</script>

<svelte:head>
	<title>Admin — List UMKM</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-8">
	<!-- Heading + action -->
	<div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
		<div>
			<h1 class="text-xl font-bold text-text md:text-2xl">List UMKM</h1>
			<p class="mt-1 text-sm text-muted">Kelola data UMKM yang tampil di halaman publik.</p>
		</div>
		<a href="/admin/umkm/tambah" class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover">
			<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
			Tambah UMKM
		</a>
	</div>

	<p class="mt-4 text-sm text-muted">Menampilkan {count} UMKM</p>

	{#if form?.error}
		<div class="mt-3 rounded-lg bg-danger-soft px-4 py-2.5 text-sm text-danger">{form.error}</div>
	{/if}

	<!-- Empty M9 -->
	{#if count === 0}
		<div class="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white px-6 py-12 text-center">
			<div class="flex h-16 w-16 items-center justify-center rounded-full bg-surface">
				<svg class="h-8 w-8 text-muted/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<rect x="3" y="3" width="18" height="18" rx="2"/>
					<path d="M8 12h8M12 8v8"/>
				</svg>
			</div>
			<p class="mt-3 text-sm font-semibold text-text">Belum ada UMKM.</p>
			<p class="mt-1 max-w-sm text-xs text-muted">Klik + Tambah UMKM untuk memulai.</p>
			<a href="/admin/umkm/tambah" class="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-hover">
				+ Tambah UMKM
			</a>
		</div>
	{:else}
		<!-- Desktop table -->
		<div class="mt-4 hidden overflow-hidden rounded-xl border border-border bg-white md:block">
			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm">
					<thead>
						<tr class="border-b border-border bg-background text-xs font-semibold uppercase tracking-wide text-muted">
							<th class="px-4 py-3">UMKM</th>
							<th class="px-4 py-3">KATEGORI</th>
							<th class="px-4 py-3 text-right">AKSI</th>
						</tr>
					</thead>
					<tbody>
						{#each rows as row}
							<tr class="border-b border-border last:border-0 hover:bg-surface/60">
								<td class="px-4 py-3">
									<div class="flex items-center gap-3">
										<div class="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-surface">
											{#if row.foto_utama && !row.foto_utama.includes('placeholder')}
												<img src={row.foto_utama} alt={row.nama_usaha} class="h-full w-full object-cover" loading="lazy" />
											{:else}
												<div class="flex h-full w-full items-center justify-center text-xs font-bold text-muted/40">{row.nama_usaha[0]}</div>
											{/if}
										</div>
										<div class="min-w-0">
											<div class="truncate text-sm font-semibold text-text">{row.nama_usaha}</div>
											<div class="truncate text-xs text-muted">{row.nama_pemilik}</div>
										</div>
									</div>
								</td>
								<td class="px-4 py-3">
									<BadgeKategori kategori={row.kategori} />
								</td>
								<td class="px-4 py-3">
									<div class="flex items-center justify-end gap-2">
										<a href="/umkm/{row.id}" target="_blank" rel="noreferrer" class="rounded-full px-3 py-1 text-xs font-semibold text-primary hover:underline">
											Lihat
										</a>
										<a href="/admin/umkm/edit/{row.id}" class="rounded-lg border border-primary bg-white px-3 py-1 text-xs font-semibold text-text hover:bg-background">
											Edit
										</a>
										<button type="button" onclick={() => openDelete(row)} class="rounded-lg p-1.5 text-danger hover:bg-danger-soft" aria-label="Hapus {row.nama_usaha}">
											<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
												<polyline points="3 6 5 6 21 6"/>
												<path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
												<line x1="10" y1="11" x2="10" y2="17"/>
												<line x1="14" y1="11" x2="14" y2="17"/>
											</svg>
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- Mobile stacked -->
		<div class="mt-4 grid gap-3 md:hidden">
			{#each rows as row}
				<div class="overflow-hidden rounded-xl border border-border bg-white p-4">
					<div class="flex items-center gap-3">
						<div class="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface">
							{#if row.foto_utama && !row.foto_utama.includes('placeholder')}
								<img src={row.foto_utama} alt={row.nama_usaha} class="h-full w-full object-cover" loading="lazy" />
							{:else}
								<div class="flex h-full w-full items-center justify-center text-sm font-bold text-muted/40">{row.nama_usaha[0]}</div>
							{/if}
						</div>
						<div class="min-w-0 flex-1">
							<div class="truncate text-sm font-semibold text-text">{row.nama_usaha}</div>
							<div class="truncate text-xs text-muted">{row.nama_pemilik}</div>
							<div class="mt-1"><BadgeKategori kategori={row.kategori} /></div>
						</div>
					</div>
					<div class="mt-3 flex items-center justify-end gap-2">
						<a href="/umkm/{row.id}" target="_blank" rel="noreferrer" class="rounded-lg px-3 py-1 text-xs font-semibold text-primary hover:underline">Lihat</a>
						<a href="/admin/umkm/edit/{row.id}" class="rounded-lg border border-primary bg-white px-3 py-1 text-xs font-semibold text-text hover:bg-background">Edit</a>
						<button type="button" onclick={() => openDelete(row)} class="rounded-lg p-1.5 text-danger hover:bg-danger-soft" aria-label="Hapus {row.nama_usaha}">
							<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="3 6 5 6 21 6"/>
								<path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
								<line x1="10" y1="11" x2="10" y2="17"/>
								<line x1="14" y1="11" x2="14" y2="17"/>
							</svg>
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<!-- Hidden form to drive delete action + modal -->
<form method="POST" action="?/delete" bind:this={formNode} use:enhance style="display:none">
	<input type="hidden" name="id" value={pendingId || ''} />
</form>

<DeleteModal
	bind:open={modalOpen}
	title="Hapus UMKM?"
	message={`Apakah kamu yakin ingin menghapus "${pendingName}"? Data yang dihapus tidak dapat dikembalikan.`}
	confirmLabel="Hapus"
	onConfirm={confirmDelete}
	onCancel={() => { modalOpen = false; pendingId = null; }}
/>
