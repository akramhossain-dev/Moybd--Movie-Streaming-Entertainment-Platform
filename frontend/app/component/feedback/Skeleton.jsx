import React from 'react';

/**
 * Base Skeleton shimmer loader component.
 */
export default function Skeleton({
  className = '',
  width,
  height,
  rounded = 'rounded-md',
  ...props
}) {
  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={`bg-surface-elevated animate-shimmer ${rounded} ${className}`}
      style={style}
      aria-hidden="true"
      {...props}
    />
  );
}
