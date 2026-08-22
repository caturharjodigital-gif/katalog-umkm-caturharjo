import { db } from '$lib/server/db.js';
import { umkm } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
	const slug = params.slug;
	const rows = await db.select().from(umkm).where(eq(umkm.id, slug));
	const item = rows[0] ?? null;
	return { item, slug };
}
