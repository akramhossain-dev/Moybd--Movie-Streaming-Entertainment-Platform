export async function generateMetadata({ params }) {
  const { slug } = params;
  const baseUrl = 'https://moybd.sbs';

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const res = await fetch(`${apiUrl}/api/dashboard/publicmovies`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        const movie = data.data.find((m) => m.slug === slug);
        if (movie) {
          const title = `${movie.title} (${movie.year || 'HD'}) Download & Stream — Moybd`;
          const description = movie.description
            ? movie.description.slice(0, 160)
            : `Download and watch ${movie.title} in high quality ${movie.quality || 'HD WEB-DL'} with fast servers.`;
          const image = movie.smposter || movie.bgposter || `${baseUrl}/og-image.jpg`;

          return {
            title,
            description,
            openGraph: {
              title,
              description,
              url: `${baseUrl}/download/${slug}`,
              images: [{ url: image, alt: movie.title }],
              type: 'video.movie',
            },
            twitter: {
              card: 'summary_large_image',
              title,
              description,
              images: [image],
            },
          };
        }
      }
    }
  } catch (err) {
    console.error('Error generating dynamic metadata for movie detail page:', err);
  }

  return {
    title: 'Download Movie or Series — Moybd',
    description: 'Stream and download movies and web series in high quality HD.',
  };
}

export default function MovieLayout({ children }) {
  return <>{children}</>;
}
