<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Admin Login — UMKM Caturharjo</title>
</svelte:head>

<div class="flex min-h-[90vh] items-center justify-center bg-background px-4 py-10">
	<div class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm md:p-7">
		<div class="text-center">
			<h1 class="text-lg font-bold text-primary">Admin Login</h1>
			<p class="mt-1 text-sm text-muted">Katalog UMKM Caturharjo</p>
		</div>

		{#if form?.error}
			<div class="mt-4 rounded-lg bg-danger-soft px-4 py-2.5 text-sm text-danger">
				{form.error}
			</div>
		{/if}

		<form method="POST" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; await update(); }; }} class="mt-6 space-y-4">
			<div>
				<label for="email" class="text-xs font-semibold text-primary">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					value={form?.email || ''}
					placeholder="admin@example.com"
					class="mt-1 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
				/>
			</div>

			<div>
				<label for="password" class="text-xs font-semibold text-primary">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					placeholder="password..."
					class="mt-1 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				class="mt-2 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60 cursor-pointer"
			>
				{loading ? 'Memproses...' : 'Masuk'}
			</button>
		</form>
	</div>
</div>
