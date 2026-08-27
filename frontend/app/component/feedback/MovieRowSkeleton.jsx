import React from 'react';
import MovieCardSkeleton from './MovieCardSkeleton';
import Skeleton from './Skeleton';

/**
 * Skeleton loader for MovieRow.
 */
export default function MovieRowSkeleton({ count = 6, className = '' }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Title skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-5 w-20" />
      </div>

      {/* Row items skeleton */}
      <div className="flex items-center gap-3 sm:gap-4 overflow-hidden -mx-4 px-4 sm:-mx-6 sm:px-6">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="w-[140px] sm:w-[170px] md:w-[190px] shrink-0">
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
