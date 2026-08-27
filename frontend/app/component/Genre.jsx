'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MovieGrid from './movie/MovieGrid';
import MovieGridSkeleton from './feedback/MovieGridSkeleton';
import EmptyState from './feedback/EmptyState';
import ErrorState from './feedback/ErrorState';
import Container from './ui/Container';
import Button from './ui/Button';
import Badge from './ui/Badge';
import {
  FaArrowRight,
  FaFire,
  FaLaughBeam,
  FaGhost,
  FaRocket,
  FaHeart,
  FaMagic,
  FaMask,
  FaCompass,
  FaChild,
  FaTheaterMasks,
  FaSkull,
} from 'react-icons/fa';

function Genre() {
  const [selectedGenre, setSelectedGenre] = useState('Action');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const genreDetails = {
    Action: { label: 'Action', icon: <FaFire /> },
    Adventure: { label: 'Adventure', icon: <FaCompass /> },
    Comedy: { label: 'Comedy', icon: <FaLaughBeam /> },
    Drama: { label: 'Drama', icon: <FaTheaterMasks /> },
    Crime: { label: 'Crime', icon: <FaMask /> },
    Animation: { label: 'Animation', icon: <FaChild /> },
    Fantasy: { label: 'Fantasy', icon: <FaMagic /> },
    Horror: { label: 'Horror', icon: <FaGhost /> },
    Science_Fiction: { label: 'Sci-Fi', icon: <FaRocket /> },
    Romance: { label: 'Romance', icon: <FaHeart /> },
    Thriller: { label: 'Thriller', icon: <FaSkull /> },
  };

  const genreAPIs = {
    Action: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Action`,
    Adventure: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Adventure`,
    Comedy: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Comedy`,
    Drama: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Drama`,
    Crime: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Crime`,
    Animation: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Animation`,
    Fantasy: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Fantasy`,
    Horror: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Horror`,
    Science_Fiction: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Science_Fiction`,
    Romance: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Romance`,
    Thriller: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Thriller`,
  };

  const fetchGenreMovies = async () => {
    if (!selectedGenre) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(genreAPIs[selectedGenre]);
      if (!response.ok) throw new Error('Failed to fetch movies for this genre');
      const data = await response.json();
      setMovies(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGenreMovies();
  }, [selectedGenre]);

  const handleGenreClick = (genreKey) => {
    setSelectedGenre(genreKey);
  };

  const navigateToGenrePage = () => {
    if (selectedGenre) {
      router.push(`/${selectedGenre}`);
    }
  };

  return (
    <Container className="py-10 space-y-8">
      {/* Section Header Container */}
      <div className="relative bg-surface rounded-2xl p-6 sm:p-8 border border-purple-900/40 shadow-card overflow-hidden text-center space-y-6">
        <div className="relative z-10 space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Explore by Genre
          </h2>
          <p className="text-xs sm:text-sm text-foreground-muted">
            Filter movies and series by your favorite mood or cinematic category.
          </p>
        </div>

        {/* Genre Pill Pills with Icons & Glow */}
        <div className="relative z-10 flex flex-wrap justify-center gap-2 sm:gap-2.5">
          {Object.keys(genreDetails).map((key) => {
            const item = genreDetails[key];
            const isActive = selectedGenre === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleGenreClick(key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 select-none cursor-pointer border ${
                  isActive
                    ? 'bg-primary border-primary text-white shadow-glow'
                    : 'bg-purple-950/70 border-primary/40 text-purple-100 hover:text-white hover:bg-primary/30 hover:border-primary'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-primary'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Movies Grid Section */}
      <div className="space-y-8">
        {isLoading ? (
          <MovieGridSkeleton count={12} />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchGenreMovies} />
        ) : movies.length > 0 ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            <MovieGrid movies={movies.slice(0, 12)} />

            {/* View Full Genre CTA Button */}
            <div className="flex justify-center pt-2">
              <Button
                variant="primary"
                size="lg"
                iconRight={<FaArrowRight className="text-xs" />}
                onClick={navigateToGenrePage}
              >
                Explore All {genreDetails[selectedGenre]?.label || selectedGenre} Titles
              </Button>
            </div>
          </div>
        ) : (
          <EmptyState
            title={`No ${genreDetails[selectedGenre]?.label || selectedGenre} titles found`}
            description="Check back soon as new entries are published."
          />
        )}
      </div>
    </Container>
  );
}

export default Genre;
