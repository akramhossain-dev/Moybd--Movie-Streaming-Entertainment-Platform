'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function ScienceFictionPage() {
  return (
    <ListingPageLayout
      title="Sci-Fi Movies & Series"
      subtitle="Futuristic technology, space exploration, time travel, and mind-bending science fiction."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/genre/Science_Fiction`}
      itemsPerPage={24}
    />
  );
}