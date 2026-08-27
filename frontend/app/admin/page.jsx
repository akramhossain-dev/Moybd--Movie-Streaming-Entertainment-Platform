'use client';

import React from 'react';
import AdminLayout from '../component/layout/AdminLayout';
import Dashboard from '../component/Admin_Component/Dashboard';

export default function AdminPage() {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
}
