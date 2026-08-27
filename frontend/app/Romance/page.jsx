'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function RomancePage() {
  return (
    <ListingPageLayout
      title="Romance Movies & Series"
      subtitle="Heartwarming love stories, romantic comedies, and passionate relationships."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/genre/Romance`}
      itemsPerPage={24}
    />
  );
}