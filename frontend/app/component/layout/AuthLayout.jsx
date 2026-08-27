'use client';

import React from 'react';
import PublicLayout from './PublicLayout';
import Container from '../ui/Container';
import Badge from '../ui/Badge';
import { FaFilm } from 'react-icons/fa';

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <PublicLayout>
      <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 overflow-hidden bg-background">
        {/* Subtle Cinematic Background Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

        <Container className="relative z-10 max-w-md w-full mx-auto">
          {/* Card Container */}
          <div className="bg-surface/80 backdrop-blur-md rounded-2xl border border-border/60 shadow-modal p-6 sm:p-8 space-y-6">
            {/* Auth Header */}
            <div className="text-center space-y-2.5">
              <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold tracking-wide uppercase mb-1">
                <FaFilm className="text-xs" />
                Moybd Streaming
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Auth Body */}
            {children}
          </div>
        </Container>
      </div>
    </PublicLayout>
  );
}
