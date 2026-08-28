'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '../component/layout/AuthLayout';
import Button from '../component/ui/Button';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaKey,
  FaExclamationCircle,
  FaCheckCircle,
} from 'react-icons/fa';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const userData = { name, email, password };

    try {
      setIsSubmitting(true);
      setError('');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStep(2);
        setSuccessMsg(
          'Registration successful! Please check your email for the verification code.'
        );
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError('');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, verificationCode }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg('Account verified successfully! Redirecting...');
        setTimeout(() => router.push('/'), 1500);
      } else {
        setError(data.message || 'Verification failed.');
      }
    } catch (err) {
      console.error('Error during verification:', err);
      setError('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title={step === 1 ? 'Create Your Account' : 'Verify Your Email'}
      subtitle={
        step === 1
          ? 'Sign up to explore and rate your favorite movies, series, and anime.'
          : `Enter the verification code sent to ${email}.`
      }
    >
      {/* Alert Banners */}
      {error && (
        <div className="flex items-center gap-2.5 p-3.5 bg-danger/10 border border-danger/30 rounded-xl text-danger text-xs font-medium animate-in fade-in">
          <FaExclamationCircle className="text-sm shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2.5 p-3.5 bg-success/10 border border-success/30 rounded-xl text-success text-xs font-medium animate-in fade-in">
          <FaCheckCircle className="text-sm shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-semibold text-foreground-secondary">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors"
              />
            </div>
          </div>

          {/* Email Field */}
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

          {/* Password Field */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-semibold text-foreground-secondary">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Confirm Password Field */}
          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="text-xs font-semibold text-foreground-secondary">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
              iconRight={!isSubmitting ? <FaArrowRight className="text-xs" /> : null}
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </div>

          {/* Footer Link */}
          <p className="text-center text-xs text-foreground-muted pt-3 border-t border-border/40">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-bold text-primary hover:text-primary-hover transition-colors ml-1"
            >
              Sign in
            </Link>
          </p>
        </form>
      ) : (
        /* Step 2: Verification Code Form */
        <form onSubmit={handleVerification} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label htmlFor="code" className="text-xs font-semibold text-foreground-secondary">
              Verification Code
            </label>
            <div className="relative">
              <FaKey className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
              <input
                id="code"
                type="text"
                required
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors tracking-widest"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
              iconRight={!isSubmitting ? <FaArrowRight className="text-xs" /> : null}
            >
              {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
            </Button>
          </div>

          <p className="text-center text-xs text-foreground-muted pt-3 border-t border-border/40">
            Didn&apos;t receive code?{' '}
            <button
              type="button"
              onClick={() => setStep(1)}
              className="font-bold text-primary hover:text-primary-hover transition-colors ml-1"
            >
              Resend code
            </button>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
