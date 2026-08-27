'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Badge from '../ui/Badge';
import { FaPlay, FaStar, FaPlus, FaCheck } from 'react-icons/fa';
import { isInWatchlist, toggleWatchlist } from '@/app/libs/watchlist';

/**
 * Production-Grade Cinematic MovieCard Component.
 * Poster-first hierarchy, crisp rounded-xl radius, restrained hover, and clear metadata.
 */
export default function MovieCard({
  _id,
  slug,
  title,
  smposter,
  poster,
  bgposter,
  rating,
  year,
  genre,
  quality = 'HD',
  onClick,
  onWatchlistToggle,
  isInWatchlist: propInWatchlist = false,
  className = '',
}) {
  const router = useRouter();
  const movieId = _id || slug;
  const [inWatchlist, setInWatchlist] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setInWatchlist(isInWatchlist(movieId));
  }, [movieId]);

  const posterSrc = poster || smposter || '/fallback-poster.png';

  const formattedGenre = Array.isArray(genre)
    ? genre.join(', ')
    : typeof genre === 'string'
    ? genre.replace(/([a-z])([A-Z])/g, '$1, $2')
    : '';

  const handleCardClick = (e) => {
    if (onClick) {
      onClick(e);
    } else if (slug) {
      router.push(`/download/${slug}`);
    }
  };

  const handleWatchlist = (e) => {
    e.stopPropagation();
    const movieObj = {
      _id: movieId,
      slug,
      title,
      smposter: posterSrc,
      bgposter,
      rating,
      year,
      genre,
      quality,
    };
    const newState = toggleWatchlist(movieObj);
    setInWatchlist(newState);
    if (onWatchlistToggle) {
      onWatchlistToggle(newState);
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
      className={`group relative flex flex-col w-full bg-card rounded-xl overflow-hidden border border-purple-900/30 hover:border-primary/60 transition-all duration-normal cursor-pointer outline-none ${className}`}
    >
      {/* Poster Aspect Ratio Container (2:3 aspect ratio) */}
      <div className="relative w-full aspect-[2/3] bg-surface-elevated overflow-hidden">
        <img
          src={imageError ? 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop' : posterSrc}
          alt={title ? `${title} Poster` : 'Movie Poster'}
          onError={() => setImageError(true)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
          {quality ? (
            <Badge variant="quality" size="xs" className="shadow-subtle">
              {quality}
            </Badge>
          ) : <div />}
          {rating ? (
            <Badge variant="rating" size="xs" icon={<FaStar className="text-rating text-[10px]" />} className="shadow-subtle">
              {rating}
            </Badge>
          ) : null}
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 bg-background/60">
          <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shadow-glow transform scale-90 group-hover:scale-100 transition-transform">
            <FaPlay className="ml-0.5 text-xs" />
          </div>
          
          <button
            onClick={handleWatchlist}
            aria-label={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              inWatchlist
                ? 'bg-success/20 text-success border-success/40'
                : 'bg-purple-950/90 text-white border-primary/50 hover:bg-primary'
            }`}
          >
            {inWatchlist ? <FaCheck className="text-success text-[10px]" /> : <FaPlus className="text-[10px]" />}
            <span>{inWatchlist ? 'In Watchlist' : 'Watchlist'}</span>
          </button>
        </div>
      </div>

      {/* Card Metadata */}
      <div className="p-3 flex flex-col gap-1 bg-card">
        <h3 className="text-xs sm:text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {title || 'Untitled'}
        </h3>
        
        <div className="flex items-center justify-between text-[11px] text-foreground-muted">
          <span>{year || 'N/A'}</span>
          {formattedGenre && <span className="line-clamp-1 max-w-[65%] font-medium">{formattedGenre}</span>}
        </div>
      </div>
    </div>
  );
}
