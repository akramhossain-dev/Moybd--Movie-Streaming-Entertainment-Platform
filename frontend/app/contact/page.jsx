'use client';

import React, { useState } from 'react';
import PublicLayout from '../component/layout/PublicLayout';
import Container from '../component/ui/Container';
import Button from '../component/ui/Button';
import Badge from '../component/ui/Badge';
import { toast } from '../component/ui/Toast';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaUser,
  FaTag,
  FaCommentDots,
  FaCheckCircle,
  FaExclamationCircle,
  FaClock,
  FaQuestionCircle,
  FaShieldAlt,
  FaSpinner,
  FaFilm,
  FaBug,
  FaComments,
} from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'General Feedback',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const CATEGORIES = [
    { label: 'Request Title', icon: <FaFilm className="text-xs" /> },
    { label: 'Report Bug', icon: <FaBug className="text-xs" /> },
    { label: 'General Feedback', icon: <FaComments className="text-xs" /> },
    { label: 'Security Issue', icon: <FaShieldAlt className="text-xs" /> },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setFormData({ name: '', email: '', subject: '', category: 'General Feedback', message: '' });
        setStatus({
          type: 'success',
          message: 'Your message has been sent successfully! Our team will respond shortly.',
        });
        toast.success('Your message has been sent successfully!');
      } else {
        const errorMsg = data.message || 'Failed to send your message. Please try again.';
        setStatus({ type: 'error', message: errorMsg });
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Contact submit error:', error);
      const errMsg = 'Something went wrong. Please try again later.';
      setStatus({ type: 'error', message: errMsg });
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="relative w-full py-16 sm:py-24 bg-background border-b border-purple-900/40 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />

        <Container className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Get in Touch with Moybd Team
          </h1>
          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
            Have a title request, encountered a technical bug, or need help with streaming downloads? We're here 24/7 to assist you.
          </p>
        </Container>
      </section>

      <Container className="py-12 max-w-6xl space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Info Cards & FAQ */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Cards Grid */}
            <div className="space-y-4">
              <div className="bg-surface rounded-2xl p-5 border border-purple-900/40 flex items-center gap-4 shadow-card hover:border-primary/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-purple-950/80 border border-primary/40 flex items-center justify-center text-primary shrink-0 shadow-glow">
                  <FaEnvelope className="text-lg" />
                </div>
                <div>
                  <span className="text-xs text-foreground-muted font-medium">Email Desk</span>
                  <h4 className="text-sm font-bold text-foreground">support@moybd.sbs</h4>
                </div>
              </div>

              <div className="bg-surface rounded-2xl p-5 border border-purple-900/40 flex items-center gap-4 shadow-card hover:border-primary/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-purple-950/80 border border-primary/40 flex items-center justify-center text-primary shrink-0 shadow-glow">
                  <FaPhoneAlt className="text-lg" />
                </div>
                <div>
                  <span className="text-xs text-foreground-muted font-medium">Hotline Support</span>
                  <h4 className="text-sm font-bold text-foreground">+880 9638 554567</h4>
                </div>
              </div>

              <div className="bg-surface rounded-2xl p-5 border border-purple-900/40 flex items-center gap-4 shadow-card hover:border-primary/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-purple-950/80 border border-primary/40 flex items-center justify-center text-primary shrink-0 shadow-glow">
                  <FaClock className="text-lg" />
                </div>
                <div>
                  <span className="text-xs text-foreground-muted font-medium">Response Time</span>
                  <h4 className="text-sm font-bold text-foreground">Under 24 Hours Guaranteed</h4>
                </div>
              </div>

              <div className="bg-surface rounded-2xl p-5 border border-purple-900/40 flex items-center gap-4 shadow-card hover:border-primary/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-purple-950/80 border border-primary/40 flex items-center justify-center text-primary shrink-0 shadow-glow">
                  <FaMapMarkerAlt className="text-lg" />
                </div>
                <div>
                  <span className="text-xs text-foreground-muted font-medium">Location</span>
                  <h4 className="text-sm font-bold text-foreground">Dhaka, Bangladesh</h4>
                </div>
              </div>
            </div>

            {/* Quick Helper Box */}
            <div className="bg-purple-950/40 rounded-2xl p-6 border border-purple-900/50 space-y-3 shadow-card">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <FaQuestionCircle className="text-primary" /> Looking for Instant Answers?
              </h3>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                Check our <a href="/privacy-policy" className="text-primary hover:underline font-semibold">Privacy Policy</a> or <a href="/Terms-&-Conditions" className="text-primary hover:underline font-semibold">Terms of Service</a> for common technical questions and link security policies.
              </p>
            </div>
          </div>

          {/* Right Column: High-Density Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface rounded-3xl p-6 sm:p-10 border border-purple-900/40 shadow-modal space-y-6">
              <div className="space-y-1 border-b border-purple-900/30 pb-4">
                <h2 className="text-2xl font-bold text-foreground">Send Us a Direct Message</h2>
                <p className="text-xs sm:text-sm text-foreground-muted">
                  Fill in the information below and our support team will respond to your inbox.
                </p>
              </div>

              {/* Status Alert Banner */}
              {status.message && (
                <div
                  className={`flex items-center gap-2.5 p-4 rounded-xl text-xs font-medium border animate-in fade-in ${
                    status.type === 'success'
                      ? 'bg-success/10 border-success/30 text-success'
                      : 'bg-error/10 border-error/30 text-error'
                  }`}
                >
                  {status.type === 'success' ? (
                    <FaCheckCircle className="text-sm shrink-0" />
                  ) : (
                    <FaExclamationCircle className="text-sm shrink-0" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Category Selection Pills */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground-secondary block">
                    Inquiry Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => {
                      const isSelected = formData.category === cat.label;
                      return (
                        <button
                          key={cat.label}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, category: cat.label }))}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-glow'
                              : 'bg-background text-foreground-secondary border-purple-900/40 hover:border-primary/50'
                          }`}
                        >
                          {cat.icon}
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-foreground-secondary">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Akram Hossain"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3.5 py-2.5 bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-foreground-secondary">
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3.5 py-2.5 bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-foreground-secondary">
                    Subject Line
                  </label>
                  <div className="relative">
                    <FaTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="Brief summary of your message..."
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-foreground-secondary">
                    Message Details
                  </label>
                  <div className="relative">
                    <FaCommentDots className="absolute left-3.5 top-3.5 text-foreground-muted text-xs" />
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Provide full details of your request or message..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3.5 py-3 bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    disabled={loading}
                    iconLeft={
                      loading ? (
                        <FaSpinner className="animate-spin text-xs" />
                      ) : (
                        <FaPaperPlane className="text-xs" />
                      )
                    }
                  >
                    {loading ? 'Sending Message...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </PublicLayout>
  );
}
