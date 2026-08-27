'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function AnimePage() {
  return (
    <ListingPageLayout
      title="Anime Universe"
      subtitle="Discover top-rated Japanese animated series, movies, and fan-favorite titles."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/anime`}
      itemsPerPage={24}
    />
  );
}