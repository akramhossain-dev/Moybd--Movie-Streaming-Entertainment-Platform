import React from 'react';

/**
 * Reusable IconButton component with mandatory accessibility aria-label.
 */
export default function IconButton({
  icon,
  'aria-label': ariaLabel,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full transition-all duration-fast select-none focus-visible:outline-none';

  const variants = {
    primary:
      'bg-primary hover:bg-primary-hover active:bg-primary-active text-white shadow-subtle hover:shadow-glow',
    secondary:
      'bg-surface-elevated hover:bg-surface text-foreground border border-border/60',
    ghost:
      'bg-transparent hover:bg-surface-elevated text-foreground-secondary hover:text-foreground',
    backdrop:
      'bg-overlay/80 backdrop-blur-md hover:bg-overlay text-white border border-white/10',
  };

  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.ghost} ${sizes[size] || sizes.md} ${disabledStyles} ${className}`}
      {...props}
    >
      <span className="inline-flex items-center justify-center shrink-0">{icon}</span>
    </button>
  );
}
