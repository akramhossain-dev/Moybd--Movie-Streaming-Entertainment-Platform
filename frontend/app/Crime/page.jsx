'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function CrimePage() {
  return (
    <ListingPageLayout
      title="Crime Movies & Series"
      subtitle="Gritty crime stories, heist sagas, mob thrillers, and detective mysteries."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/genre/Crime`}
      itemsPerPage={24}
    />
  );
}