<script>
	import AdminNavbar from '$lib/components/admin/AdminNavbar.svelte';

	let { children, data } = $props();
</script>

<div class="min-h-screen bg-background">
	<AdminNavbar user={data?.user || null} />
	{@render children()}
</div>
