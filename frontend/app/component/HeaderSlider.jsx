'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from './ui/Container';
import Button from './ui/Button';
import IconButton from './ui/IconButton';
import Badge from './ui/Badge';
import Skeleton from './feedback/Skeleton';
import {
  FaPlay,
  FaStar,
  FaPlus,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
} from 'react-icons/fa';

export default function HeaderSlider() {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [watchlistMap, setWatchlistMap] = useState({});
  const [imageErrorMap, setImageErrorMap] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/publicmovies`
        );
        const data = await response.json();
        if (response.ok && data.data) {
          const shuffledMovies = [...data.data].sort(() => 0.5 - Math.random());
          setMovies(shuffledMovies.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching hero slider movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Autoplay interval
  useEffect(() => {
    if (movies.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [movies.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  const toggleWatchlist = (id) => {
    setWatchlistMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-[65vh] sm:h-[75vh] max-h-[750px] min-h-[480px] bg-surface-elevated overflow-hidden">
        <Skeleton className="w-full h-full rounded-none" />
        <Container className="absolute bottom-12 left-0 right-0 z-20 flex items-end gap-6">
          <Skeleton className="hidden sm:block w-36 h-52 rounded-xl" />
          <div className="space-y-3 w-full max-w-xl">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-3 pt-2">
              <Skeleton className="h-12 w-36 rounded-xl" />
              <Skeleton className="h-12 w-36 rounded-xl" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (movies.length === 0) return null;

  const currentMovie = movies[currentSlide];
  const genres = Array.isArray(currentMovie.genre)
    ? currentMovie.genre
    : typeof currentMovie.genre === 'string'
    ? currentMovie.genre.split(',').map((g) => g.trim())
    : [];

  return (
    <section className="relative w-full h-[65vh] sm:h-[75vh] max-h-[750px] min-h-[480px] overflow-hidden bg-background">
      {movies.map((movie, index) => {
        const isActive = index === currentSlide;
        const isWatchlisted = !!watchlistMap[movie._id];
        const hasBgError = !!imageErrorMap[`bg_${movie._id}`];
        const hasSmError = !!imageErrorMap[`sm_${movie._id}`];

        return (
          <div
            key={movie._id || index}
            className={`absolute inset-0 transition-opacity duration-hero ease-in-out ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Artwork */}
            <div className="absolute inset-0 bg-background">
              <img
                src={
                  hasBgError
                    ? 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop'
                    : movie.bgposter || movie.smposter
                }
                alt={movie.title}
                onError={() =>
                  setImageErrorMap((prev) => ({ ...prev, [`bg_${movie._id}`]: true }))
                }
                className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-1000"
              />

              {/* Multi-stage cinematic gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
            </div>

            {/* Slide Content Overlay */}
            <div className="absolute inset-0 flex items-end pb-12 sm:pb-16 z-20">
              <Container className="flex flex-col sm:flex-row sm:items-end gap-6 w-full">
                {/* Poster Thumbnail (Desktop) */}
                <div className="hidden sm:block w-36 sm:w-44 aspect-[2/3] shrink-0 rounded-xl overflow-hidden shadow-modal border border-white/10 group">
                  <img
                    src={
                      hasSmError
                        ? 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop'
                        : movie.smposter || movie.bgposter
                    }
                    alt={`${movie.title} Poster`}
                    onError={() =>
                      setImageErrorMap((prev) => ({ ...prev, [`sm_${movie._id}`]: true }))
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-normal"
                  />
                </div>

                {/* Movie Details & Actions */}
                <div className="space-y-3 max-w-2xl text-foreground">
                  {/* Badges & Genres */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="new" size="xs">
                      FEATURED
                    </Badge>
                    <Badge variant="quality" size="xs">
                      4K ULTRA HD
                    </Badge>
                    {genres.slice(0, 3).map((g, idx) => (
                      <Badge key={idx} variant="genre" size="xs">
                        {g}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md line-clamp-2">
                    {movie.title}
                  </h1>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-foreground-secondary">
                    {movie.rating && (
                      <div className="flex items-center gap-1.5 font-bold text-rating bg-rating/10 px-2 py-0.5 rounded-md border border-rating/20">
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
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <Button
                      variant="primary"
                      size="lg"
                      iconLeft={<FaPlay className="text-xs ml-0.5" />}
                      onClick={() => router.push(`/download/${movie.slug}`)}
                    >
                      Watch Now
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
                      onClick={() => toggleWatchlist(movie._id)}
                    >
                      {isWatchlisted ? 'In Watchlist' : 'Add to Watchlist'}
                    </Button>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        );
      })}

      {/* Hero Carousel Navigation Controls */}
      <Container className="absolute bottom-4 left-0 right-0 z-30 flex items-center justify-between pointer-events-none">
        {/* Slide Indicator Bars */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {movies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-pill transition-all duration-normal ${
                idx === currentSlide
                  ? 'w-8 bg-primary shadow-glow'
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Prev / Next Arrows */}
        <div className="hidden sm:flex items-center gap-2 pointer-events-auto">
          <IconButton
            icon={<FaChevronLeft />}
            aria-label="Previous slide"
            variant="backdrop"
            size="sm"
            onClick={handlePrev}
          />
          <IconButton
            icon={<FaChevronRight />}
            aria-label="Next slide"
            variant="backdrop"
            size="sm"
            onClick={handleNext}
          />
        </div>
      </Container>
    </section>
  );
}