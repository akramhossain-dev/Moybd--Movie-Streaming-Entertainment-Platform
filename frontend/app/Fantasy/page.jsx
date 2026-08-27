'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function FantasyPage() {
  return (
    <ListingPageLayout
      title="Fantasy Movies & Series"
      subtitle="Magic, mythical creatures, supernatural powers, and enchanted realms."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/genre/Fantasy`}
      itemsPerPage={24}
    />
  );
}