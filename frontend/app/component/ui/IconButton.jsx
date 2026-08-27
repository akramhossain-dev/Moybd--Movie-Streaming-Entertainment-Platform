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
      'bg-primary hover:bg-primary-hover active:bg-primary-active text-white shadow-glow hover:scale-105',
    secondary:
      'bg-purple-950/80 hover:bg-primary/20 text-white border border-primary/50 shadow-subtle',
    ghost:
      'bg-purple-950/40 hover:bg-purple-900/60 text-purple-200 hover:text-white',
    backdrop:
      'bg-purple-950/90 hover:bg-primary text-white border border-primary/50 shadow-glow hover:scale-105',
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
