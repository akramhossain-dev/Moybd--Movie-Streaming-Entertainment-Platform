import React from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';
import Button from '../ui/Button';

/**
 * Reusable ErrorState component for API errors and network failures.
 */
export default function ErrorState({
  title = 'Something went wrong',
  message = 'Failed to load content. Please check your network connection and try again.',
  onRetry,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-xl bg-error/5 border border-error/20 my-6 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center mb-4">
        <FaExclamationTriangle className="text-2xl" />
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-foreground-muted max-w-md mb-6">{message}</p>

      {onRetry && (
        <Button
          variant="secondary"
          size="md"
          iconLeft={<FaRedo className="text-xs" />}
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
