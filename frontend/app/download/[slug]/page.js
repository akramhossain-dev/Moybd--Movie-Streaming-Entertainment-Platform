'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PublicLayout from '@/app/component/layout/PublicLayout';
import Container from '@/app/component/ui/Container';
import Button from '@/app/component/ui/Button';
import Badge from '@/app/component/ui/Badge';
import MovieRow from '@/app/component/movie/MovieRow';
import Comments from '@/app/component/comments';
import Skeleton from '@/app/component/feedback/Skeleton';
import ErrorState from '@/app/component/feedback/ErrorState';
import { toast } from '@/app/component/ui/Toast';
import {
  FaPlay,
  FaStar,
  FaDownload,
  FaPlus,
  FaCheck,
  FaClock,
  FaCalendarAlt,
  FaGlobe,
  FaClosedCaptioning,
  FaHdd,
  FaShieldAlt,
  FaFilm as FaMovie,
} from 'react-icons/fa';
import { isInWatchlist, toggleWatchlist } from '@/app/libs/watchlist';

export default function MovieDetails() {
  const params = useParams();
  const slug = params.slug;
  const router = useRouter();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/publicmovies`
        );
        if (!response.ok) throw new Error('Failed to fetch movies catalog');
        const data = await response.json();

        if (data.success && data.data) {
          const found = data.data.find((m) => m.slug === slug);
          if (found) {
            setMovie(found);
            setIsWatchlisted(isInWatchlist(found._id || found.slug));

            // Related movies
            const related = data.data
              .filter((m) => m.slug !== slug)
              .sort(() => 0.5 - Math.random())
              .slice(0, 10);
            setRelatedMovies(related);
          } else {
            setError('Movie or series not found.');
          }
        } else {
          setError('Failed to load movie details.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [slug]);

  const handleWatchlistToggle = () => {
    if (!movie) return;
    const newState = toggleWatchlist(movie);
    setIsWatchlisted(newState);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="relative w-full h-[55vh] bg-surface-elevated overflow-hidden">
          <Skeleton className="w-full h-full rounded-none" />
        </div>
        <Container className="py-8 space-y-6">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </Container>
      </PublicLayout>
    );
  }

  if (error || !movie) {
    return (
      <PublicLayout>
        <Container className="py-16">
          <ErrorState
            title="Title Not Found"
            message={error || 'The requested movie or series could not be found.'}
            onRetry={() => router.push('/')}
          />
        </Container>
      </PublicLayout>
    );
  }

  const genres = Array.isArray(movie.genre)
    ? movie.genre
    : typeof movie.genre === 'string'
    ? movie.genre.split(',').map((g) => g.trim())
    : [];

  const downloadLinks = movie.downloadlink || {};
  const hasDownloadObject =
    typeof downloadLinks === 'object' && Object.keys(downloadLinks).length > 0;

  return (
    <PublicLayout>
      {/* 1. Cinematic Details Hero Header */}
      <section className="relative w-full overflow-hidden bg-background border-b border-purple-900/40 pb-8 sm:pb-12">
        {/* Full-Bleed Backdrop Image with Gradients */}
        <div className="absolute inset-0 h-[60vh] sm:h-[70vh]">
          <img
            src={
              imgError
                ? 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop'
                : movie.bgposter || movie.smposter
            }
            alt={movie.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </div>

        {/* Hero Content Overlay */}
        <Container className="relative z-10 pt-28 sm:pt-36">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-8">
            {/* Poster Thumbnail */}
            <div className="w-44 sm:w-56 aspect-[2/3] shrink-0 rounded-2xl overflow-hidden shadow-modal border border-purple-900/40 group bg-surface">
              <img
                src={movie.smposter || movie.bgposter}
                alt={`${movie.title} Poster`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-normal"
              />
            </div>

            {/* Title & Key Metadata */}
            <div className="space-y-4 text-center md:text-left text-foreground flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                {movie.quality && (
                  <Badge variant="quality" size="xs">
                    {movie.quality}
                  </Badge>
                )}
                {movie.category && (
                  <Badge variant="subtle" size="xs">
                    {movie.category}
                  </Badge>
                )}
                {genres.map((g, idx) => (
                  <Badge key={idx} variant="genre" size="xs">
                    {g}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground drop-shadow-md">
                {movie.title}
              </h1>

              {/* Metadata Pill Row */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm text-foreground-secondary">
                {movie.rating && (
                  <div className="flex items-center gap-1.5 font-bold text-rating bg-rating/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                    <FaStar className="text-xs" />
                    <span>{movie.rating} IMDb</span>
                  </div>
                )}
                {movie.duration && (
                  <div className="flex items-center gap-1.5">
                    <FaClock className="text-foreground-muted" />
                    <span>{movie.duration}</span>
                  </div>
                )}
                {movie.year && (
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-foreground-muted" />
                    <span>{movie.year}</span>
                  </div>
                )}
                {movie.language && (
                  <div className="flex items-center gap-1.5">
                    <FaGlobe className="text-foreground-muted" />
                    <span>{movie.language}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                {movie.youtubelink && (
                  <Button
                    variant="primary"
                    size="lg"
                    iconLeft={<FaPlay className="text-xs ml-0.5" />}
                    onClick={() => scrollToSection('watch-online')}
                  >
                    Watch Trailer
                  </Button>
                )}

                <Button
                  variant="secondary"
                  size="lg"
                  iconLeft={<FaDownload className="text-xs" />}
                  onClick={() => scrollToSection('download-section')}
                >
                  Download
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  iconLeft={
                    isWatchlisted ? (
                      <FaCheck className="text-success text-xs" />
                    ) : (
                      <FaPlus className="text-xs" />
                    )
                  }
                  onClick={handleWatchlistToggle}
                >
                  {isWatchlisted ? 'In Watchlist' : 'Add to Watchlist'}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Main Details Grid Layout */}
      <Container className="py-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area (2 Cols on Desktop) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Synopsis Card */}
            <div className="bg-surface rounded-2xl p-6 border border-purple-900/40 space-y-3 shadow-card">
              <h2 className="text-xl font-bold text-foreground border-b border-purple-900/30 pb-3 flex items-center gap-2">
                <FaMovie className="text-primary" /> Storyline / Synopsis
              </h2>
              <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
                {movie.description || 'No detailed storyline available for this title.'}
              </p>
            </div>

            {/* Watch Online / Trailer Video Embed */}
            {movie.youtubelink && (
              <div id="watch-online" className="bg-surface rounded-2xl p-6 border border-purple-900/40 space-y-4 shadow-card">
                <h2 className="text-xl font-bold text-foreground border-b border-purple-900/30 pb-3 flex items-center gap-2">
                  <FaPlay className="text-primary" /> Official Trailer / Stream Preview
                </h2>
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-modal border border-purple-900/50">
                  <iframe
                    className="w-full h-full"
                    src={
                      movie.youtubelink.includes('watch?v=')
                        ? movie.youtubelink.replace('watch?v=', 'embed/')
                        : movie.youtubelink
                    }
                    title={`${movie.title} Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Download Links Section */}
            <div id="download-section" className="bg-surface rounded-2xl p-6 border border-purple-900/40 space-y-4 shadow-card">
              <h2 className="text-xl font-bold text-foreground border-b border-purple-900/30 pb-3 flex items-center gap-2">
                <FaDownload className="text-primary" /> Fast Download Links
              </h2>

              {hasDownloadObject ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(downloadLinks).map(([resolution, url]) => {
                    if (!url) return null;
                    return (
                      <a
                        key={resolution}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3.5 bg-purple-950/40 hover:bg-primary/20 border border-purple-900/40 hover:border-primary/60 rounded-xl transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <FaDownload className="text-primary text-sm group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-bold text-foreground uppercase">
                            Download {resolution}
                          </span>
                        </div>
                        <Badge variant="quality" size="xs">
                          {resolution.toUpperCase()}
                        </Badge>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    iconLeft={<FaDownload className="text-sm" />}
                    onClick={() => {
                      if (movie.watchonline) {
                        window.location.href = `http://127.0.0.1:6969/get_movies?watchonline=${movie.watchonline}`;
                      } else {
                        toast.error('Download link currently unavailable.');
                      }
                    }}
                  >
                    Direct High-Speed Download
                  </Button>
                </div>
              )}
            </div>

            {/* Comments Section */}
            <Comments
              postId={movie._id}
              commentId={movie.comments}
              title={movie.title}
            />
          </div>

          {/* Sidebar Quick Information (1 Col on Desktop) */}
          <div className="space-y-6">
            <div className="bg-surface rounded-2xl p-6 border border-purple-900/40 space-y-4 shadow-card">
              <h2 className="text-lg font-bold text-foreground border-b border-purple-900/30 pb-3">
                Quick Information
              </h2>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start justify-between gap-2 text-foreground-secondary">
                  <span className="text-foreground-muted font-medium flex items-center gap-1.5">
                    <FaMovie className="text-xs text-primary" /> Genres:
                  </span>
                  <span className="text-right font-semibold text-foreground">
                    {genres.join(', ') || 'N/A'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 text-foreground-secondary">
                  <span className="text-foreground-muted font-medium flex items-center gap-1.5">
                    <FaGlobe className="text-xs text-primary" /> Language:
                  </span>
                  <span className="font-semibold text-foreground">
                    {movie.language || 'English'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 text-foreground-secondary">
                  <span className="text-foreground-muted font-medium flex items-center gap-1.5">
                    <FaClosedCaptioning className="text-xs text-primary" /> Subtitles:
                  </span>
                  <span className="font-semibold text-foreground">
                    {movie.subtitle || 'None'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 text-foreground-secondary">
                  <span className="text-foreground-muted font-medium flex items-center gap-1.5">
                    <FaHdd className="text-xs text-primary" /> Size:
                  </span>
                  <span className="font-semibold text-foreground">
                    {movie.size || 'N/A'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 text-foreground-secondary">
                  <span className="text-foreground-muted font-medium flex items-center gap-1.5">
                    <FaShieldAlt className="text-xs text-primary" /> Quality:
                  </span>
                  <span className="font-semibold text-foreground">
                    {movie.quality || 'HD Web-DL'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Related Content Horizontal Row */}
        {relatedMovies.length > 0 && (
          <div className="pt-6 border-t border-purple-900/30">
            <MovieRow
              title="More Titles You May Like"
              subtitle="Handpicked recommendations based on this title"
              movies={relatedMovies}
            />
          </div>
        )}
      </Container>
    </PublicLayout>
  );
}
