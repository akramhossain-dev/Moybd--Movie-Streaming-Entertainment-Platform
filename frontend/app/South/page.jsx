'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function SouthPage() {
  return (
    <ListingPageLayout
      title="South Indian Cinema"
      subtitle="Experience high-octane South Indian action, mass entertainment, and top dubbed releases."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/south`}
      itemsPerPage={24}
    />
  );
}