import React from 'react';

/**
 * Reusable Button component adhering to Moybd design tokens.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-fast select-none focus-visible:outline-none';

  const variants = {
    primary:
      'bg-primary hover:bg-primary-hover active:bg-primary-active text-white shadow-subtle hover:shadow-glow',
    secondary:
      'bg-surface-elevated hover:bg-surface active:bg-surface-elevated text-foreground border border-border/80',
    ghost:
      'bg-transparent hover:bg-surface-elevated active:bg-surface text-foreground-secondary hover:text-foreground',
    outline:
      'bg-transparent border border-border hover:border-primary text-foreground hover:text-primary',
    danger:
      'bg-error hover:bg-red-600 text-white shadow-subtle',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-md gap-1.5 h-8',
    md: 'px-4 py-2 text-sm rounded-lg gap-2 h-10',
    lg: 'px-6 py-3 text-base rounded-xl gap-2.5 h-12',
  };

  const disabledStyles = disabled || isLoading ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${disabledStyles} ${widthStyles} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" role="status" aria-label="Loading..." />
      ) : iconLeft ? (
        <span className="inline-flex shrink-0 items-center justify-center">{iconLeft}</span>
      ) : null}
      
      {children}

      {!isLoading && iconRight && (
        <span className="inline-flex shrink-0 items-center justify-center">{iconRight}</span>
      )}
    </button>
  );
}
