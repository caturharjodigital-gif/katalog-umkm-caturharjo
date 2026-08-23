import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db.js';
import * as authSchema from './auth-schema.js';

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: 'sqlite', schema: authSchema }),
	emailAndPassword: { enabled: true, requireEmailVerification: false },
	secret: process.env.BETTER_AUTH_SECRET || 'dev-secret-placeholder-please-set-env',
	baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5173',
	advanced: {
		crossSubDomainCookies: { enabled: false }
	}
});
