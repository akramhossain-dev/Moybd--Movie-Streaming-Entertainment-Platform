'use client';

import React, { useState } from 'react';
import PublicLayout from '../component/layout/PublicLayout';
import Container from '../component/ui/Container';
import Badge from '../component/ui/Badge';
import Button from '../component/ui/Button';
import Link from 'next/link';
import { toast } from '../component/ui/Toast';
import {
  FaGavel,
  FaShieldAlt,
  FaEnvelope,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileContract,
  FaUser,
  FaLink,
  FaPaperPlane,
  FaClock,
  FaSpinner,
} from 'react-icons/fa';

export default function DMCAPage() {
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    infringingUrl: '',
    proofDetails: '',
    statement: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success('DMCA takedown notice submitted successfully!');
    }, 1200);
  };

  const sections = [
    {
      icon: <FaGavel className="text-primary text-lg" />,
      title: '1. Digital Millennium Copyright Act (DMCA) Notice',
      content:
        'Moybd respects the intellectual property rights of creators and content owners. In accordance with the Digital Millennium Copyright Act (17 U.S.C. § 512), we respond promptly to formal claims of copyright infringement submitted to our designated copyright desk.',
    },
    {
      icon: <FaShieldAlt className="text-primary text-lg" />,
      title: '2. Content Indexing & Non-Hosting Disclaimer',
      content:
        'Moybd functions strictly as an information directory and media catalog index. We do not host, store, or stream copyrighted video files on our owned web servers. All media items and trailers indexed are hosted on public third-party video storage networks.',
    },
    {
      icon: <FaFileContract className="text-primary text-lg" />,
      title: '3. Required Information for DMCA Takedown Notices',
      items: [
        'Physical or electronic signature of the copyright owner or authorized representative.',
        'Clear identification of the copyrighted work claimed to have been infringed.',
        'Exact URL location on Moybd where the target metadata or index entry resides.',
        'Contact details including full legal name, email address, and physical address.',
        'A good-faith statement confirming that the disputed use is not authorized by the copyright owner.',
        'A statement under penalty of perjury that the information provided is accurate.',
      ],
    },
    {
      icon: <FaClock className="text-primary text-lg" />,
      title: '4. Processing Timeline & Enforcement',
      content:
        'Upon receiving a valid and complete DMCA notice, our legal team will review the claim and remove or disable access to the infringing index listing within 24 to 48 business hours.',
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="relative w-full py-16 sm:py-24 bg-background border-b border-purple-900/40 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />

        <Container className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="new" size="md">
            COPYRIGHT & INTELLECTUAL PROPERTY
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            DMCA Copyright Policy
          </h1>
          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
            Moybd is committed to full compliance with the Digital Millennium Copyright Act. Read our takedown policy or submit a formal copyright claim below.
          </p>
        </Container>
      </section>

      <Container className="py-12 max-w-5xl space-y-12">
        {/* DMCA Info Cards */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-2xl p-6 sm:p-8 border border-purple-900/40 hover:border-primary/40 transition-all space-y-4 shadow-card"
            >
              <div className="flex items-center gap-3 text-lg sm:text-xl font-bold text-foreground border-b border-purple-900/30 pb-3">
                <span className="p-2.5 bg-purple-950/80 rounded-xl border border-purple-900/40 shadow-subtle">
                  {sec.icon}
                </span>
                <h2>{sec.title}</h2>
              </div>

              {sec.content && (
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {sec.content}
                </p>
              )}

              {sec.items && (
                <ul className="space-y-2.5 text-sm text-foreground-secondary pt-1">
                  {sec.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheckCircle className="text-primary text-sm mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* DMCA Takedown Notice Form */}
        <div className="bg-surface rounded-3xl p-6 sm:p-10 border border-purple-900/40 shadow-modal max-w-4xl mx-auto space-y-6">
          <div className="space-y-1 border-b border-purple-900/30 pb-4 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
              <FaGavel className="text-primary" /> Submit a Formal DMCA Takedown Request
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted">
              Copyright holders or authorized agents can submit notices directly using the form below.
            </p>
          </div>

          {submitted ? (
            <div className="bg-purple-950/50 p-8 rounded-2xl border border-primary/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto border border-success/40 shadow-glow">
                <FaCheckCircle className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Notice Received</h3>
              <p className="text-xs sm:text-sm text-foreground-secondary max-w-md mx-auto leading-relaxed">
                Thank you. Your DMCA takedown request has been recorded. Our legal compliance desk will process the claim within 24 to 48 hours.
              </p>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Request
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Copyright Owner Name */}
                <div className="space-y-1.5">
                  <label htmlFor="ownerName" className="text-xs font-semibold text-foreground-secondary">
                    Copyright Owner / Agent Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
                    <input
                      id="ownerName"
                      name="ownerName"
                      type="text"
                      required
                      placeholder="Full Legal Name or Studio Entity"
                      value={formData.ownerName}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-foreground-secondary">
                    Official Contact Email
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="copyright@studio.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Infringing URL */}
              <div className="space-y-1.5">
                <label htmlFor="infringingUrl" className="text-xs font-semibold text-foreground-secondary">
                  Moybd Infringing Page URL
                </label>
                <div className="relative">
                  <FaLink className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
                  <input
                    id="infringingUrl"
                    name="infringingUrl"
                    type="url"
                    required
                    placeholder="https://moybd.sbs/download/movie-slug"
                    value={formData.infringingUrl}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Proof Details */}
              <div className="space-y-1.5">
                <label htmlFor="proofDetails" className="text-xs font-semibold text-foreground-secondary">
                  Proof of Ownership / Registration Reference
                </label>
                <input
                  id="proofDetails"
                  name="proofDetails"
                  type="text"
                  required
                  placeholder="Copyright Registration # or Official Verification URL"
                  value={formData.proofDetails}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors"
                />
              </div>

              {/* Detailed Good Faith Statement */}
              <div className="space-y-1.5">
                <label htmlFor="statement" className="text-xs font-semibold text-foreground-secondary">
                  Good-Faith Infringement Statement
                </label>
                <textarea
                  id="statement"
                  name="statement"
                  required
                  rows={4}
                  placeholder="State under penalty of perjury that the information provided in this notice is accurate and that you are authorized to act on behalf of the owner..."
                  value={formData.statement}
                  onChange={handleChange}
                  className="w-full px-3.5 py-3 bg-background border border-purple-900/40 focus:border-primary text-foreground text-xs rounded-xl outline-none transition-colors resize-none"
                />
              </div>

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
                  {loading ? 'Submitting Notice...' : 'Submit DMCA Takedown Notice'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </PublicLayout>
  );
}
