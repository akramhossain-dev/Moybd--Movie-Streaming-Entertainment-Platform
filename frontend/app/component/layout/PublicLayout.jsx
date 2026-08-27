'use client';

import React from 'react';
import Navbar from '../Navber';
import Footer from '../footer';

/**
 * Reusable PublicLayout shell for all public user-facing pages.
 * Ensures consistent viewport height, sticky navbar, flex-1 main content, and footer.
 */
export default function PublicLayout({ children, className = '' }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Sticky Navbar (z-40) */}
      <Navbar />

      {/* Main Content Area (z-0) */}
      <main className={`flex-1 w-full ${className}`}>
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
