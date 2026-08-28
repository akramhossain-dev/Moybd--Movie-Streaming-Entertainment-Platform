'use client';

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Button from './ui/Button';
import Container from './ui/Container';
import { FaCommentAlt, FaUser, FaEdit, FaTrash, FaPaperPlane } from 'react-icons/fa';

function Comments({ postId, commentId, title }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  useEffect(() => {
    const loggedIn =
      Cookies.get('isLoggedIn') === 'true' ||
      sessionStorage.getItem('isLoggedIn') === 'true';
    const userIdFromStorage =
      Cookies.get('userId') || sessionStorage.getItem('userId');
    const nameFromStorage =
      Cookies.get('name') || sessionStorage.getItem('name');
    setIsLoggedIn(loggedIn);
    setUserId(userIdFromStorage);
    setName(nameFromStorage);
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/comments/published`
        );
        const data = await response.json();
        if (response.ok && data.comments) {
          const filteredComments = data.comments.filter((comment) =>
            commentId?.includes(comment._id)
          );
          setComments(filteredComments);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (commentId && commentId.length > 0) {
      fetchComments();
    }
  }, [commentId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in to post a comment.');
      return;
    }

    if (!commentText.trim()) return;

    try {
      const payload = {
        postId,
        userId,
        title,
        commentName: name || 'User',
        comment: commentText,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/new`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setCommentText('');
        setComments((prev) => [...prev, data.comment]);
      } else {
        alert(`Failed to post comment: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleEditComment = (comment) => {
    setEditCommentId(comment._id);
    setEditCommentText(comment.comment);
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/update/${editCommentId}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ comment: editCommentText }),
        }
      );

      const data = await response.json();
      if (response.ok && data.success) {
        setComments((prev) =>
          prev.map((c) =>
            c._id === editCommentId ? { ...c, comment: editCommentText } : c
          )
        );
        setEditCommentId(null);
        setEditCommentText('');
      } else {
        alert(`Failed to update comment: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (cId) => {
    if (!isLoggedIn) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/delete/${cId}`,
        { method: 'DELETE', credentials: 'include' }
      );

      const data = await response.json();
      if (response.ok && data.success) {
        setComments((prev) => prev.filter((c) => c._id !== cId));
      } else {
        alert(`Failed to delete comment: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <section className="space-y-6 pt-6">
      <div className="flex items-center gap-3 border-b border-border/50 pb-4">
        <FaCommentAlt className="text-primary text-xl" />
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          User Reviews & Discussion
        </h2>
        <span className="text-xs text-foreground-muted bg-surface-elevated px-2.5 py-0.5 rounded-full font-medium">
          {comments.length}
        </span>
      </div>

      {/* New Comment Input Form */}
      <div className="bg-surface rounded-xl p-5 border border-border/60 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground-secondary">
          <FaUser className="text-primary" />
          <span>{isLoggedIn ? name || 'Logged-in User' : 'Guest'}</span>
        </div>

        <form onSubmit={handleCommentSubmit} className="space-y-3">
          <textarea
            rows={3}
            placeholder={
              isLoggedIn
                ? 'Share your thoughts, review, or feedback on this title...'
                : 'Please sign in to write a comment.'
            }
            disabled={!isLoggedIn}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full bg-background border border-border/60 focus:border-primary text-foreground placeholder:text-foreground-muted text-sm rounded-xl p-3.5 outline-none resize-none disabled:opacity-60 disabled:cursor-not-allowed"
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!isLoggedIn || !commentText.trim()}
              iconLeft={<FaPaperPlane className="text-xs" />}
            >
              Post Comment
            </Button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-surface/60 rounded-xl p-4 border border-border/40 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    {comment.commentName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {comment.commentName}
                  </span>
                </div>

                {comment.userId === userId && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEditComment(comment)}
                      className="text-xs text-foreground-muted hover:text-primary flex items-center gap-1 transition-colors"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-xs text-danger/80 hover:text-danger flex items-center gap-1 transition-colors"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </div>

              {editCommentId === comment._id ? (
                <form onSubmit={handleUpdateComment} className="pt-2 space-y-2">
                  <textarea
                    rows={2}
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                    className="w-full bg-background border border-primary text-foreground text-sm rounded-lg p-2.5 outline-none resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditCommentId(null)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" size="sm">
                      Update
                    </Button>
                  </div>
                </form>
              ) : (
                <p className="text-sm text-foreground-secondary leading-relaxed pl-9">
                  {comment.comment}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="p-6 bg-surface/30 rounded-xl border border-border/30 text-center space-y-1">
            <p className="text-sm font-medium text-foreground-secondary">
              No comments yet
            </p>
            <p className="text-xs text-foreground-muted">
              Be the first to share your thoughts on this title!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Comments;
