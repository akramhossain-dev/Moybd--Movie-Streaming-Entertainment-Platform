import React from 'react';
import MovieCard from './MovieCard';

/**
 * Reusable responsive MovieGrid component.
 * Breakpoints: 2 cols (mobile) -> 3 cols (sm) -> 4 cols (md) -> 5 cols (lg) -> 6 cols (xl)
 */
export default function MovieGrid({
  movies = [],
  renderCard,
  className = '',
  emptyMessage = 'No movies available.',
}) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 ${className}`}
    >
      {movies.map((movie, index) => {
        if (renderCard) {
          return renderCard(movie, index);
        }
        return (
          <MovieCard
            key={movie.slug || movie._id || index}
            slug={movie.slug}
            title={movie.title}
            smposter={movie.smposter}
            poster={movie.poster}
            rating={movie.rating}
            year={movie.year}
            genre={movie.genre}
          />
        );
      })}
    </div>
  );
}
