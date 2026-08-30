import { db } from '$lib/server/db.js';
import { umkm } from '$lib/server/schema.js';

const SITE = 'https://umkm-caturharjo.web.id';

export async function GET() {
	const rows = await db.select({ id: umkm.id, updatedAt: umkm.updatedAt }).from(umkm);

	const staticUrls = [
		{ loc: `${SITE}/`, priority: 1.0, changefreq: 'weekly' },
		{ loc: `${SITE}/umkm`, priority: 0.9, changefreq: 'weekly' },
		{ loc: `${SITE}/pemetaan`, priority: 0.7, changefreq: 'weekly' }
	];

	const dynamicUrls = rows.map((r) => ({
		loc: `${SITE}/umkm/${encodeURIComponent(r.id)}`,
		lastmod: r.updatedAt ? new Date(r.updatedAt).toISOString() : new Date().toISOString(),
		priority: 0.8,
		changefreq: 'weekly'
	}));

	const all = [...staticUrls, ...dynamicUrls];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
	.map(
		(u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
}

function escapeXml(s) {
	return s
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}
