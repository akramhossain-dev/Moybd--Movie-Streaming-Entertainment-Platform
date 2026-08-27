'use client';

import React from 'react';
import MovieCard from './movie/MovieCard';

/**
 * Backward compatibility wrapper for existing imports of Movie.
 * Delegates cleanly to the new MovieCard component.
 */
function Movie({ slug, title, smposter, rating, year, poster, genre, quality, onClick }) {
    return (
        <MovieCard
            slug={slug}
            title={title}
            smposter={smposter}
            poster={poster}
            rating={rating}
            year={year}
            genre={genre}
            quality={quality}
            onClick={onClick}
        />
    );
}

export default Movie;
