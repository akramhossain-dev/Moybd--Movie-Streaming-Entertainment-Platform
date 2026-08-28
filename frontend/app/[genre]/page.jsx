'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ListingPageLayout from '../component/layout/ListingPageLayout';

const GENRE_CONFIG = {
  Action: {
    title: 'Action Movies & Series',
    subtitle: 'High-octane adrenaline, martial arts, explosions, and intense action blockbusters.',
    apiUrl: '/api/genre/Action',
  },
  Adventure: {
    title: 'Adventure Movies & Series',
    subtitle: 'Thrilling journeys, epic quests, exploration, and wild wilderness survival stories.',
    apiUrl: '/api/genre/Adventure',
  },
  Animation: {
    title: 'Animated Movies & Shows',
    subtitle: 'Anime, 3D animated features, and cartoon stories for all ages.',
    apiUrl: '/api/genre/Animation',
  },
  anime: {
    title: 'Anime Collection',
    subtitle: 'Top Japanese animated series, movies, and fan-favorite sagas.',
    apiUrl: '/api/dashboard/anime',
  },
  Bollywood: {
    title: 'Bollywood Cinema',
    subtitle: 'Latest Hindi blockbusters, romances, action features, and classic cinema.',
    apiUrl: '/api/dashboard/bollywood',
  },
  Comedy: {
    title: 'Comedy Movies & Shows',
    subtitle: 'Laugh-out-loud humor, stand-up specials, and feel-good comedies.',
    apiUrl: '/api/genre/Comedy',
  },
  Crime: {
    title: 'Crime & Mob Thrillers',
    subtitle: 'Heists, detective investigations, mob sagas, and true crime stories.',
    apiUrl: '/api/genre/Crime',
  },
  Drama: {
    title: 'Drama Movies & Series',
    subtitle: 'Emotional stories, character-driven sagas, and intense dramatic narratives.',
    apiUrl: '/api/genre/Drama',
  },
  Fantasy: {
    title: 'Fantasy & Magic',
    subtitle: 'Magical realms, mythical creatures, superhero sagas, and epic fantasies.',
    apiUrl: '/api/genre/Fantasy',
  },
  Gujarati: {
    title: 'Gujarati Cinema',
    subtitle: 'Regional Gujarati movies, dramas, and entertainment.',
    apiUrl: '/api/dashboard/gujarati',
  },
  Hollywood: {
    title: 'Hollywood Blockbusters',
    subtitle: 'Top English language features, major studio releases, and award winners.',
    apiUrl: '/api/dashboard/hollywood',
  },
  Horror: {
    title: 'Horror & Paranormal',
    subtitle: 'Spooky hauntings, psychological terrors, slasher flicks, and creature features.',
    apiUrl: '/api/genre/Horror',
  },
  Marvel_Studio: {
    title: 'Marvel Cinematic Universe',
    subtitle: 'Superheroes, Avengers sagas, comic book adaptations, and MCU features.',
    apiUrl: '/api/dashboard/marvelstudio',
  },
  movies: {
    title: 'All Movies',
    subtitle: 'Browse our complete catalog of feature films across all genres.',
    apiUrl: '/api/dashboard/movie',
  },
  Romance: {
    title: 'Romance & Love Stories',
    subtitle: 'Heartwarming love stories, romantic comedies, and passion-filled sagas.',
    apiUrl: '/api/genre/Romance',
  },
  Science_Fiction: {
    title: 'Sci-Fi & Cyberpunk',
    subtitle: 'Futuristic worlds, space exploration, time travel, and sci-fi mysteries.',
    apiUrl: '/api/genre/Science_Fiction',
  },
  series: {
    title: 'TV & Web Series',
    subtitle: 'Binge-worthy shows, multi-season series, and original web shows.',
    apiUrl: '/api/dashboard/series',
  },
  South: {
    title: 'South Indian Cinema',
    subtitle: 'Tamil, Telugu, Malayalam, and Kannada blockbuster action and drama.',
    apiUrl: '/api/dashboard/south',
  },
  Terms_Conditions: {
    title: 'Terms & Conditions',
    subtitle: 'Terms of service and platform usage rules.',
    apiUrl: '/api/dashboard/publicmovies',
  },
  Thriller: {
    title: 'Thriller & Suspense',
    subtitle: 'Edge-of-your-seat suspense, psychological mind-benders, and mystery thrillers.',
    apiUrl: '/api/genre/Thriller',
  },
  TV_Shows: {
    title: 'TV Shows',
    subtitle: 'Popular television broadcasts, reality shows, and talk series.',
    apiUrl: '/api/dashboard/tvshows',
  },
  Web_Series: {
    title: 'Web Series',
    subtitle: 'Streaming originals, digital series, and mini-series.',
    apiUrl: '/api/dashboard/webseries',
  },
};

export default function DynamicGenrePage() {
  const params = useParams();
  const genreParam = params.genre;

  const config = GENRE_CONFIG[genreParam] || {
    title: `${genreParam ? genreParam.replace(/_/g, ' ') : 'Category'} Catalog`,
    subtitle: `Explore titles in ${genreParam ? genreParam.replace(/_/g, ' ') : 'this category'}.`,
    apiUrl: genreParam ? `/api/genre/${genreParam}` : '/api/dashboard/publicmovies',
  };

  const fullApiUrl = config.apiUrl.startsWith('http')
    ? config.apiUrl
    : `${process.env.NEXT_PUBLIC_API_URL}${config.apiUrl}`;

  return (
    <ListingPageLayout
      title={config.title}
      subtitle={config.subtitle}
      apiUrl={fullApiUrl}
      itemsPerPage={24}
    />
  );
}
