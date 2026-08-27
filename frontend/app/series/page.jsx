'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function SeriesPage() {
  return (
    <ListingPageLayout
      title="TV & Web Series"
      subtitle="Discover top-rated series, multi-season dramas, and binge-worthy television shows."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/series`}
      itemsPerPage={24}
    />
  );
}