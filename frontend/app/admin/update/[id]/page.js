'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/app/component/layout/AdminLayout';
import Button from '@/app/component/ui/Button';
import Badge from '@/app/component/ui/Badge';
import Skeleton from '@/app/component/feedback/Skeleton';
import ErrorState from '@/app/component/feedback/ErrorState';
import { toast } from '@/app/component/ui/Toast';
import {
  FaEdit,
  FaSave,
  FaDownload,
  FaArrowLeft,
  FaTv,
  FaFilm,
  FaPlus,
  FaTrash,
} from 'react-icons/fa';

export default function UpdateMoviePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [movieToUpdate, setMovieToUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeButtons, setActiveButtons] = useState(['720p', '1080p']);
  const [episodes, setEpisodes] = useState([]);
  const [zipDownloadLink, setZipDownloadLink] = useState({
    '480p': '',
    '720p': '',
    '1080p': '',
  });

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
          if (Array.isArray(data.movie.episodes)) {
            setEpisodes(data.movie.episodes);
          }
          if (data.movie.zipDownloadLink) {
            setZipDownloadLink(data.movie.zipDownloadLink);
          }
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

  const addEpisodeRow = () => {
    setEpisodes([
      ...episodes,
      {
        episodeNumber: `Episode ${episodes.length + 1}`,
        title: '',
        downloadlink: { '480p': '', '720p': '', '1080p': '' },
        watchonline: '',
      },
    ]);
  };

  const removeEpisodeRow = (index) => {
    setEpisodes(episodes.filter((_, idx) => idx !== index));
  };

  const handleEpisodeChange = (index, field, value) => {
    const updated = [...episodes];
    updated[index][field] = value;
    setEpisodes(updated);
  };

  const handleEpisodeDownloadChange = (index, res, value) => {
    const updated = [...episodes];
    if (!updated[index].downloadlink) {
      updated[index].downloadlink = { '480p': '', '720p': '', '1080p': '' };
    }
    updated[index].downloadlink[res] = value;
    setEpisodes(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSeries =
      updatedData.titlecategory === 'Series' ||
      updatedData.titlecategory === 'Shows';

    const payload = {
      ...updatedData,
      episodes: isSeries ? episodes : [],
      zipDownloadLink: isSeries ? zipDownloadLink : {},
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movie/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success('Title updated successfully!');
          router.push('/admin');
        } else {
          toast.error(`Failed to update: ${data.message || 'Unknown error'}`);
        }
      })
      .catch((err) => toast.error(`Error updating: ${err.message}`));
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

  const isSeries =
    updatedData.titlecategory === 'Series' || updatedData.titlecategory === 'Shows';

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
              <FaEdit className="text-primary" /> Update Title: {movieToUpdate.title}
            </h1>
            <p className="text-xs text-foreground-muted">
              Modify catalog entry metadata, download links, episode list, and status.
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
            <div className="bg-surface rounded-2xl p-6 border border-purple-900/40 space-y-4 shadow-card">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wide border-b border-purple-900/30 pb-2">
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
                  className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
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
                  className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">Backdrop URL</label>
                <input
                  type="text"
                  name="bgposter"
                  value={updatedData.bgposter || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">Poster Thumbnail URL</label>
                <input
                  type="text"
                  name="smposter"
                  value={updatedData.smposter || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={updatedData.description || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none resize-none"
                />
              </div>

              {/* Movie Download Links (Only for Movies) */}
              {!isSeries && (
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-semibold text-foreground-secondary flex items-center gap-1.5">
                    <FaDownload className="text-primary" /> Active Movie Download Resolutions
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
                            isActive ? 'bg-primary text-white' : 'bg-purple-950/70 text-foreground-muted'
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
                      className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column Metadata Fields */}
            <div className="bg-surface rounded-2xl p-6 border border-purple-900/40 space-y-4 shadow-card">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wide border-b border-purple-900/30 pb-2">
                Metadata & Settings
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">
                  Title Type (Movie vs Series)
                </label>
                <div className="flex gap-4 text-xs font-bold">
                  {['Movies', 'Series', 'Shows'].map((cat) => (
                    <label
                      key={cat}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer transition-all ${
                        updatedData.titlecategory === cat
                          ? 'bg-primary border-primary text-white shadow-glow'
                          : 'bg-purple-950/50 border-purple-900/40 text-foreground-secondary'
                      }`}
                    >
                      <input
                        type="radio"
                        name="titlecategory"
                        value={cat}
                        checked={updatedData.titlecategory === cat}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="flex items-center gap-1.5">
                        {cat === 'Movies' ? (
                          <>
                            <FaFilm className="text-xs text-primary" /> Movie
                          </>
                        ) : (
                          <>
                            <FaTv className="text-xs text-primary" /> Series / Show
                          </>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">Release Year</label>
                  <input
                    type="text"
                    name="year"
                    value={updatedData.year || ''}
                    onChange={handleChange}
                    className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">IMDb Rating</label>
                  <input
                    type="text"
                    name="rating"
                    value={updatedData.rating || ''}
                    onChange={handleChange}
                    className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">Duration / Episodes</label>
                  <input
                    type="text"
                    name="duration"
                    value={updatedData.duration || ''}
                    onChange={handleChange}
                    className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">File Size</label>
                  <input
                    type="text"
                    name="size"
                    value={updatedData.size || ''}
                    onChange={handleChange}
                    className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>
              </div>

              {/* Status Radio Buttons */}
              <div className="space-y-1.5 pt-2 border-t border-purple-900/30">
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

          {/* Series Episode & Zip Batch Manager (Only for Series & Shows) */}
          {isSeries && (
            <div className="bg-surface rounded-2xl p-6 border border-purple-900/40 space-y-6 shadow-modal">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <FaTv className="text-primary" /> Series Episodes & Zip Batch Download Manager
                  </h2>
                  <p className="text-xs text-foreground-muted">
                    Add individual episode download links (Ep 01, Ep 02... Ep 12) or full season Zip batch links.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  iconLeft={<FaPlus className="text-xs" />}
                  onClick={addEpisodeRow}
                >
                  Add Episode
                </Button>
              </div>

              {/* Full Season Zip Download Links */}
              <div className="bg-purple-950/40 p-4 rounded-xl border border-purple-900/40 space-y-3">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <FaDownload className="text-primary" /> Full Season Zip Batch Download Links
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="480p Full Zip URL"
                    value={zipDownloadLink['480p'] || ''}
                    onChange={(e) =>
                      setZipDownloadLink({ ...zipDownloadLink, '480p': e.target.value })
                    }
                    className="bg-background border border-purple-900/40 text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="720p Full Zip URL"
                    value={zipDownloadLink['720p'] || ''}
                    onChange={(e) =>
                      setZipDownloadLink({ ...zipDownloadLink, '720p': e.target.value })
                    }
                    className="bg-background border border-purple-900/40 text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="1080p Full Zip URL"
                    value={zipDownloadLink['1080p'] || ''}
                    onChange={(e) =>
                      setZipDownloadLink({ ...zipDownloadLink, '1080p': e.target.value })
                    }
                    className="bg-background border border-purple-900/40 text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>
              </div>

              {/* Dynamic Episode Rows */}
              <div className="space-y-4">
                {episodes.map((ep, idx) => (
                  <div
                    key={idx}
                    className="bg-background p-4 rounded-xl border border-purple-900/40 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        <input
                          type="text"
                          value={ep.episodeNumber || `Ep ${idx + 1}`}
                          onChange={(e) =>
                            handleEpisodeChange(idx, 'episodeNumber', e.target.value)
                          }
                          placeholder="e.g. Ep 01"
                          className="w-32 bg-surface border border-purple-900/40 text-foreground font-bold text-xs rounded-lg p-2 outline-none"
                        />
                        <input
                          type="text"
                          value={ep.title || ''}
                          onChange={(e) =>
                            handleEpisodeChange(idx, 'title', e.target.value)
                          }
                          placeholder="Episode Name (Optional)"
                          className="flex-1 bg-surface border border-purple-900/40 text-foreground text-xs rounded-lg p-2 outline-none"
                        />
                      </div>

                      {episodes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEpisodeRow(idx)}
                          className="text-error hover:bg-error/10 p-2 rounded-lg transition-colors text-xs"
                          aria-label="Remove Episode"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>

                    {/* Quality Links per Episode */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <input
                        type="text"
                        placeholder="480p Ep Link"
                        value={ep.downloadlink?.['480p'] || ''}
                        onChange={(e) =>
                          handleEpisodeDownloadChange(idx, '480p', e.target.value)
                        }
                        className="bg-surface border border-purple-900/40 text-foreground text-xs rounded-lg p-2 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="720p Ep Link"
                        value={ep.downloadlink?.['720p'] || ''}
                        onChange={(e) =>
                          handleEpisodeDownloadChange(idx, '720p', e.target.value)
                        }
                        className="bg-surface border border-purple-900/40 text-foreground text-xs rounded-lg p-2 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="1080p Ep Link"
                        value={ep.downloadlink?.['1080p'] || ''}
                        onChange={(e) =>
                          handleEpisodeDownloadChange(idx, '1080p', e.target.value)
                        }
                        className="bg-surface border border-purple-900/40 text-foreground text-xs rounded-lg p-2 outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
