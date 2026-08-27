'use client';

import React from 'react';
import Link from 'next/link';
import PublicLayout from './component/layout/PublicLayout';
import Container from './component/ui/Container';
import Button from './component/ui/Button';
import { FaHome, FaFilm, FaSearch, FaExclamationTriangle, FaBookmark } from 'react-icons/fa';

export default function NotFound() {
  return (
    <PublicLayout>
      <section className="relative min-h-[75vh] flex items-center justify-center py-16 overflow-hidden bg-background">
        {/* Subtle Background Glow Spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-900/30 rounded-full blur-[100px] pointer-events-none" />

        <Container className="relative z-10 text-center max-w-2xl mx-auto space-y-8">
          {/* Animated 404 Badge & Icon */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-surface-elevated border border-purple-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.3)]">
              <FaExclamationTriangle className="text-4xl sm:text-5xl text-warning animate-bounce" />
            </div>
          </div>

          {/* Huge Gradient 404 Text */}
          <div className="space-y-2">
            <h1 className="text-7xl sm:text-9xl font-black tracking-widest bg-gradient-to-r from-purple-400 via-primary to-amber-400 bg-clip-text text-transparent drop-shadow-md select-none">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Lost in the Cinematic Multiverse
            </h2>
            <p className="text-sm sm:text-base text-foreground-secondary max-w-lg mx-auto leading-relaxed">
              The page, movie, or series you are looking for has been moved, renamed, or never existed in our catalog.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/">
              <Button
                variant="primary"
                size="lg"
                iconLeft={<FaHome className="text-base ml-0.5" />}
              >
                Back to Home Page
              </Button>
            </Link>

            <Link href="/movies">
              <Button
                variant="secondary"
                size="lg"
                iconLeft={<FaFilm className="text-base" />}
              >
                Explore Movies
              </Button>
            </Link>

            <Link href="/watchlist">
              <Button
                variant="secondary"
                size="lg"
                iconLeft={<FaBookmark className="text-base" />}
              >
                My Watchlist
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
