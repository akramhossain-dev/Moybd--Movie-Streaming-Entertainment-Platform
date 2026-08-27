'use client';

import React from 'react';
import PublicLayout from '../component/layout/PublicLayout';
import Container from '../component/ui/Container';
import Badge from '../component/ui/Badge';
import {
  FaShieldAlt,
  FaUserShield,
  FaDatabase,
  FaLock,
  FaExternalLinkAlt,
  FaEnvelope,
} from 'react-icons/fa';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: <FaShieldAlt className="text-primary" />,
      title: '1. Introduction',
      content:
        'At Moybd, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our movie streaming platform, application, and web services.',
    },
    {
      icon: <FaDatabase className="text-primary" />,
      title: '2. Information We Collect',
      items: [
        'Personal identification information (Name, email address upon registration)',
        'Device details, browser types, and IP addresses for security auditing',
        'Viewing preferences, search history, and watchlist items',
        'Authentication tokens and session identifiers',
      ],
    },
    {
      icon: <FaUserShield className="text-primary" />,
      title: '3. How We Use Your Information',
      items: [
        'Providing and personalizing your movie streaming experience',
        'Processing account registration and email verification',
        'Maintaining platform security and preventing unauthorized access',
        'Analyzing usage patterns to optimize recommendation algorithms',
      ],
    },
    {
      icon: <FaLock className="text-primary" />,
      title: '4. Data Security',
      content:
        'We implement enterprise-grade security measures including encrypted session tokens and AES payload encryption. However, no method of transmission over the internet is 100% secure.',
    },
    {
      icon: <FaExternalLinkAlt className="text-primary" />,
      title: '5. Third-Party Services',
      content:
        'Our service may contain links to third-party media resources or streaming providers. We are not responsible for the privacy practices or content of third-party platforms.',
    },
    {
      icon: <FaEnvelope className="text-primary" />,
      title: '6. Contact Us',
      content:
        'If you have any questions or concerns regarding this Privacy Policy, please contact our privacy compliance team at privacy@movieapp.com or +880 9638 554567.',
    },
  ];

  return (
    <PublicLayout>
      <section className="relative w-full py-16 sm:py-20 bg-background border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        <Container className="relative z-10 text-center space-y-4 max-w-3xl">
          <Badge variant="subtle" size="md">
            LEGAL & PRIVACY
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
            Learn how we handle, protect, and process your data on Moybd. Last updated: August 2026.
          </p>
        </Container>
      </section>

      <Container className="py-12 max-w-4xl space-y-6">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className="bg-surface rounded-2xl p-6 sm:p-8 border border-border/60 space-y-3 shadow-card"
          >
            <div className="flex items-center gap-3 text-xl font-bold text-foreground border-b border-border/40 pb-3">
              <span className="p-2 bg-primary/10 rounded-lg text-sm">{sec.icon}</span>
              <h2>{sec.title}</h2>
            </div>

            {sec.content && (
              <p className="text-sm text-foreground-secondary leading-relaxed pt-1">
                {sec.content}
              </p>
            )}

            {sec.items && (
              <ul className="space-y-2 text-sm text-foreground-secondary pt-1">
                {sec.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Container>
    </PublicLayout>
  );
}