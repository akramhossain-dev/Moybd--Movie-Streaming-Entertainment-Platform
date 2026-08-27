'use client';

import React from 'react';
import Link from 'next/link';
import Container from './ui/Container';
import Logo from './ui/Logo';
import {
  FaFilm,
  FaFacebook,
  FaTelegramPlane,
  FaTwitter,
  FaGithub,
  FaShieldAlt,
  FaLock,
  FaTv,
  FaHeart,
} from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background-secondary border-t border-purple-900/40 text-foreground-secondary pt-14 pb-8 mt-20 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 space-y-12">
        {/* Top Quality Features Pill Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-surface/60 rounded-2xl border border-purple-900/40 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-primary/30 flex items-center justify-center text-primary shrink-0">
              <FaFilm className="text-base" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">4K Ultra HD</h4>
              <p className="text-[11px] text-foreground-muted">Crisp Quality</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-primary/30 flex items-center justify-center text-primary shrink-0">
              <FaTv className="text-base" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Web Series</h4>
              <p className="text-[11px] text-foreground-muted">Complete Seasons</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-primary/30 flex items-center justify-center text-primary shrink-0">
              <FaLock className="text-base" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">AES-256 Link</h4>
              <p className="text-[11px] text-foreground-muted">Encrypted Downloads</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-primary/30 flex items-center justify-center text-primary shrink-0">
              <FaShieldAlt className="text-base" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Zero Tracker</h4>
              <p className="text-[11px] text-foreground-muted">100% Privacy</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pt-2">
          {/* Brand & Social Column (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" />

            <p className="text-xs leading-relaxed text-foreground-muted max-w-sm">
              Moybd is a modern entertainment index designed for cinephiles. Discover latest movies, TV series, reviews, and high-speed direct downloads in ultra HD.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://www.facebook.com/movieofyearbd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="w-9 h-9 rounded-xl bg-surface border border-purple-900/40 flex items-center justify-center text-foreground-secondary hover:text-white hover:bg-primary hover:border-primary transition-all duration-200"
              >
                <FaFacebook className="text-sm" />
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram Channel"
                className="w-9 h-9 rounded-xl bg-surface border border-purple-900/40 flex items-center justify-center text-foreground-secondary hover:text-white hover:bg-primary hover:border-primary transition-all duration-200"
              >
                <FaTelegramPlane className="text-sm" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Account"
                className="w-9 h-9 rounded-xl bg-surface border border-purple-900/40 flex items-center justify-center text-foreground-secondary hover:text-white hover:bg-primary hover:border-primary transition-all duration-200"
              >
                <FaTwitter className="text-sm" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="w-9 h-9 rounded-xl bg-surface border border-purple-900/40 flex items-center justify-center text-foreground-secondary hover:text-white hover:bg-primary hover:border-primary transition-all duration-200"
              >
                <FaGithub className="text-sm" />
              </a>
            </div>
          </div>

          {/* Navigation Column (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/movies" className="hover:text-primary transition-colors">
                  Browse Movies
                </Link>
              </li>
              <li>
                <Link href="/series" className="hover:text-primary transition-colors">
                  TV &amp; Web Series
                </Link>
              </li>
              <li>
                <Link href="/watchlist" className="hover:text-primary transition-colors">
                  My Watchlist
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories Column (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase">
              Popular Categories
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              <li>
                <Link href="/Hollywood" className="hover:text-primary transition-colors">
                  Hollywood
                </Link>
              </li>
              <li>
                <Link href="/Bollywood" className="hover:text-primary transition-colors">
                  Bollywood
                </Link>
              </li>
              <li>
                <Link href="/South" className="hover:text-primary transition-colors">
                  South Indian
                </Link>
              </li>
              <li>
                <Link href="/Marvel_Studio" className="hover:text-primary transition-colors">
                  Marvel Studio
                </Link>
              </li>
              <li>
                <Link href="/TV_Shows" className="hover:text-primary transition-colors">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link href="/anime" className="hover:text-primary transition-colors">
                  Anime
                </Link>
              </li>
              <li>
                <Link href="/Action" className="hover:text-primary transition-colors">
                  Action
                </Link>
              </li>
              <li>
                <Link href="/Thriller" className="hover:text-primary transition-colors">
                  Thriller
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Security Column (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase">
              Legal &amp; Compliance
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About MOYBD
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/Terms-&-Conditions" className="hover:text-primary transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-primary transition-colors">
                  DMCA Takedown Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-purple-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground-muted">
          <p>&copy; {currentYear} MOYBD. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <FaHeart className="text-primary text-[10px]" />
            <span>for Cinematic Excellence.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
