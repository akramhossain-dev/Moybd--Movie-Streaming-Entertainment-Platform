'use client';

import React from 'react';
import Sidebar from '../Admin_Component/Sidebar';
import Nav from '../Admin_Component/Nav';
import ToastContainer from '../ui/Toast';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pl-16 sm:pl-64 transition-all duration-normal">
        <Nav />
        <main className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
