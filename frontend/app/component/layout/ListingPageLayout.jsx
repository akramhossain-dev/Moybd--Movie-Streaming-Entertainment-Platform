'use client';

import React, { useState, useEffect } from 'react';
import PublicLayout from './PublicLayout';
import Container from '../ui/Container';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import MovieGrid from '../movie/MovieGrid';
import MovieGridSkeleton from '../feedback/MovieGridSkeleton';
import EmptyState from '../feedback/EmptyState';
import ErrorState from '../feedback/ErrorState';
import { FaSearch, FaSortAmountDown, FaChevronLeft, FaChevronRight, FaFilm } from 'react-icons/fa';

/**
 * Reusable layout component for all content listing and category pages.
 */
export default function ListingPageLayout({
  title,
  subtitle,
  apiUrl,
  itemsPerPage = 24,
}) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to load catalog');
      const data = await response.json();
      setMovies(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [apiUrl]);

  // Filter & Sort
  useEffect(() => {
    let result = [...movies];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.title?.toLowerCase().includes(query) ||
          m.year?.toString().includes(query)
      );
    }

    if (sortBy === 'latest') {
      result.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
    } else if (sortBy === 'title') {
      result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }

    setFilteredMovies(result);
    setCurrentPage(1);
  }, [searchQuery, sortBy, movies]);

  // Pagination logic
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <PublicLayout>
      <Container className="py-8 space-y-8">
        {/* Page Header */}
        <div className="space-y-3 text-center sm:text-left border-b border-border/50 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
                  {title}
                </h1>
                {!loading && (
                  <Badge variant="subtle" size="md">
                    {filteredMovies.length} Titles
                  </Badge>
                )}
              </div>
              {subtitle && (
                <p className="text-xs sm:text-sm text-foreground-muted max-w-2xl">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Filter & Sort Bar */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 pt-2 sm:pt-0">
              {/* In-page search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
                <input
                  type="text"
                  placeholder="Filter this page..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-surface border border-border/60 focus:border-primary text-foreground text-xs rounded-lg outline-none w-44 sm:w-56"
                />
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 bg-surface border border-border/60 rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary">
                <FaSortAmountDown className="text-foreground-muted" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-foreground outline-none cursor-pointer text-xs"
                >
                  <option value="latest" className="bg-surface text-foreground">Latest Year</option>
                  <option value="rating" className="bg-surface text-foreground">Highest Rating</option>
                  <option value="title" className="bg-surface text-foreground">Title (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <MovieGridSkeleton count={itemsPerPage} />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchMovies} />
        ) : filteredMovies.length > 0 ? (
          <div className="space-y-10">
            <MovieGrid movies={currentMovies} />

            {/* Pagination Control Bar */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/40">
                <p className="text-xs text-foreground-muted">
                  Showing <span className="font-semibold text-foreground">{indexOfFirstItem + 1}</span>–
                  <span className="font-semibold text-foreground">
                    {Math.min(indexOfLastItem, filteredMovies.length)}
                  </span>{' '}
                  of <span className="font-semibold text-foreground">{filteredMovies.length}</span> titles
                </p>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={currentPage === 1}
                    iconLeft={<FaChevronLeft className="text-xs" />}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Prev
                  </Button>

                  {/* Numbered Page Buttons */}
                  <div className="flex items-center gap-1 px-1">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                              currentPage === pageNum
                                ? 'bg-primary text-white shadow-glow'
                                : 'bg-surface hover:bg-surface-elevated text-foreground-secondary hover:text-foreground'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                      if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                        return (
                          <span key={pageNum} className="text-xs text-foreground-muted px-1">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={currentPage === totalPages}
                    iconRight={<FaChevronRight className="text-xs" />}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <EmptyState
            title="No movies found"
            description={
              searchQuery
                ? `No titles match "${searchQuery}". Try clearing your search.`
                : 'There are no titles currently listed in this section.'
            }
            action={
              searchQuery ? (
                <Button variant="secondary" size="sm" onClick={() => setSearchQuery('')}>
                  Clear Filter
                </Button>
              ) : null
            }
          />
        )}
      </Container>
    </PublicLayout>
  );
}
