import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';

// Client Turso libSQL — stateless HTTP, optimal untuk Vercel Serverless
// $env/dynamic/private agar tidak terbundle ke client
const client = createClient({
	url: env.TURSO_DATABASE_URL,
	authToken: env.TURSO_AUTH_TOKEN
});

// Export tanpa schema
// Saat schema siap: import * as schema from './schema.js'; drizzle(client, { schema })
export const db = drizzle(client);
export { client };
