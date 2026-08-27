'use client';

import React from 'react';

export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className={`relative ${sizes[size] || sizes.md} ${className}`}>
      <div className="absolute inset-0 border-primary/20 rounded-full border-solid" />
      <div className="absolute inset-0 border-transparent border-t-primary rounded-full animate-spin border-solid" />
    </div>
  );
}

export default function Loading({ message = 'Loading cinematic experience...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 bg-background text-foreground">
      <LoadingSpinner size="lg" />
      <div className="mt-6 space-y-1 text-center">
        <h4 className="text-sm font-bold tracking-widest text-primary uppercase animate-pulse">
          MOYBD
        </h4>
        <p className="text-xs text-foreground-muted tracking-wider">
          {message}
        </p>
      </div>
    </div>
  );
}
