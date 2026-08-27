'use client';

import React from 'react';
import Link from 'next/link';
import PublicLayout from '../component/layout/PublicLayout';
import Container from '../component/ui/Container';
import Button from '../component/ui/Button';
import Badge from '../component/ui/Badge';
import {
  FaFilm,
  FaBullhorn,
  FaUsers,
  FaRocket,
  FaCheckCircle,
  FaEnvelope,
  FaLaptopCode,
} from 'react-icons/fa';

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="relative w-full py-16 sm:py-20 bg-background border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        <Container className="relative z-10 text-center space-y-4 max-w-3xl">
          <Badge variant="new" size="md">
            ABOUT MOYBD
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Redefining Cinematic Discovery
          </h1>
          <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
            Founded with a passion for cinema, Moybd is built to help film enthusiasts discover, track, and enjoy high-definition movies, series, and anime.
          </p>
        </Container>
      </section>

      <Container className="py-12 space-y-16">
        {/* Story & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-border/60 space-y-4 shadow-card">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <FaFilm className="text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Our Story</h2>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              Moybd emerged from a vision to break away from noisy, cluttered streaming interfaces. We believe every great story deserves an effortless discovery experience, crisp metadata, and an elegant visual presentation.
            </p>
          </div>

          <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-border/60 space-y-4 shadow-card">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <FaRocket className="text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              To empower movie lovers worldwide with seamless browsing, high-speed direct downloads, community reviews, and a personalized watchlist platform.
            </p>
          </div>
        </div>

        {/* Features & Stats Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Why Film Lovers Choose Moybd
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted">
              Built with modern performance, accessibility, and clean design tokens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'High-Density Catalog',
                desc: 'Explore thousands of movies, series, and anime with IMDb ratings and quality badges.',
              },
              {
                title: 'Fast Downloads',
                desc: 'Quality-tiered downloads (720p, 1080p, 4K) with direct high-speed server links.',
              },
              {
                title: 'Community Reviews',
                desc: 'Engage with fellow cinephiles through instant comments and ratings.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-surface-elevated/60 rounded-xl p-6 border border-border/50 space-y-3"
              >
                <FaCheckCircle className="text-primary text-lg" />
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {[
              { number: '1M+', label: 'Active Viewers' },
              { number: '500K+', label: 'Titles Tracked' },
              { number: '4K UHD', label: 'Video Quality' },
              { number: '99.9%', label: 'Uptime' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-xl p-5 border border-border/60 text-center space-y-1"
              >
                <div className="text-2xl sm:text-3xl font-black text-primary">
                  {stat.number}
                </div>
                <div className="text-xs text-foreground-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-8 pt-4">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <Badge variant="subtle" size="xs">
              DEVELOPMENT TEAM
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Meet the Creators
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: 'Akram Hossain',
                role: 'Lead Full-Stack Developer',
                image:
                  'https://avatars.githubusercontent.com/u/167062006?s=400&v=4',
              },
              {
                name: 'Minhajul Islam',
                role: 'Frontend Engineer',
                image: 'https://avatars.githubusercontent.com/u/170158642?v=4',
              },
              {
                name: 'AI Agent System',
                role: 'Autonomous Assistant',
                image:
                  'https://raw.githubusercontent.com/AkramHossain0/data/refs/heads/main/AI.jpg',
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-2xl p-6 border border-border/60 text-center space-y-4 shadow-card hover:border-primary/40 transition-colors"
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-primary shadow-glow">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-xs text-primary font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-surface rounded-2xl p-8 border border-border/60 text-center space-y-4 max-w-2xl mx-auto shadow-card">
          <h2 className="text-2xl font-bold text-foreground">Have Questions or Feedback?</h2>
          <p className="text-xs sm:text-sm text-foreground-muted">
            We love hearing from our community! Reach out to us for feature requests, support, or inquiries.
          </p>
          <Link href="/contact" className="inline-block pt-2">
            <Button variant="primary" size="lg" iconLeft={<FaEnvelope />}>
              Get in Touch
            </Button>
          </Link>
        </div>
      </Container>
    </PublicLayout>
  );
}