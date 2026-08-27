'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function HorrorPage() {
  return (
    <ListingPageLayout
      title="Horror Movies & Series"
      subtitle="Chilling tales, supernatural hauntings, jump scares, and psychological terror."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/genre/Horror`}
      itemsPerPage={24}
    />
  );
}