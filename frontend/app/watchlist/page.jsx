'use client';

import React, { useState, useEffect } from 'react';
import PublicLayout from '../component/layout/PublicLayout';
import Container from '../component/ui/Container';
import MovieGrid from '../component/movie/MovieGrid';
import EmptyState from '../component/feedback/EmptyState';
import Button from '../component/ui/Button';
import Badge from '../component/ui/Badge';
import { getWatchlist, clearWatchlist } from '@/app/libs/watchlist';
import { FaBookmark, FaTrash, FaSearch } from 'react-icons/fa';

export default function WatchlistPage() {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadWatchlist = () => {
    setIsLoading(true);
    const items = getWatchlist();
    setWatchlistItems(items);
    setFilteredItems(items);
    setIsLoading(false);
  };

  useEffect(() => {
    loadWatchlist();

    const handleUpdate = () => {
      loadWatchlist();
    };

    window.addEventListener('watchlist-updated', handleUpdate);
    return () => window.removeEventListener('watchlist-updated', handleUpdate);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredItems(watchlistItems);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredItems(
        watchlistItems.filter(
          (m) =>
            m.title?.toLowerCase().includes(q) ||
            m.genre?.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery, watchlistItems]);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
      clearWatchlist();
    }
  };

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="relative w-full py-12 sm:py-16 bg-background border-b border-purple-900/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        <Container className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="new" size="md" icon={<FaBookmark />}>
                MY WATCHLIST
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
                Saved Movies & Series ({watchlistItems.length})
              </h1>
              <p className="text-xs sm:text-sm text-foreground-muted">
                Your personal collection of bookmarked titles to watch anytime.
              </p>
            </div>

            {watchlistItems.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                iconLeft={<FaTrash className="text-xs text-error" />}
                onClick={handleClearAll}
                className="text-error hover:bg-error/10 hover:text-error self-start sm:self-auto"
              >
                Clear All Items
              </Button>
            )}
          </div>

          {/* Search Filter input if watchlist has items */}
          {watchlistItems.length > 0 && (
            <div className="pt-2">
              <div className="relative max-w-xs">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search saved titles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-surface border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl outline-none"
                />
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Main Watchlist Items Container */}
      <Container className="py-12">
        {filteredItems.length > 0 ? (
          <div className="space-y-6">
            <MovieGrid movies={filteredItems} />
          </div>
        ) : (
          <EmptyState
            title={
              searchQuery
                ? 'No saved titles match your search'
                : 'Your Watchlist is Empty'
            }
            description={
              searchQuery
                ? 'Try clearing your search query.'
                : 'Explore our catalog and click "+ Add to Watchlist" on any movie or series to save it here!'
            }
          />
        )}
      </Container>
    </PublicLayout>
  );
}
