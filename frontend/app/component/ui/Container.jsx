import React from 'react';

/**
 * Container component for consistent horizontal layout margins across screens.
 * Mobile: 16px (px-4)
 * Tablet: 24px (sm:px-6)
 * Desktop: 32-40px (lg:px-8 xl:px-10)
 * Max Width: 1440px
 */
export default function Container({
  children,
  className = '',
  as: Component = 'div',
  cleanPadding = false,
  ...props
}) {
  return (
    <Component
      className={`w-full mx-auto max-w-container ${
        cleanPadding ? '' : 'px-4 sm:px-6 lg:px-8 xl:px-10'
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
