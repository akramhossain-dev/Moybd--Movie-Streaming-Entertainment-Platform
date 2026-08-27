'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import PublicLayout from './component/layout/PublicLayout';
import Container from './component/ui/Container';
import Button from './component/ui/Button';
import { FaRedo, FaHome, FaExclamationTriangle } from 'react-icons/fa';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled runtime error caught:', error);
  }, [error]);

  return (
    <PublicLayout>
      <section className="relative min-h-[70vh] flex items-center justify-center py-16 overflow-hidden bg-background">
        {/* Glow Sphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-danger/15 rounded-full blur-[120px] pointer-events-none" />

        <Container className="relative z-10 text-center max-w-xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-danger/10 border border-danger/30 flex items-center justify-center mx-auto shadow-glow">
            <FaExclamationTriangle className="text-3xl text-danger animate-pulse" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Something Went Wrong
            </h1>
            <p className="text-sm text-foreground-secondary max-w-md mx-auto leading-relaxed">
              An unexpected error occurred while loading this page. Our team has been notified.
            </p>
            {error?.message && (
              <div className="mt-4 p-3 rounded-xl bg-surface border border-purple-900/40 text-xs font-mono text-danger-light max-w-md mx-auto overflow-x-auto">
                {error.message}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              iconLeft={<FaRedo className="text-sm" />}
              onClick={() => reset && reset()}
            >
              Try Again
            </Button>

            <Link href="/">
              <Button
                variant="secondary"
                size="lg"
                iconLeft={<FaHome className="text-sm" />}
              >
                Back to Home Page
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
