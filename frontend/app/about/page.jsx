'use client';

import React from 'react';
import Link from 'next/link';
import PublicLayout from '../component/layout/PublicLayout';
import Container from '../component/ui/Container';
import Button from '../component/ui/Button';
import Badge from '../component/ui/Badge';
import {
  FaFilm,
  FaRocket,
  FaShieldAlt,
  FaDownload,
  FaBookmark,
  FaComments,
  FaCheckCircle,
  FaTv,
  FaGlobe,
  FaEnvelope,
  FaPlayCircle,
  FaLock,
} from 'react-icons/fa';

export default function AboutPage() {
  const PLATFORM_PILLARS = [
    {
      icon: <FaFilm className="text-primary text-xl" />,
      title: '4K Ultra HD Streaming & Catalog',
      desc: 'Immerse yourself in thousands of curated movies, web series, and anime with full metadata, IMDb ratings, and high-bitrate streaming trailers.',
    },
    {
      icon: <FaLock className="text-primary text-xl" />,
      title: 'Encrypted & Secure Downloads',
      desc: 'Our architecture uses server-side AES-256-GCM encryption with short-lived signed authorization tokens to ensure fast, protected direct downloads.',
    },
    {
      icon: <FaBookmark className="text-primary text-xl" />,
      title: 'Real-Time Watchlist & Sync',
      desc: 'Save your favorite movies and series to your personal watchlist with live badge tracking and zero-latency local persistence.',
    },
    {
      icon: <FaComments className="text-primary text-xl" />,
      title: 'Cinephile Community & Reviews',
      desc: 'Join the conversation! Express your thoughts, write reviews, and rate latest blockbusters alongside film enthusiasts.',
    },
  ];

  const GENRES_LIST = [
    { name: 'Hollywood Blockbusters', count: '12,500+ Titles', icon: <FaFilm /> },
    { name: 'Bollywood Hits', count: '8,400+ Titles', icon: <FaPlayCircle /> },
    { name: 'South Indian Sagas', count: '6,200+ Titles', icon: <FaRocket /> },
    { name: 'Anime & Animated Classics', count: '4,800+ Series', icon: <FaTv /> },
  ];

  return (
    <PublicLayout>
      {/* 1. Cinematic Hero Header */}
      <section className="relative w-full py-16 sm:py-24 bg-background border-b border-purple-900/40 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <Container className="relative z-10 text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-tight">
            Redefining Next-Gen <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-primary to-amber-300 bg-clip-text text-transparent">
              Cinematic Entertainment
            </span>
          </h1>

          <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed max-w-2xl mx-auto">
            Moybd is a modern entertainment platform crafted for film lovers. We bring high-speed downloads, crisp metadata, community reviews, and an ultra-sleek dark interface into one seamless hub.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/movies">
              <Button
                variant="primary"
                size="lg"
                iconLeft={<FaPlayCircle className="text-base" />}
              >
                Browse Catalog
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

      <Container className="py-16 space-y-16">
        {/* 2. Platform Pillars Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground">
              Built for Ultimate Performance
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted">
              Designed with state-of-the-art Web technologies, accessibility, and Deep Violet aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PLATFORM_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-xl p-6 sm:p-8 border border-purple-900/40 hover:border-primary/50 transition-all duration-200 space-y-4 shadow-card group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-primary/40 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. High-Density Categories Highlight */}
        <div className="bg-surface rounded-2xl p-6 sm:p-10 border border-purple-900/40 space-y-8 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-purple-900/30 pb-6">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
                <FaGlobe className="text-primary text-xl" /> Diverse Entertainment Categories
              </h2>
              <p className="text-xs sm:text-sm text-foreground-muted">
                From Hollywood superhero sagas to South Indian action thrillers and Japanese Anime.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GENRES_LIST.map((cat, idx) => (
              <div
                key={idx}
                className="bg-background/80 p-4 sm:p-5 rounded-xl border border-purple-900/30 flex items-center gap-4 hover:border-primary/50 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  {cat.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{cat.name}</h4>
                  <span className="text-xs text-foreground-muted">{cat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Live Platform Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { number: '50,000+', label: 'Catalog Titles' },
            { number: '4K Ultra HD', label: 'Maximum Resolution' },
            { number: '100% Free', label: 'No Hidden Fees' },
            { number: '99.9%', label: 'CDN High-Speed Uptime' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-xl p-5 sm:p-6 border border-purple-900/40 text-center space-y-1 shadow-card"
            >
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-400 to-primary bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-foreground-muted font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 5. Security & Privacy Commitment */}
        <div className="bg-gradient-to-r from-purple-950/60 via-surface to-purple-950/60 rounded-2xl p-6 sm:p-10 border border-purple-900/40 text-center space-y-4 max-w-3xl mx-auto shadow-modal">
          <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mx-auto border border-primary/40 shadow-glow">
            <FaShieldAlt className="text-xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Security & User Privacy First
          </h2>
          <p className="text-xs sm:text-sm text-foreground-secondary max-w-xl mx-auto leading-relaxed">
            We prioritize your privacy. All download links are encrypted server-side, protecting our infrastructure while delivering safe, high-speed access to entertainment content without intrusive trackers.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <Button variant="primary" size="lg" iconLeft={<FaEnvelope />}>
                Contact Support & Feedback
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </PublicLayout>
  );
}