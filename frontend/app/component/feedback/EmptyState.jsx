import React from 'react';
import { FaFilm } from 'react-icons/fa';

/**
 * Reusable EmptyState component for empty lists, search results, or missing data.
 */
export default function EmptyState({
  icon = <FaFilm className="text-4xl text-foreground-muted" />,
  title = 'No movies found',
  description = 'Try adjusting your filter, search, or genre selection to find what you are looking for.',
  action = null,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-xl bg-surface/40 border border-border/40 my-6 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mb-4 shadow-subtle">
        {icon}
      </div>
      
      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-foreground-muted max-w-md mb-6">{description}</p>
      
      {action && <div>{action}</div>}
    </div>
  );
}
