import React from 'react';
import MovieCardSkeleton from './MovieCardSkeleton';

/**
 * Skeleton loader for MovieGrid.
 */
export default function MovieGridSkeleton({ count = 12, className = '' }) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}
