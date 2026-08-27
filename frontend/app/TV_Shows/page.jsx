'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function TVShowsPage() {
  return (
    <ListingPageLayout
      title="TV Shows Collection"
      subtitle="Browse popular television broadcasts, reality shows, and television serials."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/tvshows`}
      itemsPerPage={24}
    />
  );
}