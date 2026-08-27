'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DeleteBtn from './deleteBtn';
import UpdateBtn from './UpdateBtn';
import Skeleton from '../feedback/Skeleton';
import ErrorState from '../feedback/ErrorState';
import Badge from '../ui/Badge';
import {
  FaFilm,
  FaUsers,
  FaComments,
  FaCheckCircle,
  FaFileAlt,
  FaPlus,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';

export default function Dashboard() {
  const [data, setData] = useState({
    MovieCount: 0,
    commentCount: 0,
    userCount: 0,
    publicMovieCount: 0,
    draftMovieCount: 0,
  });
  const [movies, setMovies] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`
        );
        if (!response.ok) throw new Error('Failed to fetch dashboard stats');
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          setError('Error fetching dashboard stats');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingData(false);
      }
    }

    fetchDashboardData();
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/publicmovies`
        );
        if (!response.ok) throw new Error('Failed to fetch movies');
        const result = await response.json();
        if (result.success && result.data) {
          setMovies(result.data.reverse());
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingMovies(false);
      }
    }

    fetchMovies();
  }, []);

  if (loadingData || loadingMovies) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-28 w-full rounded-2xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  }

  const statCards = [
    {
      title: 'Total Users',
      value: data.userCount,
      icon: <FaUsers className="text-primary" />,
    },
    {
      title: 'Total Movies',
      value: data.MovieCount,
      icon: <FaFilm className="text-primary" />,
    },
    {
      title: 'Published',
      value: data.publicMovieCount,
      icon: <FaCheckCircle className="text-success" />,
    },
    {
      title: 'Draft Movies',
      value: data.draftMovieCount,
      icon: <FaFileAlt className="text-warning" />,
    },
    {
      title: 'Comments',
      value: data.commentCount,
      icon: <FaComments className="text-info" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-surface rounded-2xl p-6 sm:p-8 border border-border/60 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <Badge variant="new" size="xs">
              ADMIN DASHBOARD OVERVIEW
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Platform Analytics & Control
            </h1>
            <p className="text-xs sm:text-sm text-foreground-muted">
              Manage content listings, draft approvals, registered users, and comment moderation.
            </p>
          </div>

          <Link
            href="/admin/addmovie"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-glow transition-all shrink-0"
          >
            <FaPlus /> Add New Title
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-surface rounded-xl p-4 border border-border/60 space-y-2 shadow-card"
          >
            <div className="flex items-center justify-between text-xs text-foreground-muted">
              <span className="font-semibold">{card.title}</span>
              <span className="p-1.5 bg-surface-elevated rounded-lg text-sm">
                {card.icon}
              </span>
            </div>
            <div className="text-2xl font-black text-white">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Published Content Data Table */}
      <div className="bg-surface rounded-2xl border border-border/60 shadow-card overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-border/40 pb-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <FaFilm className="text-primary" /> Published Catalog ({movies.length})
          </h2>

          <Link
            href="/admin/movie"
            className="text-xs font-bold text-primary hover:underline"
          >
            View All Movies →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/50 text-foreground-muted uppercase font-semibold">
                <th className="py-3 px-4">Poster & Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 text-foreground-secondary">
              {movies.slice(0, 8).map((m) => (
                <tr key={m._id} className="hover:bg-surface-elevated/50 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={m.smposter || m.bgposter}
                      alt={m.title}
                      className="w-8 h-12 object-cover rounded-md bg-surface-elevated shrink-0"
                    />
                    <span className="font-bold text-foreground line-clamp-1">
                      {m.title}
                    </span>
                  </td>
                  <td className="py-3 px-4">{m.category || 'N/A'}</td>
                  <td className="py-3 px-4 font-bold text-rating">★ {m.rating || 'N/A'}</td>
                  <td className="py-3 px-4">{m.year || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <Badge variant="quality" size="xs">
                      {m.status || 'Publish'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/update/${m._id}`}
                        className="p-1.5 bg-surface-elevated hover:bg-primary/20 text-foreground hover:text-primary rounded-lg text-xs transition-colors"
                        title="Edit Title"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
