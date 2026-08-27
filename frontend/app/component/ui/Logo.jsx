'use client';

import React from 'react';
import Link from 'next/link';

export default function Logo({ size = 'md', href = '/', className = '' }) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-4xl',
  };

  const textSize = sizeClasses[size] || sizeClasses.md;

  const content = (
    <div className={`inline-flex items-center gap-1 group select-none ${className}`}>
      {/* Clean Animated Text Logo */}
      <span className={`${textSize} font-black tracking-wider text-foreground leading-none group-hover:scale-105 transition-transform duration-normal flex items-center`}>
        <span>MOY</span>
        <span className="bg-gradient-to-r from-purple-400 via-primary to-amber-300 bg-clip-text text-transparent ml-0.5 drop-shadow-[0_0_12px_rgba(124,58,237,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(124,58,237,0.8)] transition-all">
          BD
        </span>
        {/* Animated Glow Accent Dot */}
        <span className="relative flex h-2 w-2 ml-1.5 self-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_8px_#7c3aed]" />
        </span>
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
