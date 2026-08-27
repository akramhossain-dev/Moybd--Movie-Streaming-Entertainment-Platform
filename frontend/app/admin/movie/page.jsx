'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '../../component/layout/AdminLayout';
import Skeleton from '../../component/feedback/Skeleton';
import ErrorState from '../../component/feedback/ErrorState';
import EmptyState from '../../component/feedback/EmptyState';
import Badge from '../../component/ui/Badge';
import Button from '../../component/ui/Button';
import DeleteBtn from '../../component/Admin_Component/deleteBtn';
import { FaFilm, FaSearch, FaEdit, FaPlus } from 'react-icons/fa';

export default function AdminMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/publicmovies`
      );
      if (!response.ok) throw new Error('Failed to fetch movies catalog');
      const data = await response.json();
      if (data.success && data.data) {
        setMovies(data.data.reverse());
        setFilteredMovies(data.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMovies(movies);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredMovies(
        movies.filter(
          (m) =>
            m.title?.toLowerCase().includes(q) ||
            m.category?.toLowerCase().includes(q) ||
            m.year?.toString().includes(q)
        )
      );
    }
  }, [searchQuery, movies]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header & Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
                <FaFilm className="text-primary" /> Published Catalog
              </h1>
              <Badge variant="quality" size="xs">
                {filteredMovies.length} Titles
              </Badge>
            </div>
            <p className="text-xs text-foreground-muted">
              Browse, filter, edit, or delete published movies and series.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3.5 py-2 bg-surface border border-border/60 focus:border-primary text-foreground text-xs rounded-xl outline-none w-48 sm:w-64"
              />
            </div>

            <Link href="/admin/addmovie">
              <Button variant="primary" size="sm" iconLeft={<FaPlus className="text-xs" />}>
                Add Movie
              </Button>
            </Link>
          </div>
        </div>

        {/* Content Table */}
        {loading ? (
          <Skeleton className="h-64 w-full rounded-2xl" />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchMovies} />
        ) : filteredMovies.length > 0 ? (
          <div className="bg-surface rounded-2xl border border-border/60 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/50 text-foreground-muted uppercase font-semibold bg-surface-elevated/40">
                    <th className="py-3.5 px-4">Poster & Title</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Rating</th>
                    <th className="py-3.5 px-4">Year</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-foreground-secondary">
                  {filteredMovies.map((m) => (
                    <tr key={m._id} className="hover:bg-surface-elevated/50 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={m.smposter || m.bgposter}
                          alt={m.title}
                          className="w-9 h-13 object-cover rounded-md bg-surface-elevated shrink-0"
                        />
                        <div>
                          <div className="font-bold text-foreground line-clamp-1">{m.title}</div>
                          <div className="text-[10px] text-foreground-muted font-mono">{m.slug}</div>
                        </div>
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
                            className="p-2 bg-surface-elevated hover:bg-primary/20 text-foreground hover:text-primary rounded-lg text-xs transition-colors flex items-center gap-1 font-semibold"
                          >
                            <FaEdit /> Edit
                          </Link>
                          <DeleteBtn id={m._id} onDeleteSuccess={fetchMovies} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyState
            title="No published movies found"
            description="Try clearing your search query or add a new movie to the catalog."
          />
        )}
      </div>
    </AdminLayout>
  );
}
