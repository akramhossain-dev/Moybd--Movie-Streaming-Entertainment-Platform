'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '../component/layout/AuthLayout';
import Button from '../component/ui/Button';
import crypto from 'crypto';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaExclamationCircle,
} from 'react-icons/fa';

const decryptAES = (encrypted, secret, iv) => {
  const key = crypto.createHash('sha256').update(secret).digest();
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const AES_SECRET = process.env.NEXT_PUBLIC_AES_SECRET;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success && data.token) {
        try {
          const decryptedToken = JSON.parse(
            decryptAES(data.token.Data, AES_SECRET, data.token.iv)
          );

          if (decryptedToken.isLoggedIn === true) {
            if (rememberMe) {
              localStorage.setItem('isLoggedIn', 'true');
            } else {
              sessionStorage.setItem('isLoggedIn', 'true');
            }
            router.push('/');
          } else {
            setError('Login failed. Please verify your credentials.');
          }
        } catch (err) {
          setError('Unable to process login token response.');
        }
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Connection error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to access personalized recommendations & watchlists."
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {/* Error Alert Banner */}
        {error && (
          <div className="flex items-center gap-2.5 p-3.5 bg-danger/10 border border-danger/30 rounded-xl text-danger text-xs font-medium animate-in fade-in">
            <FaExclamationCircle className="text-sm shrink-0" />
            <span>{error}</span>
          </div>
        )}

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
              autoComplete="current-password"
              placeholder="Enter your password"
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-foreground-muted hover:text-foreground">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-border/60 bg-background accent-primary text-primary cursor-pointer"
            />
            <span>Remember me</span>
          </label>

          <Link
            href="/forget"
            className="font-medium text-primary hover:text-primary-hover transition-colors"
          >
            Forgot Password?
          </Link>
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
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-foreground-muted pt-3 border-t border-border/40">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="font-bold text-primary hover:text-primary-hover transition-colors ml-1"
          >
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}