import React from 'react';

/**
 * Reusable Badge component for movie metadata (HD, 4K, IMDb ratings, genres, NEW, etc.).
 * Explicit dark borders to completely remove white preflight outlines.
 */
export default function Badge({
  children,
  variant = 'subtle',
  size = 'sm',
  className = '',
  icon = null,
  ...props
}) {
  const baseStyles = 'inline-flex items-center font-medium tracking-wide select-none';

  const variants = {
    quality: 'bg-purple-950/80 text-foreground border border-purple-800/40 uppercase font-semibold',
    rating: 'bg-amber-500/10 text-rating border border-amber-500/30 font-semibold',
    new: 'bg-purple-950/90 text-primary border border-purple-800/50 font-bold uppercase',
    genre: 'bg-purple-950/60 text-foreground-secondary border border-purple-900/40 hover:text-foreground',
    subtle: 'bg-purple-950/60 text-foreground-secondary border border-purple-900/40',
    primary: 'bg-primary text-white border-none font-semibold',
    success: 'bg-success/15 text-success border border-success/30 font-medium',
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-[10px] rounded-full gap-1',
    sm: 'px-2.5 py-0.5 text-xs rounded-full gap-1',
    md: 'px-3 py-1 text-xs rounded-full gap-1.5',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant] || variants.subtle} ${sizes[size] || sizes.sm} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>}
      {children}
    </span>
  );
}
