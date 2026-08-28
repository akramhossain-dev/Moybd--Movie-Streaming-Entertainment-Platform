'use client';

import Sidebar from '../component/Admin_Component/Sidebar';
import Footer from '../component/Admin_Component/footer';
import Nav from '../component/Admin_Component/Nav';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import 'boxicons/css/boxicons.min.css';
export default function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  const verifySession = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user && (data.user.role === 'jmhub' || data.user.role === 'admin')) {
          setIsLoggedIn(true);
          setUserRole(data.user.role);
        }
      }
    } catch (err) {
      console.error('Session check error:', err);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    verifySession();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.user) {
        if (data.user.role === 'jmhub' || data.user.role === 'admin') {
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem('isLoggedIn', 'true');
          storage.setItem('role', data.user.role);
          if (data.user.id) storage.setItem('userId', data.user.id);
          if (data.user.name) storage.setItem('name', data.user.name);

          setIsLoggedIn(true);
          setUserRole(data.user.role);
          setError('');
          router.push('/admin');
        } else {
          setError('Access denied: Admin credentials required.');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="text-sm">Verifying access...</p>
      </div>
    );
  }

  if (!isLoggedIn || userRole !== 'jmhub') {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-black">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text">
              Admin Panel
            </h2>
            <p className="mt-2 text-gray-400">Enter your credentials to access the dashboard</p>
          </div>

          {/* Login Form */}
          <div className="p-8 bg-gray-900 shadow-2xl rounded-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <h2 className="text-2xl font-semibold text-center text-white">Login to Your Account</h2>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-white placeholder-gray-400 transition duration-200 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 text-white placeholder-gray-400 transition duration-200 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="w-4 h-4 text-purple-500 bg-gray-800 border-gray-700 rounded focus:ring-purple-500 focus:ring-offset-gray-900"
                  />
                  <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 font-medium text-white transition duration-200 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Sign In
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="flex items-center justify-center text-base text-gray-400 transition-colors duration-300 hover:text-red-500"
              >
                <i className="text-lg bx bx-left-arrow-alt"></i>
                Back to website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex">
        <Sidebar setIsLoggedIn={setIsLoggedIn} />
      </div>
      <Nav />
      <main className="min-h-[95vh]">
        {children}
      </main>
      <Footer />
    </>
  );
}