'use client';

import React, { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../component/layout/AdminLayout';
import Button from '../../component/ui/Button';
import Badge from '../../component/ui/Badge';
import { toast } from '../../component/ui/Toast';
import { FaPlusCircle, FaSave, FaFilm, FaDownload } from 'react-icons/fa';

export default function AddMoviePage() {
  const [activeButtons, setActiveButtons] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.status) {
      toast.error('Please select a status (Draft or Publish) before submitting.');
      return;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/movie/post`,
        formData
      );
      toast.success('Title saved successfully to catalog!');
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error saving title:', error);
      toast.error('Failed to save title. Please check input fields.');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
              <FaPlusCircle className="text-primary" /> Add New Title
            </h1>
            <p className="text-xs text-foreground-muted">
              Add a new movie, series, or anime entry to the catalog.
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
                  placeholder="e.g. Dune: Part Two"
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
                  placeholder="e.g. dune-part-two-2024"
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

              {/* Download Links Selector */}
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
                    placeholder={`${res} download link URL`}
                    className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                ))}
              </div>
            </div>

            {/* Right Column Metadata Fields */}
            <div className="bg-surface rounded-2xl p-6 border border-purple-900/40 space-y-4 shadow-card">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wide border-b border-purple-900/30 pb-2">
                Metadata & Categories
              </h2>

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
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="2h 15m"
                    className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">
                    File Size
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="2.4 GB"
                    className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground-secondary">
                  YouTube Trailer Embed Link
                </label>
                <input
                  type="text"
                  name="youtubelink"
                  value={formData.youtubelink}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl p-2.5 outline-none"
                />
              </div>

              {/* Select Controls */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full bg-background border border-purple-900/40 text-foreground text-xs rounded-xl p-2.5 outline-none"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Bangla">Bangla</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">
                    Subtitles
                  </label>
                  <select
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    className="w-full bg-background border border-purple-900/40 text-foreground text-xs rounded-xl p-2.5 outline-none"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Bangla">Bangla</option>
                  </select>
                </div>
              </div>

              {/* Title Category & Category Radio Selectors */}
              <div className="space-y-3 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">
                    Title Category
                  </label>
                  <div className="flex gap-4 text-xs">
                    {['Movies', 'Series', 'Shows'].map((cat) => (
                      <label key={cat} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="titlecategory"
                          value={cat}
                          checked={formData.titlecategory === cat}
                          onChange={handleChange}
                          className="accent-primary"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">
                    Category Region / Universe
                  </label>
                  <div className="flex flex-wrap gap-3 text-xs">
                    {[
                      'Hollywood',
                      'Bollywood',
                      'South',
                      'Marvel Studio',
                      'Gujarati',
                      'TV Shows',
                      'Web Series',
                      'anime',
                    ].map((cat) => (
                      <label key={cat} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={cat}
                          checked={formData.category === cat}
                          onChange={handleChange}
                          className="accent-primary"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
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

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              iconLeft={<FaSave className="text-xs" />}
            >
              Save Title to Catalog
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
