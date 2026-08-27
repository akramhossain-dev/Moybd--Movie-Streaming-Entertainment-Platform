'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function AdventurePage() {
  return (
    <ListingPageLayout
      title="Adventure Movies & Series"
      subtitle="Epic quests, dangerous journeys, exploration, and mythical worlds."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/genre/Adventure`}
      itemsPerPage={24}
    />
  );
}