'use client';

import React, { useState, useEffect } from 'react';
import PublicLayout from './component/layout/PublicLayout';
import HeaderSlider from './component/HeaderSlider';
import MovieRow from './component/movie/MovieRow';
import MovieRowSkeleton from './component/feedback/MovieRowSkeleton';
import ErrorState from './component/feedback/ErrorState';
import Container from './component/ui/Container';
import Genre from './component/Genre';

export default function Home() {
  // Latest Movies State
  const [latestMovies, setLatestMovies] = useState([]);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [errorLatest, setErrorLatest] = useState(null);

  // Popular Movies State
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [errorMovies, setErrorMovies] = useState(null);

  // Popular Series State
  const [series, setSeries] = useState([]);
  const [loadingSeries, setLoadingSeries] = useState(true);
  const [errorSeries, setErrorSeries] = useState(null);

  // Anime State
  const [anime, setAnime] = useState([]);
  const [loadingAnime, setLoadingAnime] = useState(true);
  const [errorAnime, setErrorAnime] = useState(null);

  // Fetch Latest Movies
  const fetchLatestMovies = async () => {
    setLoadingLatest(true);
    setErrorLatest(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/latestmovies`
      );
      if (!response.ok) throw new Error('Failed to load latest releases');
      const result = await response.json();
      if (result.success && result.data) {
        setLatestMovies([...result.data].slice(0, 12).reverse());
      }
    } catch (err) {
      setErrorLatest(err.message);
    } finally {
      setLoadingLatest(false);
    }
  };

  // Fetch Popular Movies
  const fetchMovies = async () => {
    setLoadingMovies(true);
    setErrorMovies(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/movie`
      );
      if (!response.ok) throw new Error('Failed to load popular movies');
      const result = await response.json();
      if (result.success && result.data) {
        setMovies([...result.data].sort(() => 0.11 - Math.random()).slice(0, 12));
      }
    } catch (err) {
      setErrorMovies(err.message);
    } finally {
      setLoadingMovies(false);
    }
  };

  // Fetch Series
  const fetchSeries = async () => {
    setLoadingSeries(true);
    setErrorSeries(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/series`
      );
      if (!response.ok) throw new Error('Failed to load series');
      const result = await response.json();
      if (result.success && result.data) {
        setSeries([...result.data].sort(() => 0.11 - Math.random()).slice(0, 12));
      }
    } catch (err) {
      setErrorSeries(err.message);
    } finally {
      setLoadingSeries(false);
    }
  };

  // Fetch Anime
  const fetchAnime = async () => {
    setLoadingAnime(true);
    setErrorAnime(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/anime`
      );
      if (!response.ok) throw new Error('Failed to load anime');
      const result = await response.json();
      if (result.success && result.data) {
        setAnime([...result.data].sort(() => 0.11 - Math.random()).slice(0, 12));
      }
    } catch (err) {
      setErrorAnime(err.message);
    } finally {
      setLoadingAnime(false);
    }
  };

  useEffect(() => {
    fetchLatestMovies();
    fetchMovies();
    fetchSeries();
    fetchAnime();
  }, []);

  return (
    <PublicLayout>
      {/* Hero Featured Slider */}
      <HeaderSlider />

      {/* Main Content Rows */}
      <Container className="py-8 space-y-12">
        {/* Section 1: Latest Releases */}
        <div className="space-y-4">
          {loadingLatest ? (
            <MovieRowSkeleton count={6} />
          ) : errorLatest ? (
            <ErrorState message={errorLatest} onRetry={fetchLatestMovies} />
          ) : (
            <MovieRow
              title="Latest Releases"
              subtitle="Freshly added titles and blockbusters"
              movies={latestMovies}
            />
          )}
        </div>

        {/* Section 2: Popular Movies */}
        <div className="space-y-4">
          {loadingMovies ? (
            <MovieRowSkeleton count={6} />
          ) : errorMovies ? (
            <ErrorState message={errorMovies} onRetry={fetchMovies} />
          ) : (
            <MovieRow
              title="Trending Movies"
              subtitle="Most watched movies this week"
              movies={movies}
            />
          )}
        </div>

        {/* Section 3: Popular TV & Web Series */}
        <div className="space-y-4">
          {loadingSeries ? (
            <MovieRowSkeleton count={6} />
          ) : errorSeries ? (
            <ErrorState message={errorSeries} onRetry={fetchSeries} />
          ) : (
            <MovieRow
              title="Popular Series"
              subtitle="Binge-worthy TV shows and web series"
              movies={series}
            />
          )}
        </div>

        {/* Section 4: Anime Collection */}
        <div className="space-y-4">
          {loadingAnime ? (
            <MovieRowSkeleton count={6} />
          ) : errorAnime ? (
            <ErrorState message={errorAnime} onRetry={fetchAnime} />
          ) : (
            <MovieRow
              title="Top Anime"
              subtitle="Popular animated series and features"
              movies={anime}
            />
          )}
        </div>

        {/* Divider */}
        <hr className="border-border/40 my-8" />

        {/* Section 5: Genre & Category Discovery */}
        <Genre />
      </Container>
    </PublicLayout>
  );
}
