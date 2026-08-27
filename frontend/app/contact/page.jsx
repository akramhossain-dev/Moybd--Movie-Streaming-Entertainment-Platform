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
} from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

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
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatus({
          type: 'success',
          message: 'Your message has been sent successfully! We will get back to you shortly.',
        });
        toast.success('Your message has been sent successfully!');
      } else {
        const errorMsg = data.message || 'Failed to send your message. Please try again.';
        setStatus({
          type: 'error',
          message: errorMsg,
        });
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      const errMsg = 'Something went wrong. Please try again later.';
      setStatus({
        type: 'error',
        message: errMsg,
      });
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative w-full py-16 sm:py-20 bg-background border-b border-purple-900/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        <Container className="relative z-10 text-center space-y-4 max-w-3xl">
          <Badge variant="new" size="md">
            CONTACT SUPPORT
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            We'd Love to Hear From You
          </h1>
          <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
            Have questions, feedback, or need technical assistance with your streaming experience? Reach out to our support team anytime.
          </p>
        </Container>
      </section>

      <Container className="py-12 space-y-12 max-w-5xl">
        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface rounded-2xl p-6 border border-purple-900/40 text-center space-y-3 shadow-card hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
              <FaPhoneAlt className="text-lg" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Phone Support</h3>
            <p className="text-xs text-foreground-muted">+880 9638 554567</p>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-purple-900/40 text-center space-y-3 shadow-card hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
              <FaEnvelope className="text-lg" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Email Support</h3>
            <p className="text-xs text-foreground-muted">support@movieapp.com</p>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-purple-900/40 text-center space-y-3 shadow-card hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
              <FaMapMarkerAlt className="text-lg" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Location</h3>
            <p className="text-xs text-foreground-muted">Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Contact Form Container */}
        <div className="bg-surface rounded-2xl p-6 sm:p-10 border border-purple-900/40 shadow-modal space-y-6">
          <div className="space-y-1 border-b border-purple-900/30 pb-4">
            <h2 className="text-2xl font-bold text-foreground">Send Us a Message</h2>
            <p className="text-xs sm:text-sm text-foreground-muted">
              Fill out the form below and our team will respond within 24 hours.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name Input */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-semibold text-foreground-secondary">
                  Your Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
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
                Subject
              </label>
              <div className="relative">
                <FaTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-semibold text-foreground-secondary">
                Message
              </label>
              <div className="relative">
                <FaCommentDots className="absolute left-3.5 top-3.5 text-foreground-muted text-xs" />
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Type your message here..."
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
                className="w-full"
                disabled={loading}
                iconLeft={<FaPaperPlane className="text-xs" />}
              >
                {loading ? 'Sending Message...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </PublicLayout>
  );
}
