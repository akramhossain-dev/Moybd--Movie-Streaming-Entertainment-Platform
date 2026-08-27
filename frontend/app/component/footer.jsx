'use client';

import React from 'react';
import Link from 'next/link';
import Container from './ui/Container';
import Logo from './ui/Logo';
import { FaFilm, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background-secondary border-t border-border/50 text-foreground-secondary pt-12 pb-8 mt-16">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description Column */}
          <div className="space-y-4">
            <Logo size="md" />

            <p className="text-xs leading-relaxed text-foreground-muted">
              Your ultimate destination for streaming latest movies, tv series, reviews, and entertainment content in crisp HD and 4K quality.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.facebook.com/movieofyearbd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-foreground-secondary hover:text-white hover:bg-primary transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-foreground-secondary hover:text-white hover:bg-primary transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-foreground-secondary hover:text-white hover:bg-primary transition-colors"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wider text-foreground uppercase">
              Quick Links
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
                  TV & Web Series
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wider text-foreground uppercase">
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
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wider text-foreground uppercase">
              Company & Legal
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
                  DMCA Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Divider */}
        <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground-muted">
          <p>&copy; {currentYear} MOYBD. All rights reserved.</p>
          <p>
            Designed &amp; Crafted for Cinematic Excellence by{' '}
            <a
              href="https://www.facebook.com/0x1.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-secondary hover:text-primary transition-colors underline"
            >
              Dev World
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
