'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/app/component/layout/AdminLayout';
import Button from '@/app/component/ui/Button';
import Badge from '@/app/component/ui/Badge';
import Skeleton from '@/app/component/feedback/Skeleton';
import ErrorState from '@/app/component/feedback/ErrorState';
import { FaEdit, FaSave, FaDownload, FaArrowLeft } from 'react-icons/fa';

export default function UpdateMoviePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [movieToUpdate, setMovieToUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeButtons, setActiveButtons] = useState(['720p', '1080p']);
  const [updatedData, setUpdatedData] = useState({
    title: '',
    slug: '',
    bgposter: '',
    smposter: '',
    titlecategory: '',
    description: '',
    rating: '',
    duration: '',
    year: '',
    genre: '',
    language: '',
    subtitle: '',
    size: '',
    quality: '',
    youtubelink: '',
    category: '',
    watchonline: '',
    downloadlink: {
      '360p': '',
      '480p': '',
      '720p': '',
      '1080p': '',
      '4k': '',
    },
    status: '',
  });

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movie/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.movie) {
          setMovieToUpdate(data.movie);
          setUpdatedData(data.movie);
        } else {
          setError('Failed to fetch movie data');
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonClick = (resolution) => {
    setActiveButtons((prev) =>
      prev.includes(resolution)
        ? prev.filter((b) => b !== resolution)
        : [...prev, resolution]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movie/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Title updated successfully!');
          router.push('/admin');
        } else {
          alert(`Failed to update: ${data.message || 'Unknown error'}`);
        }
      })
      .catch((err) => alert(`Error updating: ${err.message}`));
  };

  if (loading) {
    return (
      <AdminLayout>
        <Skeleton className="h-10 w-1/3 mb-6" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </AdminLayout>
    );
  }

  if (error || !movieToUpdate) {
    return (
      <AdminLayout>
        <ErrorState message={error || 'Title not found'} onRetry={() => router.push('/admin')} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
              <FaEdit className="text-primary" /> Update Title: {movieToUpdate.title}
            </h1>
            <p className="text-xs text-foreground-muted">
              Modify catalog entry metadata, download links, and status.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            iconLeft={<FaArrowLeft className="text-xs" />}
            onClick={() => router.push('/admin')}
          >
            Back to Dashboard
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column Form Fields */}
            <div className="bg-surface rounded-2xl p-6 border border-border/60 space-y-4 shadow-card">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wide border-b border-border/40 pb-2">
                Basic Information
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={updatedData.title || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">Slug</label>
                <input
                  type="text"
                  name="slug"
                  required
                  value={updatedData.slug || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">Backdrop URL</label>
                <input
                  type="text"
                  name="bgposter"
                  value={updatedData.bgposter || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">Poster Thumbnail URL</label>
                <input
                  type="text"
                  name="smposter"
                  value={updatedData.smposter || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={updatedData.description || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none resize-none"
                />
              </div>

              {/* Download Links */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-foreground-secondary flex items-center gap-1.5">
                  <FaDownload className="text-primary" /> Active Download Resolutions
                </label>

                <div className="flex flex-wrap gap-2">
                  {['360p', '480p', '720p', '1080p', '4k'].map((res) => {
                    const isActive = activeButtons.includes(res);
                    return (
                      <button
                        type="button"
                        key={res}
                        onClick={() => handleButtonClick(res)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          isActive ? 'bg-primary text-white' : 'bg-surface-elevated text-foreground-muted'
                        }`}
                      >
                        {isActive ? `Hide ${res}` : `+ ${res}`}
                      </button>
                    );
                  })}
                </div>

                {activeButtons.map((res) => (
                  <input
                    key={res}
                    type="text"
                    value={updatedData.downloadlink?.[res] || ''}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        downloadlink: {
                          ...(updatedData.downloadlink || {}),
                          [res]: e.target.value,
                        },
                      })
                    }
                    placeholder={`${res} download link URL`}
                    className="w-full bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                ))}
              </div>
            </div>

            {/* Right Column Metadata Fields */}
            <div className="bg-surface rounded-2xl p-6 border border-border/60 space-y-4 shadow-card">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wide border-b border-border/40 pb-2">
                Metadata & Settings
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">Release Year</label>
                  <input
                    type="text"
                    name="year"
                    value={updatedData.year || ''}
                    onChange={handleChange}
                    className="w-full bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">IMDb Rating</label>
                  <input
                    type="text"
                    name="rating"
                    value={updatedData.rating || ''}
                    onChange={handleChange}
                    className="w-full bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={updatedData.duration || ''}
                    onChange={handleChange}
                    className="w-full bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">File Size</label>
                  <input
                    type="text"
                    name="size"
                    value={updatedData.size || ''}
                    onChange={handleChange}
                    className="w-full bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">YouTube Trailer Link</label>
                <input
                  type="text"
                  name="youtubelink"
                  value={updatedData.youtubelink || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-border/60 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">Language</label>
                  <select
                    name="language"
                    value={updatedData.language || ''}
                    onChange={handleChange}
                    className="w-full bg-background border border-border/60 text-foreground text-xs rounded-xl p-2.5 outline-none"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Bangla">Bangla</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">Subtitles</label>
                  <select
                    name="subtitle"
                    value={updatedData.subtitle || ''}
                    onChange={handleChange}
                    className="w-full bg-background border border-border/60 text-foreground text-xs rounded-xl p-2.5 outline-none"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Bangla">Bangla</option>
                  </select>
                </div>
              </div>

              {/* Status Radio Buttons */}
              <div className="space-y-1.5 pt-2 border-t border-border/40">
                <label className="text-xs font-semibold text-foreground-secondary">Publication Status</label>
                <div className="flex gap-6 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Publish"
                      checked={updatedData.status === 'Publish'}
                      onChange={handleChange}
                      className="accent-primary"
                    />
                    <span className="font-bold text-success">Published</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Draft"
                      checked={updatedData.status === 'Draft'}
                      onChange={handleChange}
                      className="accent-primary"
                    />
                    <span className="font-bold text-warning">Draft</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" size="lg" onClick={() => router.push('/admin')}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              iconLeft={<FaSave className="text-xs" />}
            >
              Update Title Changes
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
