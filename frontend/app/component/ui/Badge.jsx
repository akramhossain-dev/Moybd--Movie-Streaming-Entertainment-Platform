import React from 'react';

/**
 * Reusable Badge component for movie metadata (HD, 4K, IMDb ratings, genres, NEW, etc.).
 */
export default function Badge({
  children,
  variant = 'subtle',
  size = 'sm',
  className = '',
  icon = null,
  ...props
}) {
  const baseStyles = 'inline-flex items-center font-medium tracking-wide border select-none';

  const variants = {
    quality: 'bg-primary/20 text-foreground border-purple-900/40 uppercase font-semibold backdrop-blur-sm',
    rating: 'bg-amber-500/10 text-rating border-amber-500/30 font-semibold',
    new: 'bg-primary/20 text-primary border-primary/40 font-bold uppercase',
    genre: 'bg-surface-elevated/80 text-foreground-secondary border-purple-900/40 hover:text-foreground',
    subtle: 'bg-surface/80 text-foreground-secondary border-purple-900/30',
    primary: 'bg-primary text-white border-primary-hover font-semibold',
    success: 'bg-success/15 text-success border-success/30 font-medium',
  };

  const sizes = {
    xs: 'px-1.5 py-0.5 text-[10px] rounded-sm gap-1',
    sm: 'px-2 py-0.5 text-xs rounded-md gap-1',
    md: 'px-2.5 py-1 text-xs rounded-md gap-1.5',
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
