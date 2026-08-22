import { db } from '$lib/server/db.js';
import { umkm } from '$lib/server/schema.js';

export async function load() {
	let all = await db.select().from(umkm);
	const pins = all.filter((u) => u.koordinat && typeof u.koordinat.lat === 'number' && typeof u.koordinat.lng === 'number');
	return { pins };
}
