import React from 'react';
import Skeleton from './Skeleton';

/**
 * Skeleton component matching exact dimensions of MovieCard.
 */
export default function MovieCardSkeleton({ className = '' }) {
  return (
    <div className={`flex flex-col w-full bg-card rounded-xl overflow-hidden border border-purple-900/20 ${className}`}>
      {/* 2:3 Poster Skeleton */}
      <div className="w-full aspect-[2/3] relative">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* Title & Metadata Skeleton */}
      <div className="p-3 flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}
