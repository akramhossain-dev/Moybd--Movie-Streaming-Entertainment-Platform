'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function HollywoodPage() {
  return (
    <ListingPageLayout
      title="Hollywood Collection"
      subtitle="Uncover the magic of Hollywood cinema, iconic blockbusters, and award-winning features."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/hollywood`}
      itemsPerPage={24}
    />
  );
}