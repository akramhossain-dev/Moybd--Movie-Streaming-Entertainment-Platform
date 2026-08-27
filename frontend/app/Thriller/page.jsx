'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function ThrillerPage() {
  return (
    <ListingPageLayout
      title="Thriller Movies & Series"
      subtitle="Suspenseful plot twists, edge-of-your-seat tension, and mystery thrillers."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/genre/Thriller`}
      itemsPerPage={24}
    />
  );
}