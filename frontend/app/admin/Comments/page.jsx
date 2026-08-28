'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../component/layout/AdminLayout';
import Skeleton from '../../component/feedback/Skeleton';
import ErrorState from '../../component/feedback/ErrorState';
import EmptyState from '../../component/feedback/EmptyState';
import Badge from '../../component/ui/Badge';
import Button from '../../component/ui/Button';
import { FaComments, FaSearch, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 15;

  const fetchComments = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/all`
      );
      if (response.data && response.data.comments) {
        setComments(response.data.comments);
        setFilteredComments(response.data.comments);
      }
    } catch (err) {
      setError('Failed to fetch comments moderation list');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredComments(comments);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredComments(
        comments.filter(
          (c) =>
            c.name?.toLowerCase().includes(q) ||
            c.comment?.toLowerCase().includes(q) ||
            c.movieTitle?.toLowerCase().includes(q)
        )
      );
    }
    setCurrentPage(1);
  }, [searchQuery, comments]);

  const handleShowModal = (comment) => {
    setCommentToDelete(comment);
    setShowModal(true);
  };

  const handleDeleteComment = async () => {
    if (!commentToDelete) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/delete/${commentToDelete._id}`
      );
      setComments((prev) => prev.filter((c) => c._id !== commentToDelete._id));
    } catch (err) {
      setError('Failed to delete comment');
      console.error(err);
    } finally {
      setShowModal(false);
      setCommentToDelete(null);
    }
  };

  const handleStatusChange = async (commentId, newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/update/${commentId}`,
        { status: newStatus }
      );
      if (response.data.success) {
        setComments((prev) =>
          prev.map((c) => (c._id === commentId ? { ...c, status: newStatus } : c))
        );
      } else {
        setError('Failed to update comment status');
      }
    } catch (err) {
      setError('Failed to update comment status');
      console.error(err);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredComments.length / commentsPerPage) || 1;
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(indexOfFirstComment, indexOfLastComment);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
                <FaComments className="text-primary" /> Comment Moderation
              </h1>
              <Badge variant="subtle" size="xs">
                {filteredComments.length} Comments
              </Badge>
            </div>
            <p className="text-xs text-foreground-muted">
              Approve, unpublish, or delete user reviews and comments.
            </p>
          </div>

          <div className="relative">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
            <input
              type="text"
              placeholder="Search comments or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3.5 py-2 bg-surface border border-border/60 focus:border-primary text-foreground text-xs rounded-xl outline-none w-48 sm:w-64"
            />
          </div>
        </div>

        {/* Content Table */}
        {isLoading ? (
          <Skeleton className="h-64 w-full rounded-2xl" />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchComments} />
        ) : filteredComments.length > 0 ? (
          <div className="bg-surface rounded-2xl border border-border/60 shadow-card overflow-hidden space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/50 text-foreground-muted uppercase font-semibold bg-surface-elevated/40">
                    <th className="py-3.5 px-4">User</th>
                    <th className="py-3.5 px-4">Comment</th>
                    <th className="py-3.5 px-4">Movie Title</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-foreground-secondary">
                  {currentComments.map((c) => {
                    const isPublished = c.status === 'Publish';
                    return (
                      <tr key={c._id} className="hover:bg-surface-elevated/50 transition-colors">
                        <td className="py-3 px-4 font-bold text-foreground">
                          {c.name || 'Anonymous'}
                        </td>
                        <td className="py-3 px-4 max-w-xs truncate text-foreground-secondary">
                          &quot;{c.comment}&quot;
                        </td>
                        <td className="py-3 px-4 text-foreground font-medium">
                          {c.movieTitle || 'Movie'}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isPublished
                                ? 'bg-success/10 text-success border border-success/30'
                                : 'bg-warning/10 text-warning border border-warning/30'
                            }`}
                          >
                            {isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {isPublished ? (
                              <button
                                onClick={() => handleStatusChange(c._id, 'Draft')}
                                className="px-2.5 py-1.5 bg-warning/10 hover:bg-warning/20 text-warning rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                                title="Unpublish comment"
                              >
                                <FaTimesCircle className="text-[10px]" /> Unpublish
                              </button>
                            ) : (
                              <button
                                onClick={() => handleStatusChange(c._id, 'Publish')}
                                className="px-2.5 py-1.5 bg-success/10 hover:bg-success/20 text-success rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                                title="Approve & Publish comment"
                              >
                                <FaCheckCircle className="text-[10px]" /> Approve
                              </button>
                            )}

                            <button
                              onClick={() => handleShowModal(c)}
                              className="px-2.5 py-1.5 bg-danger/10 hover:bg-danger/20 text-danger rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                            >
                              <FaTrash className="text-[10px]" /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-border/40 text-xs text-foreground-muted">
                <span>
                  Showing {indexOfFirstComment + 1}–
                  {Math.min(indexOfLastComment, filteredComments.length)} of {filteredComments.length} comments
                </span>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Prev
                  </Button>
                  <span className="px-2 font-semibold text-foreground">
                    {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <EmptyState
            title="No comments found"
            description="All user reviews have been moderated."
          />
        )}
      </div>

      {/* Modal Confirmation */}
      {showModal && commentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface rounded-2xl p-6 border border-border/60 shadow-modal max-w-sm w-full space-y-4 text-center">
            <h3 className="text-lg font-bold text-foreground">Delete Comment</h3>
            <p className="text-xs text-foreground-muted">
              Are you sure you want to delete comment by <span className="text-white font-bold">{commentToDelete.name}</span>?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleDeleteComment}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}