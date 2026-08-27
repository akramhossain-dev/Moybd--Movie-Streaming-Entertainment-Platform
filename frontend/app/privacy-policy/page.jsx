'use client';

import React from 'react';
import PublicLayout from '../component/layout/PublicLayout';
import Container from '../component/ui/Container';
import Badge from '../component/ui/Badge';
import Button from '../component/ui/Button';
import Link from 'next/link';
import {
  FaShieldAlt,
  FaUserShield,
  FaDatabase,
  FaLock,
  FaExternalLinkAlt,
  FaEnvelope,
  FaCheckCircle,
  FaCookieBite,
} from 'react-icons/fa';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: 'introduction',
      icon: <FaShieldAlt className="text-primary text-lg" />,
      title: '1. Executive Introduction & Scope',
      content:
        'At Moybd, we prioritize the protection and confidentiality of user data. This Privacy Policy governs your use of our website, streaming index, and user authentication services. By using Moybd, you consent to the data practices described in this document.',
    },
    {
      id: 'data-collection',
      icon: <FaDatabase className="text-primary text-lg" />,
      title: '2. Information We Collect & Process',
      items: [
        'Account Credentials: Usernames, email addresses, and encrypted password hashes created during registration.',
        'Watchlist & Interaction State: Saved bookmarks, rating history, and commentary preferences.',
        'Technical Telemetry: Anonymized IP logs, browser type, and device classifications stored strictly for security rate-limiting and abuse detection.',
        'Session Identifiers: Secure HTTP cookies and JWT tokens used exclusively to keep you signed in.',
      ],
    },
    {
      id: 'download-security',
      icon: <FaLock className="text-primary text-lg" />,
      title: '3. Download System & Server-Side Security',
      content:
        'Moybd operates an advanced server-side AES-256-GCM encryption architecture. Raw media URLs are never exposed in public API responses. Download requests trigger short-lived, signed authorization tokens valid for 2 minutes, preventing bulk link scraping and protecting user privacy.',
    },
    {
      id: 'cookies',
      icon: <FaCookieBite className="text-primary text-lg" />,
      title: '4. Cookies & Local State Usage',
      items: [
        'Authentication Cookies: Essential cookies used to retain active sign-in sessions.',
        'Watchlist LocalStorage: Client-side storage used to provide instant, zero-latency bookmarking.',
        'Preference Cookies: Custom UI settings including theme tokens and filter preferences.',
      ],
    },
    {
      id: 'third-party',
      icon: <FaExternalLinkAlt className="text-primary text-lg" />,
      title: '5. External Links & Media Providers',
      content:
        'Moybd indexes public media trailers and third-party streaming resources. We do not host copyrighted files directly on our servers and are not responsible for the privacy practices of external third-party hosts.',
    },
    {
      id: 'contact',
      icon: <FaEnvelope className="text-primary text-lg" />,
      title: '6. Privacy Inquiries & Support',
      content:
        'If you have questions regarding data privacy, account deletion, or policy enforcement, please contact our compliance team directly.',
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="relative w-full py-16 sm:py-24 bg-background border-b border-purple-900/40 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />

        <Container className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="new" size="md">
            LEGAL & PRIVACY COMPLIANCE
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Privacy Policy & Data Security
          </h1>
          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
            Your trust matters to us. Learn how we safeguard your data, enforce AES-256-GCM link security, and protect your privacy. Last updated: August 2026.
          </p>
        </Container>
      </section>

      <Container className="py-12 max-w-4xl space-y-8">
        {/* Security Guarantee Banner */}
        <div className="bg-purple-950/40 p-6 rounded-2xl border border-purple-900/50 flex flex-col sm:flex-row items-center gap-4 shadow-card">
          <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0 border border-primary/40 shadow-glow">
            <FaUserShield className="text-2xl" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-foreground">Zero Bulk Tracking Guarantee</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Moybd never sells user data, track off-site browsing, or embed invasive third-party ad trackers.
            </p>
          </div>
        </div>

        {/* Section Cards */}
        {sections.map((sec, idx) => (
          <div
            id={sec.id}
            key={idx}
            className="bg-surface rounded-2xl p-6 sm:p-8 border border-purple-900/40 hover:border-primary/40 transition-all space-y-4 shadow-card"
          >
            <div className="flex items-center gap-3 text-lg sm:text-xl font-bold text-foreground border-b border-purple-900/30 pb-3">
              <span className="p-2.5 bg-purple-950/80 rounded-xl border border-purple-900/40 shadow-subtle">
                {sec.icon}
              </span>
              <h2>{sec.title}</h2>
            </div>

            {sec.content && (
              <p className="text-sm text-foreground-secondary leading-relaxed">
                {sec.content}
              </p>
            )}

            {sec.items && (
              <ul className="space-y-2.5 text-sm text-foreground-secondary pt-1">
                {sec.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-primary text-sm mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Support CTA */}
        <div className="bg-surface rounded-2xl p-8 border border-purple-900/40 text-center space-y-4 shadow-card max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
            <FaEnvelope className="text-primary" /> Privacy Questions?
          </h3>
          <p className="text-xs sm:text-sm text-foreground-muted">
            Reach out to our privacy compliance team for inquiries or data removal requests.
          </p>
          <Link href="/contact" className="inline-block pt-2">
            <Button variant="primary" size="lg" iconLeft={<FaEnvelope />}>
              Contact Privacy Team
            </Button>
          </Link>
        </div>
      </Container>
    </PublicLayout>
  );
}