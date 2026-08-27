'use client';

import React, { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../component/layout/AdminLayout';
import Button from '../../component/ui/Button';
import Badge from '../../component/ui/Badge';
import { toast } from '../../component/ui/Toast';
import {
  FaPlusCircle,
  FaSave,
  FaFilm,
  FaDownload,
  FaPlus,
  FaTrash,
  FaTv,
} from 'react-icons/fa';

export default function AddMoviePage() {
  const [activeButtons, setActiveButtons] = useState([]);
  const [episodes, setEpisodes] = useState([
    {
      episodeNumber: 'Episode 1',
      title: '',
      downloadlink: { '480p': '', '720p': '', '1080p': '' },
      watchonline: '',
    },
  ]);

  const [zipDownloadLink, setZipDownloadLink] = useState({
    '480p': '',
    '720p': '',
    '1080p': '',
  });

  const handleButtonClick = (resolution) => {
    setActiveButtons((prevState) =>
      prevState.includes(resolution)
        ? prevState.filter((item) => item !== resolution)
        : [...prevState, resolution]
    );
  };

  const initialFormData = {
    title: '',
    slug: '',
    bgposter: '',
    smposter: '',
    titlecategory: 'Movies',
    description: '',
    rating: '',
    duration: '',
    year: '',
    genre: '',
    language: 'English',
    subtitle: 'English',
    size: '',
    quality: '1080p WEB-DL',
    youtubelink: '',
    category: 'Hollywood',
    watchonline: '',
    downloadlink: {
      '360p': '',
      '480p': '',
      '720p': '',
      '1080p': '',
      '4k': '',
    },
    status: 'Publish',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    updated[index].downloadlink[res] = value;
    setEpisodes(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.status) {
      toast.error('Please select a status (Draft or Publish) before submitting.');
      return;
    }

    const payload = {
      ...formData,
      episodes: formData.titlecategory !== 'Movies' ? episodes : [],
      zipDownloadLink: formData.titlecategory !== 'Movies' ? zipDownloadLink : {},
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/movie/post`,
        payload
      );
      toast.success(`${formData.titlecategory} saved successfully to catalog!`);
      setFormData(initialFormData);
      setEpisodes([
        {
          episodeNumber: 'Episode 1',
          title: '',
          downloadlink: { '480p': '', '720p': '', '1080p': '' },
          watchonline: '',
        },
      ]);
    } catch (error) {
      console.error('Error saving title:', error);
      toast.error('Failed to save title. Please check input fields.');
    }
  };

  const isSeries = formData.titlecategory === 'Series' || formData.titlecategory === 'Shows';

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
              <FaPlusCircle className="text-primary" /> Add New {formData.titlecategory || 'Title'}
            </h1>
            <p className="text-xs text-foreground-muted">
              Add a new movie, series episode pack, or anime entry to the catalog.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column Form Fields */}
            <div className="bg-surface rounded-2xl p-6 border border-purple-900/40 space-y-4 shadow-card">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wide border-b border-purple-900/30 pb-2">
                Basic Information
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={isSeries ? "e.g. Stranger Things (Season 1)" : "e.g. Dune: Part Two"}
                  className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">
                  Slug (URL Parameter)
                </label>
                <input
                  type="text"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="e.g. stranger-things-season-1"
                  className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">
                  Background Poster URL
                </label>
                <input
                  type="text"
                  name="bgposter"
                  value={formData.bgposter}
                  onChange={handleChange}
                  placeholder="https://image-url.com/backdrop.jpg"
                  className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">
                  Main Thumbnail Poster URL
                </label>
                <input
                  type="text"
                  name="smposter"
                  value={formData.smposter}
                  onChange={handleChange}
                  placeholder="https://image-url.com/poster.jpg"
                  className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">
                  Description / Storyline
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief synopsis..."
                  className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none resize-none"
                />
              </div>

              {/* Movie Download Links (Only for Movies) */}
              {!isSeries && (
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-semibold text-foreground-secondary flex items-center gap-1.5">
                    <FaDownload className="text-primary" /> Movie Quality Download Links
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
                            isActive
                              ? 'bg-primary text-white'
                              : 'bg-purple-950/70 border border-purple-900/40 text-foreground-muted hover:text-foreground'
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
                      value={formData.downloadlink[res] || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          downloadlink: {
                            ...formData.downloadlink,
                            [res]: e.target.value,
                          },
                        })
                      }
                      placeholder={`${res} direct download link URL`}
                      className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column Metadata Fields */}
            <div className="bg-surface rounded-2xl p-6 border border-purple-900/40 space-y-4 shadow-card">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wide border-b border-purple-900/30 pb-2">
                Metadata & Categories
              </h2>

              {/* Title Category Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">
                  Title Type (Movie vs Series)
                </label>
                <div className="flex gap-4 text-xs font-bold">
                  {['Movies', 'Series', 'Shows'].map((cat) => (
                    <label
                      key={cat}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer transition-all ${
                        formData.titlecategory === cat
                          ? 'bg-primary border-primary text-white shadow-glow'
                          : 'bg-purple-950/50 border-purple-900/40 text-foreground-secondary'
                      }`}
                    >
                      <input
                        type="radio"
                        name="titlecategory"
                        value={cat}
                        checked={formData.titlecategory === cat}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span>{cat === 'Movies' ? '🎬 Movie' : '📺 Series / Show'}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">
                    Release Year
                  </label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2024"
                    className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">
                    IMDb Rating
                  </label>
                  <input
                    type="text"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="8.7"
                    className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">
                    Duration / Episodes Count
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder={isSeries ? "12 Episodes" : "2h 15m"}
                    className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">
                    Total File Size
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="4.8 GB"
                    className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>
              </div>

              {/* Status Selector */}
              <div className="space-y-1.5 pt-2 border-t border-purple-900/30">
                <label className="text-xs font-semibold text-foreground-secondary">
                  Publication Status
                </label>
                <div className="flex gap-6 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Publish"
                      checked={formData.status === 'Publish'}
                      onChange={handleChange}
                      className="accent-primary"
                    />
                    <span className="font-bold text-success">Publish Immediately</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Draft"
                      checked={formData.status === 'Draft'}
                      onChange={handleChange}
                      className="accent-primary"
                    />
                    <span className="font-bold text-warning">Save as Draft</span>
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
                          value={ep.episodeNumber}
                          onChange={(e) =>
                            handleEpisodeChange(idx, 'episodeNumber', e.target.value)
                          }
                          placeholder="e.g. Ep 01"
                          className="w-32 bg-surface border border-purple-900/40 text-foreground font-bold text-xs rounded-lg p-2 outline-none"
                        />
                        <input
                          type="text"
                          value={ep.title}
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
                        value={ep.downloadlink['480p'] || ''}
                        onChange={(e) =>
                          handleEpisodeDownloadChange(idx, '480p', e.target.value)
                        }
                        className="bg-surface border border-purple-900/40 text-foreground text-xs rounded-lg p-2 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="720p Ep Link"
                        value={ep.downloadlink['720p'] || ''}
                        onChange={(e) =>
                          handleEpisodeDownloadChange(idx, '720p', e.target.value)
                        }
                        className="bg-surface border border-purple-900/40 text-foreground text-xs rounded-lg p-2 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="1080p Ep Link"
                        value={ep.downloadlink['1080p'] || ''}
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

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              iconLeft={<FaSave className="text-xs" />}
            >
              Save {formData.titlecategory || 'Title'} to Catalog
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
