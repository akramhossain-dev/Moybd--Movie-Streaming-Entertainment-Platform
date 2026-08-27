'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function ComedyPage() {
  return (
    <ListingPageLayout
      title="Comedy Movies & Series"
      subtitle="Hilarious comedies, laugh-out-loud sitcoms, and feel-good entertainment."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/genre/Comedy`}
      itemsPerPage={24}
    />
  );
}