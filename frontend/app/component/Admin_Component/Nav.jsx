'use client';

import React from 'react';
import Link from 'next/link';
import { FaHome, FaUserCircle, FaSearch } from 'react-icons/fa';

export default function Nav() {
  return (
    <header className="h-16 bg-surface/90 backdrop-blur-md border-b border-border/60 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="text-xs text-foreground-muted hover:text-primary flex items-center gap-1.5 font-medium transition-colors"
        >
          <FaHome /> View Live Site
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
          <FaUserCircle className="text-primary text-base" />
          <span>Admin Portal</span>
        </div>
      </div>
    </header>
  );
}
