import localFont from "next/font/local";
import "./globals.css";
import DisableInspect from "./component/inspect";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "MOYBD: Your Ultimate Destination for Movies and Entertainment",
  description:
    "Discover the latest movies, reviews, trailers, and entertainment news on MOYBD. Stay updated with trending content, explore a world of cinema, and enjoy seamless browsing tailored for movie enthusiasts.",
  keywords:
    "movies, entertainment, movie reviews, latest trailers, trending movies, cinema, Hollywood, Bollywood, streaming, entertainment news, free movies, HD movies, movie downloads, Netflix, Amazon Prime, Disney+, Hulu, latest blockbusters, top-rated movies, award-winning films, celebrity news, showbiz, box office hits, TV shows, binge-watch, OTT platforms, movie streaming, web series, 4K movies, animated movies, action movies, romantic comedies, thriller movies, sci-fi films, horror movies, family movies, kids movies, classic films, documentary movies, movie ratings, IMDb, Rotten Tomatoes, streaming platforms, upcoming releases, movie blogs, entertainment gossip, popular TV series, series reviews, latest episodes, fan theories, behind the scenes, casting news, film festivals, Cannes, Oscars, film industry, top grossing movies, regional cinema, Tamil movies, Telugu movies, Korean dramas, anime movies, subbed movies, dubbed movies, movie trailers 2025, must-watch movies, trending now.",
  author: "Akram Hossain",
  robots: "index, follow",
  icons: {
    icon: "/m.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  ogTitle: "MOYBD: Your Ultimate Destination for Movies and Entertainment",
  ogDescription:
    "Stay up-to-date with the latest movies, reviews, trailers, and entertainment news. Explore a wide variety of cinematic content only on MOYBD.",
  ogType: "website",
  ogUrl: "https://moybd.sbs",
  ogImage:
    "https://raw.githubusercontent.com/AkramHossain0/data/refs/heads/main/banner01.jpeg",
  twitterCard: "summary_large_image",
  twitterTitle: "MOYBD: Your Ultimate Movie and Entertainment Hub",
  twitterDescription:
    "Discover the latest in movies and entertainment with MOYBD. Trailers, reviews, news, and more, all in one place.",
  twitterImage:
    "https://raw.githubusercontent.com/AkramHossain0/data/refs/heads/main/banner01.jpeg",
  canonical: "https://moybd.sbs",
  language: "en-US",
};

export default function RootLayout({ children }) {
  return (
    <html lang={metadata.language}>
      <head>
        <meta name="theme-color" content="#090710" />
        <meta name="msapplication-TileColor" content="#090710" />
        <link rel="icon" type="image/x-icon" href="/m.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <DisableInspect />
      </body>
    </html>
  );
}
