'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Badge from '../ui/Badge';
import { FaPlay, FaStar, FaPlus, FaCheck } from 'react-icons/fa';

/**
 * Reusable cinematic MovieCard component.
 * Supports poster, title, year, IMDb rating, quality badge, play overlay, and mobile tap.
 * Compatible with existing project props (slug, title, smposter, rating, year).
 */
export default function MovieCard({
  slug,
  title,
  smposter,
  poster,
  rating,
  year,
  genre,
  quality = 'HD',
  onClick,
  onWatchlistToggle,
  isInWatchlist = false,
  className = '',
}) {
  const router = useRouter();
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist);
  const [imageError, setImageError] = useState(false);

  const posterSrc = poster || smposter || '/fallback-poster.png';

  const handleCardClick = (e) => {
    if (onClick) {
      onClick(e);
    } else if (slug) {
      router.push(`/download/${slug}`);
    }
  };

  const handleWatchlist = (e) => {
    e.stopPropagation();
    setInWatchlist(!inWatchlist);
    if (onWatchlistToggle) {
      onWatchlistToggle(!inWatchlist);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(e);
        }
      }}
      aria-label={`View ${title || 'movie'} details`}
      className={`group relative flex flex-col w-full bg-card rounded-lg overflow-hidden border border-border/40 hover:border-border transition-all duration-normal hover:shadow-elevated cursor-pointer outline-none ${className}`}
    >
      {/* Poster Aspect Ratio Container (2:3 aspect ratio) */}
      <div className="relative w-full aspect-[2/3] bg-surface-elevated overflow-hidden">
        <img
          src={imageError ? 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop' : posterSrc}
          alt={title ? `${title} Poster` : 'Movie Poster'}
          onError={() => setImageError(true)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-smooth group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-normal" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
          {quality && <Badge variant="quality" size="xs">{quality}</Badge>}
          {rating && (
            <Badge variant="rating" size="xs" icon={<FaStar className="text-rating text-[10px]" />}>
              {rating}
            </Badge>
          )}
        </div>

        {/* Hover Action Overlay (Desktop & Mobile) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-normal z-20 bg-overlay/40 backdrop-blur-[2px]">
          <div className="w-12 h-12 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-glow transform scale-90 group-hover:scale-100 transition-transform duration-normal">
            <FaPlay className="ml-1 text-sm" />
          </div>
          
          <button
            onClick={handleWatchlist}
            aria-label={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            className="flex items-center gap-1.5 px-3 py-1 rounded-pill bg-surface/90 hover:bg-surface text-xs text-foreground font-medium border border-white/10 transition-colors"
          >
            {inWatchlist ? <FaCheck className="text-success text-[10px]" /> : <FaPlus className="text-[10px]" />}
            <span>{inWatchlist ? 'Added' : 'Watchlist'}</span>
          </button>
        </div>
      </div>

      {/* Card Metadata */}
      <div className="p-3 flex flex-col gap-1 bg-card">
        <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {title || 'Untitled'}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-foreground-muted">
          <span>{year || 'N/A'}</span>
          {genre && <span className="line-clamp-1 max-w-[50%]">{genre}</span>}
        </div>
      </div>
    </div>
  );
}
