'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function GujaratiPage() {
  return (
    <ListingPageLayout
      title="Gujarati Movies"
      subtitle="Discover popular Gujarati regional cinema, comedies, and classic family entertainment."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/gujarati`}
      itemsPerPage={24}
    />
  );
}