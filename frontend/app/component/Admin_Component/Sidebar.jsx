'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaFilm,
  FaFileAlt,
  FaComments,
  FaUsers,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaShieldAlt,
} from 'react-icons/fa';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.clear();
    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    router.push('/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <FaTachometerAlt /> },
    { label: 'Add Movie', path: '/admin/addmovie', icon: <FaPlusCircle /> },
    { label: 'Movies List', path: '/admin/movie', icon: <FaFilm /> },
    { label: 'Draft Movies', path: '/admin/draft', icon: <FaFileAlt /> },
    { label: 'User Roles', path: '/admin/users', icon: <FaUsers /> },
    { label: 'Comments', path: '/admin/Comments', icon: <FaComments /> },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-surface border-r border-border/60 transition-all duration-normal flex flex-col justify-between ${
        isCollapsed ? 'w-16 sm:w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header */}
      <div>
        <div className="flex items-center justify-between h-16 px-4 border-b border-border/50">
          <Link href="/admin" className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-glow">
              <FaShieldAlt className="text-sm" />
            </div>
            {!isCollapsed && (
              <span className="font-black text-lg text-white tracking-wide truncate">
                Moybd <span className="text-primary text-xs">ADMIN</span>
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-foreground-muted hover:text-white hover:bg-surface-elevated transition-colors"
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <FaChevronRight className="text-xs" /> : <FaChevronLeft className="text-xs" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-glow'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-surface-elevated'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="text-sm shrink-0">{item.icon}</span>
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-3 border-t border-border/50">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-danger/90 hover:text-danger hover:bg-danger/10 transition-all ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <FaSignOutAlt className="text-sm shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
