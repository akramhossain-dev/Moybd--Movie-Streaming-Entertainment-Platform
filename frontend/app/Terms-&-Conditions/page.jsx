'use client';

import React from 'react';
import PublicLayout from '../component/layout/PublicLayout';
import Container from '../component/ui/Container';
import Badge from '../component/ui/Badge';
import Button from '../component/ui/Button';
import Link from 'next/link';
import {
  FaGavel,
  FaCheck,
  FaUserCheck,
  FaShieldAlt,
  FaLaptop,
  FaBan,
  FaEnvelope,
  FaCheckCircle,
} from 'react-icons/fa';

export default function TermsAndConditionsPage() {
  const termsList = [
    {
      icon: <FaCheck className="text-primary text-lg" />,
      title: '1. Free Entertainment Platform Access',
      content:
        'Moybd operates as a free movie discovery and entertainment streaming hub. Users enjoy unrestricted access to catalog listings, trailer embeds, IMDb ratings, and quality download links without compulsory subscription fees.',
    },
    {
      icon: <FaUserCheck className="text-primary text-lg" />,
      title: '2. User Accounts & Responsibilities',
      content:
        'Creating an account unlocks community features such as rating titles, writing reviews, and syncing personal watchlists. Users are responsible for protecting their login credentials and maintaining respectful community interaction.',
    },
    {
      icon: <FaShieldAlt className="text-primary text-lg" />,
      title: '3. Acceptable Use & Guidelines',
      items: [
        'Content usage is restricted strictly to personal, non-commercial entertainment.',
        'Users must not attempt to breach or bypass rate limits or authorization security controls.',
        'Spamming, abusive commentary, or unauthorized automated bulk scraping is prohibited.',
      ],
    },
    {
      icon: <FaLaptop className="text-primary text-lg" />,
      title: '4. System Requirements & Compatibility',
      items: [
        'Recommended internet connection speed: 5+ Mbps for HD, 25+ Mbps for 4K Ultra HD.',
        'Supported modern web browsers: Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge.',
        'Cookies and JavaScript must be enabled for watchlist sync and session management.',
      ],
    },
    {
      icon: <FaBan className="text-primary text-lg" />,
      title: '5. Account Suspension & Termination',
      content:
        'We reserve the right to temporarily suspend or permanently terminate user accounts that breach community guidelines, engage in malicious activity, or attempt system abuse.',
    },
    {
      icon: <FaGavel className="text-primary text-lg" />,
      title: '6. Disclaimer of Warranty & Liability',
      content:
        'Moybd is provided on an "as is" and "as available" basis. While we maintain 99.9% CDN uptime, we are not liable for external third-party file host availability or internet routing delays.',
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="relative w-full py-16 sm:py-24 bg-background border-b border-purple-900/40 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />

        <Container className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
            Please read these terms and conditions carefully before using the Moybd platform. Last updated: August 2026.
          </p>
        </Container>
      </section>

      <Container className="py-12 max-w-4xl space-y-8">
        {/* Terms Section Cards */}
        {termsList.map((term, idx) => (
          <div
            key={idx}
            className="bg-surface rounded-2xl p-6 sm:p-8 border border-purple-900/40 hover:border-primary/40 transition-all space-y-4 shadow-card"
          >
            <div className="flex items-center gap-3 text-lg sm:text-xl font-bold text-foreground border-b border-purple-900/30 pb-3">
              <span className="p-2.5 bg-purple-950/80 rounded-xl border border-purple-900/40 shadow-subtle">
                {term.icon}
              </span>
              <h2>{term.title}</h2>
            </div>

            {term.content && (
              <p className="text-sm text-foreground-secondary leading-relaxed">
                {term.content}
              </p>
            )}

            {term.items && (
              <ul className="space-y-2.5 text-sm text-foreground-secondary pt-1">
                {term.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-primary text-sm mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Support Section */}
        <div className="bg-surface rounded-2xl p-8 border border-purple-900/40 text-center space-y-4 shadow-card max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
            <FaEnvelope className="text-primary" /> Questions About Our Terms?
          </h3>
          <p className="text-xs sm:text-sm text-foreground-muted">
            Have questions regarding platform policies or user agreements? Contact our legal & support desk.
          </p>
          <Link href="/contact" className="inline-block pt-2">
            <Button variant="primary" size="lg" iconLeft={<FaEnvelope />}>
              Contact Legal Support
            </Button>
          </Link>
        </div>
      </Container>
    </PublicLayout>
  );
}