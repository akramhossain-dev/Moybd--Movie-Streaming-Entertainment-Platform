'use client';

import React from 'react';
import ListingPageLayout from '../component/layout/ListingPageLayout';

export default function AnimationPage() {
  return (
    <ListingPageLayout
      title="Animation Movies & Series"
      subtitle="Stunning animated features, CGI masterpieces, and family animation."
      apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/genre/Animation`}
      itemsPerPage={24}
    />
  );
}