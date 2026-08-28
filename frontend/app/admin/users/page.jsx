'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../component/layout/AdminLayout';
import Skeleton from '../../component/feedback/Skeleton';
import ErrorState from '../../component/feedback/ErrorState';
import EmptyState from '../../component/feedback/EmptyState';
import Badge from '../../component/ui/Badge';
import Button from '../../component/ui/Button';
import { FaUsers, FaSearch, FaTrash, FaShieldAlt, FaUser } from 'react-icons/fa';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;

  const fetchUsers = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/users`,
        { withCredentials: true }
      );
      if (response.data && response.data.data) {
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch user accounts');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredUsers(
        users.filter(
          (u) =>
            u.name?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.role?.toLowerCase().includes(q)
        )
      );
    }
    setCurrentPage(1);
  }, [searchQuery, users]);

  const handleShowModal = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/users/${userToDelete._id}`,
        { withCredentials: true }
      );
      setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
    } catch (err) {
      setError('Failed to delete user account');
      console.error(err);
    } finally {
      setShowModal(false);
      setUserToDelete(null);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
                <FaUsers className="text-primary" /> User Accounts
              </h1>
              <Badge variant="subtle" size="xs">
                {filteredUsers.length} Users
              </Badge>
            </div>
            <p className="text-xs text-foreground-muted">
              Manage registered platform accounts, roles, and administrative permissions.
            </p>
          </div>

          <div className="relative">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-xs" />
            <input
              type="text"
              placeholder="Search user accounts..."
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
          <ErrorState message={error} onRetry={fetchUsers} />
        ) : filteredUsers.length > 0 ? (
          <div className="bg-surface rounded-2xl border border-border/60 shadow-card overflow-hidden space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/50 text-foreground-muted uppercase font-semibold bg-surface-elevated/40">
                    <th className="py-3.5 px-4">User</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-foreground-secondary">
                  {currentUsers.map((user) => {
                    const isAdmin = user.role === 'admin';
                    return (
                      <tr key={user._id} className="hover:bg-surface-elevated/50 transition-colors">
                        <td className="py-3 px-4 font-bold text-foreground flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs shrink-0 font-bold">
                            {user.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <span>{user.name}</span>
                        </td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-max ${
                              isAdmin
                                ? 'bg-primary/20 text-primary border border-primary/30'
                                : 'bg-surface-elevated text-foreground-muted border border-border/40'
                            }`}
                          >
                            {isAdmin ? <FaShieldAlt /> : <FaUser />}
                            {user.role || 'user'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {!isAdmin && (
                            <button
                              onClick={() => handleShowModal(user)}
                              className="px-3 py-1.5 bg-danger/10 hover:bg-danger/20 text-danger rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1"
                            >
                              <FaTrash className="text-[10px]" /> Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-border/40 text-xs text-foreground-muted">
                <span>
                  Showing {indexOfFirstUser + 1}–
                  {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
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
            title="No user accounts found"
            description="Try adjusting your search query."
          />
        )}
      </div>

      {/* Modal Confirmation */}
      {showModal && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface rounded-2xl p-6 border border-border/60 shadow-modal max-w-sm w-full space-y-4 text-center">
            <h3 className="text-lg font-bold text-foreground">Confirm Account Deletion</h3>
            <p className="text-xs text-foreground-muted">
              Are you sure you want to delete <span className="text-white font-bold">{userToDelete.name}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={confirmDelete}>
                Delete User
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
