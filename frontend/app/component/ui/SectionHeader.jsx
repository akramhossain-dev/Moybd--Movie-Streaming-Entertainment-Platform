import React from 'react';

/**
 * Reusable SectionHeader component for category rows, movie lists, and feature sections.
 */
export default function SectionHeader({
  title,
  subtitle,
  badge,
  action,
  headingLevel = 'h2',
  className = '',
}) {
  const HeadingComponent = headingLevel;

  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 ${className}`}>
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <HeadingComponent className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {title}
          </HeadingComponent>
          {badge && <div>{badge}</div>}
        </div>
        {subtitle && (
          <p className="text-sm text-foreground-muted">{subtitle}</p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
