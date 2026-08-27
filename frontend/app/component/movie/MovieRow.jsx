'use client';

import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import SectionHeader from '../ui/SectionHeader';
import IconButton from '../ui/IconButton';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * Reusable horizontal MovieRow with smooth scroll controls for categories and genres.
 */
export default function MovieRow({
  title,
  subtitle,
  movies = [],
  action,
  className = '',
}) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className={`space-y-3 ${className}`}>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        action={
          <div className="flex items-center gap-2">
            {action}
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <IconButton
                icon={<FaChevronLeft />}
                aria-label="Scroll left"
                variant="secondary"
                size="sm"
                onClick={() => scroll('left')}
              />
              <IconButton
                icon={<FaChevronRight />}
                aria-label="Scroll right"
                variant="secondary"
                size="sm"
                onClick={() => scroll('right')}
              />
            </div>
          </div>
        }
      />

      {/* Horizontal Scroll Track */}
      <div
        ref={rowRef}
        className="flex items-center gap-3 sm:gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie, index) => (
          <div
            key={movie.slug || movie._id || index}
            className="w-[140px] sm:w-[170px] md:w-[190px] shrink-0"
          >
            <MovieCard
              slug={movie.slug}
              title={movie.title}
              smposter={movie.smposter}
              poster={movie.poster}
              rating={movie.rating}
              year={movie.year}
              genre={movie.genre}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
