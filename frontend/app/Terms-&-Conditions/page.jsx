'use client';

import React from 'react';
import PublicLayout from '../component/layout/PublicLayout';
import Container from '../component/ui/Container';
import Badge from '../component/ui/Badge';
import {
  FaGavel,
  FaCheck,
  FaUserCheck,
  FaShieldAlt,
  FaLaptop,
  FaBan,
  FaEnvelope,
} from 'react-icons/fa';

export default function TermsAndConditionsPage() {
  const termsList = [
    {
      icon: <FaCheck className="text-primary" />,
      title: '1. Free Platform Access',
      content:
        'Moybd is a free streaming & discovery service. Users enjoy access to movie listings, trailers, ratings, and quality download links without subscription fees.',
    },
    {
      icon: <FaUserCheck className="text-primary" />,
      title: '2. User Accounts & Security',
      content:
        'Users must create an account to access interactive features like commenting, rating, and watchlists. You are responsible for maintaining account credential confidentiality.',
    },
    {
      icon: <FaShieldAlt className="text-primary" />,
      title: '3. Content Usage Guidelines',
      items: [
        'Use the service strictly for personal, non-commercial entertainment.',
        'Do not attempt to circumvent technical protection measures.',
        'Do not redistribute or re-host Moybd content on commercial networks.',
      ],
    },
    {
      icon: <FaLaptop className="text-primary" />,
      title: '4. Technical Requirements',
      items: [
        'Stable internet connection (minimum 5 Mbps recommended for HD/4K).',
        'Modern web browser (Chrome, Firefox, Safari, Edge).',
        'Cookies and JavaScript enabled for authentication & watchlists.',
      ],
    },
    {
      icon: <FaBan className="text-primary" />,
      title: '5. Account Termination',
      content:
        'We reserve the right to suspend or terminate accounts that violate community standards, engage in spamming, or abuse platform infrastructure.',
    },
    {
      icon: <FaGavel className="text-primary" />,
      title: '6. Disclaimer of Warranty',
      content:
        'Moybd is provided "as is" without warranties of any kind. We are not liable for temporary service interruptions or third-party external links.',
    },
  ];

  return (
    <PublicLayout>
      <section className="relative w-full py-16 sm:py-20 bg-background border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        <Container className="relative z-10 text-center space-y-4 max-w-3xl">
          <Badge variant="subtle" size="md">
            TERMS & AGREEMENTS
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Terms & Conditions
          </h1>
          <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
            Please read these terms and conditions carefully before using the Moybd platform.
          </p>
        </Container>
      </section>

      <Container className="py-12 max-w-4xl space-y-6">
        {termsList.map((term, idx) => (
          <div
            key={idx}
            className="bg-surface rounded-2xl p-6 sm:p-8 border border-border/60 space-y-3 shadow-card"
          >
            <div className="flex items-center gap-3 text-xl font-bold text-foreground border-b border-border/40 pb-3">
              <span className="p-2 bg-primary/10 rounded-lg text-sm">{term.icon}</span>
              <h2>{term.title}</h2>
            </div>

            {term.content && (
              <p className="text-sm text-foreground-secondary leading-relaxed pt-1">
                {term.content}
              </p>
            )}

            {term.items && (
              <ul className="space-y-2 text-sm text-foreground-secondary pt-1">
                {term.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Support Section */}
        <div className="bg-surface-elevated rounded-2xl p-6 border border-border/60 text-center space-y-2">
          <h3 className="text-lg font-bold text-foreground flex items-center justify-center gap-2">
            <FaEnvelope className="text-primary" /> Questions About Our Terms?
          </h3>
          <p className="text-xs text-foreground-muted">
            Reach out to our support team at{' '}
            <a
              href="mailto:support@movieapp.com"
              className="text-primary font-semibold hover:underline"
            >
              support@movieapp.com
            </a>
          </p>
        </div>
      </Container>
    </PublicLayout>
  );
}