import { db } from '$lib/server/db.js';
import { umkm } from '$lib/server/schema.js';

export async function load() {
	const all = await db.select().from(umkm);
	// Preview 3 saja
	const preview = all.slice(1, 4);
	return { preview };
}
