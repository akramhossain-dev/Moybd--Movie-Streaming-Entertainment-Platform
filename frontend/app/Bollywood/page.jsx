'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function BollywoodPage() {
  return (
    <ListingPageLayout
      title="Bollywood Movies & Shows"
      subtitle="Explore top Hindi movies, romantic dramas, action thrillers, and blockbuster entertainment."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/bollywood`}
      itemsPerPage={24}
    />
  );
}