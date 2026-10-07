import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
export const GET: APIRoute = async ({ site }) => {
  const projects = await getCollection('projects');
  const podcasts = await getCollection('podcasts');
  const paths = [
    '/',
    '/about/',
    '/projects/',
    '/experience/',
    '/lab/',
    '/media/',
    '/contact/',
    ...projects.map((p) => `/projects/${p.id}/`),
    ...podcasts.map((p) => `/media/${p.id}/`),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${new URL(p, site).href}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
