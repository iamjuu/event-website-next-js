import type { Metadata } from "next";
// import { GeistSans, GeistMono } from "@vercel/fonts";
import "./globals.css";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Tech Conference 2024",
  description: "Join us for the most innovative tech conference of the year",
  openGraph: {
    images: ['/banner/f4167b70-96d7-4ca2-86fc-c12d3aebd304.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/banner/f4167b70-96d7-4ca2-86fc-c12d3aebd304.jpg'],
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Tech Conference 2024",
  "description": "Join us for the most innovative tech conference of the year",
  "image": "https://yourdomain.com/banner/f4167b70-96d7-4ca2-86fc-c12d3aebd304.jpg",
  "startDate": "2024-06-01T09:00",
  "endDate": "2024-06-03T17:00",
  "location": {
    "@type": "Place",
    "name": "Tech Conference Center",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Street",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94105",
      "addressCountry": "US"
    }
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/tickets",
    "price": "499",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "organizer": {
    "@type": "Organization",
    "name": "Tech Conference Organizers",
    "url": "https://example.com"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="event-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      </head>
      <body >
        {children}
      </body>
    </html>
  );
}