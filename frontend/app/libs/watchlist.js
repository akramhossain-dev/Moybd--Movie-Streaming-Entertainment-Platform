'use client';

import { toast } from '@/app/component/ui/Toast';

const WATCHLIST_STORAGE_KEY = 'moybd_watchlist_items';

/**
 * Get all movies saved in localStorage watchlist
 */
export function getWatchlist() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(WATCHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Error reading watchlist from localStorage:', error);
    return [];
  }
}

/**
 * Check if a movie is in the watchlist by ID or Slug
 */
export function isInWatchlist(idOrSlug) {
  if (!idOrSlug) return false;
  const list = getWatchlist();
  return list.some(
    (item) => item._id === idOrSlug || item.slug === idOrSlug || item.id === idOrSlug
  );
}

/**
 * Add or remove a movie from the watchlist (Toggle)
 * @returns {boolean} true if added, false if removed
 */
export function toggleWatchlist(movie) {
  if (typeof window === 'undefined' || !movie) return false;
  const list = getWatchlist();
  const movieId = movie._id || movie.slug || movie.id;

  const existingIndex = list.findIndex(
    (item) => item._id === movieId || item.slug === movieId || item.id === movieId
  );

  let updatedList = [];
  let isAdded = false;

  if (existingIndex > -1) {
    // Remove
    updatedList = list.filter((_, idx) => idx !== existingIndex);
    isAdded = false;
    toast.info(`Removed "${movie.title || 'Title'}" from Watchlist`);
  } else {
    // Add
    const movieToSave = {
      _id: movie._id || movieId,
      slug: movie.slug || movieId,
      title: movie.title || 'Untitled',
      smposter: movie.smposter || movie.bgposter || '',
      bgposter: movie.bgposter || movie.smposter || '',
      rating: movie.rating || '',
      year: movie.year || '',
      genre: movie.genre || '',
      quality: movie.quality || 'HD',
      addedAt: new Date().toISOString(),
    };
    updatedList = [movieToSave, ...list];
    isAdded = true;
    toast.success(`Added "${movie.title || 'Title'}" to Watchlist!`);
  }

  try {
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(updatedList));
    // Dispatch custom event for real-time navbar counter update
    window.dispatchEvent(new Event('watchlist-updated'));
  } catch (error) {
    console.error('Error saving watchlist to localStorage:', error);
  }

  return isAdded;
}

/**
 * Clear all watchlist items
 */
export function clearWatchlist() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(WATCHLIST_STORAGE_KEY);
    window.dispatchEvent(new Event('watchlist-updated'));
    toast.info('Watchlist cleared');
  } catch (error) {
    console.error('Error clearing watchlist:', error);
  }
}
