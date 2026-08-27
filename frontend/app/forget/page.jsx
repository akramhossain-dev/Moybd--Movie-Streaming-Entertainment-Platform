'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '../component/layout/AuthLayout';
import Button from '../component/ui/Button';
import {
  FaEnvelope,
  FaKey,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaExclamationCircle,
  FaCheckCircle,
} from 'react-icons/fa';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Handle email submission for reset code
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage('Reset code sent to your email.');
        setStep(2);
      } else {
        setError(result.message || 'Failed to send reset code.');
      }
    } catch (err) {
      console.error('Error sending reset code:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resetCode, newPassword }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage('Password successfully reset. You can now log in.');
        setStep(1);
        setEmail('');
        setResetCode('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(result.message || 'Failed to reset password.');
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={step === 1 ? 'Forgot Password?' : 'Reset Your Password'}
      subtitle={
        step === 1
          ? "No worries! Enter your email address and we'll send you reset instructions."
          : `Enter the code sent to your email and choose a new password.`
      }
    >
      {/* Alert Banners */}
      {error && (
        <div className="flex items-center gap-2.5 p-3.5 bg-danger/10 border border-danger/30 rounded-xl text-danger text-xs font-medium animate-in fade-in">
          <FaExclamationCircle className="text-sm shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="flex items-center gap-2.5 p-3.5 bg-success/10 border border-success/30 rounded-xl text-success text-xs font-medium animate-in fade-in">
          <FaCheckCircle className="text-sm shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {step === 1 ? (
        /* Step 1: Enter Email */
        <form onSubmit={handleEmailSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-foreground-secondary">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
              iconRight={!loading ? <FaArrowRight className="text-xs" /> : null}
            >
              {loading ? 'Sending Code...' : 'Send Reset Code'}
            </Button>
          </div>

          <p className="text-center text-xs text-foreground-muted pt-3 border-t border-border/40">
            Remembered your password?{' '}
            <Link
              href="/login"
              className="font-bold text-primary hover:text-primary-hover transition-colors ml-1"
            >
              Back to Sign In
            </Link>
          </p>
        </form>
      ) : (
        /* Step 2: Enter Reset Code & New Password */
        <form onSubmit={handlePasswordReset} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label htmlFor="resetCode" className="text-xs font-semibold text-foreground-secondary">
              Reset Code
            </label>
            <div className="relative">
              <FaKey className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
              <input
                id="resetCode"
                type="text"
                required
                placeholder="Enter reset code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors tracking-widest"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="newPassword" className="text-xs font-semibold text-foreground-secondary">
              New Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
              <input
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground text-xs focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="text-xs font-semibold text-foreground-secondary">
              Confirm New Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
              iconRight={!loading ? <FaArrowRight className="text-xs" /> : null}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
          </div>

          <p className="text-center text-xs text-foreground-muted pt-3 border-t border-border/40">
            <Link
              href="/login"
              className="font-bold text-primary hover:text-primary-hover transition-colors"
            >
              Back to Sign In
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
