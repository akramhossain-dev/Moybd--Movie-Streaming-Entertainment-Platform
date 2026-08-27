'use client';

import React, { useState, useEffect } from 'react';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from 'react-icons/fa';

const TOAST_EVENT = 'moybd_show_toast';

/**
 * Trigger a toast notification from anywhere in client-side JS/React
 * @param {string} message - Toast message text
 * @param {'success' | 'error' | 'info'} type - Toast type variant
 */
export function showToast(message, type = 'success') {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(TOAST_EVENT, { detail: { message, type, id: Date.now() } })
  );
}

export const toast = {
  success: (msg) => showToast(msg, 'success'),
  error: (msg) => showToast(msg, 'error'),
  info: (msg) => showToast(msg, 'info'),
};

/**
 * Global Toast Container component rendered in Layout
 */
export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (e) => {
      const newToast = e.detail;
      setToasts((prev) => [...prev, newToast]);

      // Auto dismiss after 3.5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3500);
    };

    window.addEventListener(TOAST_EVENT, handleToast);
    return () => window.removeEventListener(TOAST_EVENT, handleToast);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => {
        const isSuccess = t.type === 'success';
        const isError = t.type === 'error';

        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-2xl border shadow-modal backdrop-blur-xl animate-in slide-in-from-top-3 fade-in duration-300 ${
              isSuccess
                ? 'bg-surface-elevated/95 border-success/40 text-foreground'
                : isError
                ? 'bg-surface-elevated/95 border-error/40 text-foreground'
                : 'bg-surface-elevated/95 border-primary/50 text-foreground'
            }`}
          >
            <div className="shrink-0 text-lg">
              {isSuccess ? (
                <FaCheckCircle className="text-success" />
              ) : isError ? (
                <FaExclamationCircle className="text-error" />
              ) : (
                <FaInfoCircle className="text-primary" />
              )}
            </div>

            <div className="flex-1 text-xs sm:text-sm font-semibold leading-snug">
              {t.message}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="shrink-0 p-1 text-foreground-muted hover:text-foreground transition-colors"
              aria-label="Dismiss toast"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
