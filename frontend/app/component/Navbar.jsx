'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Container from './ui/Container';
import Button from './ui/Button';
import IconButton from './ui/IconButton';
import Badge from './ui/Badge';
import Logo from './ui/Logo';
import {
  FaSearch,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaStar,
  FaSignOutAlt,
  FaFilm,
  FaBookmark,
  FaExclamationTriangle,
  FaThLarge,
} from 'react-icons/fa';
import { getWatchlist } from '@/app/libs/watchlist';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/movies', label: 'Movies' },
  { href: '/series', label: 'Series' },
  { href: '/watchlist', label: 'Watchlist', hasBadge: true },
  { href: '/contact', label: 'Contact' },
];

const CATEGORIES = [
  { href: '/Hollywood', label: 'Hollywood' },
  { href: '/Bollywood', label: 'Bollywood' },
  { href: '/South', label: 'South' },
  { href: '/Marvel_Studio', label: 'Marvel Studio' },
  { href: '/Gujarati', label: 'Gujarati' },
  { href: '/TV_Shows', label: 'TV Shows' },
  { href: '/Web_Series', label: 'Web Series' },
  { href: '/anime', label: 'Anime' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // State
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [watchlistCount, setWatchlistCount] = useState(0);

  // Refs for click outside
  const categoryRef = useRef(null);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  // Watchlist count listener
  useEffect(() => {
    const updateCount = () => {
      const list = getWatchlist();
      setWatchlistCount(list.length);
    };

    updateCount();
    window.addEventListener('watchlist-updated', updateCount);
    window.addEventListener('storage', updateCount);
    return () => {
      window.removeEventListener('watchlist-updated', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  // Handle scroll state for sticky backdrop
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic server-side search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMovies([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/search?q=${encodeURIComponent(
            searchQuery.trim()
          )}`
        );
        if (!response.ok) throw new Error('Search request failed');
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setFilteredMovies(data.data);
        } else {
          setFilteredMovies([]);
        }
      } catch (err) {
        setSearchError(err.message);
        setFilteredMovies([]);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Auth status check
  useEffect(() => {
    const checkLoginStatus = () => {
      const stored =
        Cookies.get('isLoggedIn') ||
        sessionStorage.getItem('isLoggedIn') ||
        localStorage.getItem('isLoggedIn');
      setIsLoggedIn(stored === 'true');
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  // Body scroll lock on mobile menu toggle
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Click outside & Escape key handlers
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCategoryOpen(false);
        setUserMenuOpen(false);
        setIsMobileOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    setUserMenuOpen(false);
    router.push('/');
  };

  const handleSearchResultClick = (slug) => {
    setSearchQuery('');
    router.push(`/download/${slug}`);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-normal ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-subtle py-2.5'
            : 'bg-gradient-to-b from-background/90 via-background/60 to-transparent py-4'
        }`}
      >
        <Container className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-fast relative flex items-center gap-1.5 ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-surface/50'
                  }`}
                >
                  {link.label === 'Watchlist' && <FaBookmark className="text-xs" />}
                  <span>{link.label}</span>
                  {link.hasBadge && watchlistCount > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] font-bold bg-primary text-white rounded-pill shrink-0 shadow-glow">
                      {watchlistCount}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full shadow-glow" />
                  )}
                </Link>
              );
            })}

            {/* Categories Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                type="button"
                onClick={() => setCategoryOpen(!categoryOpen)}
                aria-expanded={categoryOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-fast ${
                  categoryOpen || CATEGORIES.some((c) => pathname === c.href)
                    ? 'text-primary font-semibold'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-surface/50'
                }`}
              >
                <span>Categories</span>
                <FaChevronDown
                  className={`text-xs transition-transform duration-fast ${
                    categoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {categoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 py-2 bg-surface-elevated border border-border/80 rounded-lg shadow-elevated backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-fast">
                  <div className="px-3 py-1 text-[11px] font-semibold text-foreground-muted tracking-wider uppercase">
                    Browse Genres
                  </div>
                  {CATEGORIES.map((cat) => {
                    const isCatActive = pathname === cat.href;
                    return (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={() => setCategoryOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2 text-sm font-medium transition-colors ${
                          isCatActive
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-foreground-secondary hover:bg-surface hover:text-foreground'
                        }`}
                      >
                        <span>{cat.label}</span>
                        {isCatActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Search Entry Point & Auth Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input Box */}
            <div className="relative" ref={searchRef}>
              <div className="relative flex items-center">
                <FaSearch className="absolute left-3 text-foreground-muted text-sm pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-36 sm:w-52 lg:w-64 pl-9 pr-3 py-1.5 bg-surface/80 border border-border/60 focus:border-primary focus:bg-surface text-foreground placeholder:text-foreground-muted text-xs sm:text-sm rounded-pill transition-all duration-fast outline-none"
                  aria-label="Search movies"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-xs text-foreground-muted hover:text-foreground"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Search Dropdown Overlay Results */}
              {searchQuery.trim() && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-96 max-h-96 overflow-y-auto bg-surface-elevated border border-border rounded-xl shadow-modal z-50 p-2 space-y-1">
                  {isSearching ? (
                    <div className="p-4 text-center text-xs text-foreground-muted">
                      Searching catalog...
                    </div>
                  ) : searchError ? (
                    <div className="p-3 text-center text-xs text-error">
                      {searchError}
                    </div>
                  ) : filteredMovies.length > 0 ? (
                    filteredMovies.slice(0, 8).map((movie) => (
                      <div
                        key={movie._id || movie.slug}
                        onClick={() => handleSearchResultClick(movie.slug)}
                        role="button"
                        tabIndex={0}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface transition-colors cursor-pointer"
                      >
                        <img
                          src={movie.smposter || '/fallback-poster.png'}
                          alt={movie.title}
                          className="w-10 h-14 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {movie.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-foreground-muted mt-0.5">
                            <span>{movie.year || 'N/A'}</span>
                            {movie.rating && (
                              <span className="flex items-center gap-1 text-rating font-medium">
                                <FaStar className="text-[10px]" />
                                {movie.rating}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-foreground-muted">
                      No movies matching &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Auth / Profile Area */}
            <div className="hidden sm:flex items-center gap-2">
              {!isLoggedIn ? (
                <Link href="/login">
                  <Button variant="primary" size="sm">
                    Sign In
                  </Button>
                </Link>
              ) : (
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    aria-expanded={userMenuOpen}
                    aria-label="User account menu"
                    className="flex items-center gap-2 p-1 rounded-full border border-border/80 hover:border-primary transition-colors bg-surface-elevated"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                      <FaUser />
                    </div>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-surface-elevated border border-border rounded-lg shadow-elevated z-50 animate-in fade-in duration-fast">
                      <div className="px-3 py-1.5 border-b border-border/60">
                        <p className="text-xs font-semibold text-foreground">
                          Account Menu
                        </p>
                        <p className="text-[11px] text-foreground-muted">
                          Signed In
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/watchlist"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-foreground-secondary hover:text-foreground hover:bg-surface"
                        >
                          <FaBookmark /> My Watchlist ({watchlistCount})
                        </Link>
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-foreground-secondary hover:text-foreground hover:bg-surface"
                        >
                          <FaThLarge /> Dashboard
                        </Link>
                      </div>

                      <div className="border-t border-border/60 pt-1">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            setShowLogoutModal(true);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-error hover:bg-error/10 text-left font-medium"
                        >
                          <FaSignOutAlt /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden">
              <IconButton
                icon={isMobileOpen ? <FaTimes /> : <FaBars />}
                aria-label={isMobileOpen ? 'Close menu' : 'Open navigation menu'}
                aria-expanded={isMobileOpen}
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              />
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-background/95 backdrop-blur-xl animate-in fade-in duration-fast">
          {/* Mobile Drawer Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-border/50">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <FaFilm className="text-white text-base" />
              </div>
              <span className="text-xl font-black tracking-wider text-foreground">
                MOY<span className="text-primary">BD</span>
              </span>
            </Link>
            <IconButton
              icon={<FaTimes />}
              aria-label="Close menu"
              variant="ghost"
              size="md"
              onClick={() => setIsMobileOpen(false)}
            />
          </div>

          {/* Mobile Drawer Links */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            <nav className="space-y-1">
              <div className="text-xs font-semibold text-foreground-muted tracking-wider uppercase mb-2">
                Navigation
              </div>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary text-white font-bold'
                        : 'text-foreground-secondary hover:bg-surface hover:text-foreground'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.hasBadge && watchlistCount > 0 && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-primary text-white rounded-pill">
                        {watchlistCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-foreground-muted tracking-wider uppercase">
                Categories
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => {
                  const isCatActive = pathname === cat.href;
                  return (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                        isCatActive
                          ? 'bg-primary/20 border-primary text-primary font-semibold'
                          : 'bg-surface/60 border-border/50 text-foreground-secondary hover:text-foreground'
                      }`}
                    >
                      {cat.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Auth Button */}
            <div className="pt-4 border-t border-border/50">
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  onClick={() => setIsMobileOpen(false)}
                  className="block w-full"
                >
                  <Button variant="primary" size="lg" fullWidth>
                    Sign In
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="danger"
                  size="lg"
                  fullWidth
                  iconLeft={<FaSignOutAlt />}
                  onClick={() => {
                    setIsMobileOpen(false);
                    setShowLogoutModal(true);
                  }}
                >
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-overlay/80 backdrop-blur-sm animate-in fade-in duration-fast">
          <div className="w-full max-w-sm p-6 bg-surface-elevated border border-border rounded-xl shadow-modal text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-error/10 text-error mx-auto flex items-center justify-center">
              <FaExclamationTriangle className="text-xl" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">
                Sign Out Confirmation
              </h3>
              <p className="text-xs text-foreground-muted">
                Are you sure you want to sign out of your MOYBD account?
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="md"
                fullWidth
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
