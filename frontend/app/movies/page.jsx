'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function MoviesPage() {
  return (
    <ListingPageLayout
      title="Explore All Movies"
      subtitle="Browse timeless cinema classics, trending blockbusters, ratings, and recommendations."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/movie`}
      itemsPerPage={24}
    />
  );
}