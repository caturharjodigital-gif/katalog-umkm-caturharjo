import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth.js';

export async function load({ request, url }) {
	if (url.pathname.startsWith('/admin/login')) return { user: null };

	let session = null;
	try {
		session = await auth.api.getSession({ headers: request.headers });
	} catch (e) {
		console.log('[guard] getSession error', e?.message);
	}

	if (!session?.user) throw redirect(302, '/admin/login');

	return { user: session.user, session };
}
