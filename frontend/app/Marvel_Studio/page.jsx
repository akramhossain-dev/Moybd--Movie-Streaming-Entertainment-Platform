'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function MarvelStudioPage() {
  return (
    <ListingPageLayout
      title="Marvel Studio Universe"
      subtitle="Explore superhero sagas, Marvel Cinematic Universe blockbusters, and epic adventures."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/marvelstudio`}
      itemsPerPage={24}
    />
  );
}