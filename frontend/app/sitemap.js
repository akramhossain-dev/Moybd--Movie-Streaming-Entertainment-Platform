export default async function sitemap() {
  const baseUrl = 'https://moybd.sbs';

  const staticRoutes = [
    '',
    '/movies',
    '/series',
    '/anime',
    '/Action',
    '/Bollywood',
    '/Hollywood',
    '/South',
    '/Comedy',
    '/Drama',
    '/Horror',
    '/Thriller',
    '/about',
    '/contact',
    '/dmca',
    '/privacy-policy',
    '/Terms-&-Conditions',
    '/watchlist',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const res = await fetch(`${apiUrl}/api/dashboard/publicmovies`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        const movieRoutes = data.data
          .filter((m) => m.slug)
          .map((m) => ({
            url: `${baseUrl}/download/${m.slug}`,
            lastModified: m.updatedAt || new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.7,
          }));
        return [...staticRoutes, ...movieRoutes];
      }
    }
  } catch (err) {
    console.error('Error generating dynamic movie sitemap entries:', err);
  }

  return staticRoutes;
}
