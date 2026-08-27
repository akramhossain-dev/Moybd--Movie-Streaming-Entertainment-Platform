'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function ActionPage() {
  return (
    <ListingPageLayout
      title="Action Movies & Series"
      subtitle="High-octane adrenaline, martial arts, explosions, and intense action blockbusters."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/genre/Action`}
      itemsPerPage={24}
    />
  );
}