'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MovieGrid from './movie/MovieGrid';
import MovieGridSkeleton from './feedback/MovieGridSkeleton';
import EmptyState from './feedback/EmptyState';
import ErrorState from './feedback/ErrorState';
import Container from './ui/Container';
import Button from './ui/Button';
import { FaArrowRight } from 'react-icons/fa';

function Genre() {
    const [selectedGenre, setSelectedGenre] = useState('Action'); 
    const [movies, setMovies] = useState([]); 
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const router = useRouter();

    const genreAPIs = {
        Adventure: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Adventure`,
        Comedy: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Comedy`,
        Action: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Action`,
        Drama: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Drama`,
        Crime: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Crime`,
        Animation: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Animation`,
        Fantasy: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Fantasy`,
        Horror: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Horror`,
        Science_Fiction: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Science_Fiction`,
        Romance: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Romance`,
        Thriller: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Thriller`,
    };

    useEffect(() => {
        if (!selectedGenre) return;
        const fetchMovies = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(genreAPIs[selectedGenre]);
                if (!response.ok) throw new Error('Failed to fetch movies');
                const data = await response.json();
                setMovies(data.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [selectedGenre]);

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
    };

    const navigateToGenrePage = () => {
        if (selectedGenre) {
            router.push(`/${selectedGenre}`);
        }
    };

    return (
        <Container className="space-y-6 py-6">
            <div className="space-y-4 text-center max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Explore by Genre
                </h2>
                
                {/* Genre Tabs */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
                    {Object.keys(genreAPIs).map((genre) => {
                        const isActive = selectedGenre === genre;
                        return (
                            <button
                                key={genre}
                                type="button"
                                onClick={() => handleGenreClick(genre)}
                                className={`px-3.5 py-1.5 rounded-pill text-xs sm:text-sm font-medium tracking-wide transition-all duration-fast select-none cursor-pointer border ${
                                    isActive
                                        ? 'bg-primary border-primary text-white shadow-glow'
                                        : 'bg-surface border-border/60 text-foreground-secondary hover:text-foreground hover:bg-surface-elevated hover:border-border'
                                }`}
                            >
                                {genre.replace('_', ' ')}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Movies Display Section */}
            <div className="pt-2">
                {isLoading ? (
                    <MovieGridSkeleton count={12} />
                ) : error ? (
                    <ErrorState message={error} onRetry={fetchMovies} />
                ) : movies.length > 0 ? (
                    <div className="space-y-8">
                        <MovieGrid movies={movies.slice(0, 12)} />

                        {/* View Full Genre Button */}
                        <div className="flex justify-center pt-2">
                            <Button
                                variant="secondary"
                                size="lg"
                                iconRight={<FaArrowRight className="text-sm" />}
                                onClick={navigateToGenrePage}
                            >
                                Explore All {selectedGenre.replace('_', ' ')} Movies
                            </Button>
                        </div>
                    </div>
                ) : (
                    <EmptyState
                        title={`No ${selectedGenre.replace('_', ' ')} movies found`}
                        description="Check back later for new additions in this category."
                    />
                )}
            </div>
        </Container>
    );
}

export default Genre;
