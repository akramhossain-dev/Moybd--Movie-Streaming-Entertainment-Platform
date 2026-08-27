'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function WebSeriesPage() {
  return (
    <ListingPageLayout
      title="Web Series Collection"
      subtitle="Streaming web originals, multi-episode thrillers, and exclusive series."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/webseries`}
      itemsPerPage={24}
    />
  );
}