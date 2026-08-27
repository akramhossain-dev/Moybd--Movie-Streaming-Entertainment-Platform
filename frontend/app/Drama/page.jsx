'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function DramaPage() {
  return (
    <ListingPageLayout
      title="Drama Movies & Series"
      subtitle="Deep emotional storytelling, powerful performances, and compelling human conflict."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/genre/Drama`}
      itemsPerPage={24}
    />
  );
}