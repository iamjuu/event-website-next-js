import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

// Function to fetch event data
async function getEventData() {
  try {
    const response = await fetch(
      'https://backend-endpoint.eventhex.ai/api/v1/auth/domain-event?domain=my-event.eventhex.ai',
      { next: { revalidate: 3600 } } // Revalidate every hour
    );
    const data = await response.json();
    return data.domainData.event;
  } catch (error) {
    console.error('Error fetching event data:', error);
    return null;
  }
}

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  const eventData = await getEventData();
  
  const baseMetadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    title: "Event Website",
    description: "Your event management platform",
  };
  
  if (!eventData) {
    return baseMetadata;
  }

  return {
    ...baseMetadata,
    title: eventData.title || "Event Page",
    description: eventData.description || "Event details page",
    openGraph: {
      title: eventData.title,
      description: eventData.description,
      images: eventData.banner ? [eventData.banner] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: eventData.title,
      description: eventData.description,
      images: eventData.banner ? [eventData.banner] : [],
    },
  };
}

// Generate dynamic JSON-LD
async function generateJsonLd() {
  const eventData = await getEventData();
  
  if (!eventData) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": eventData.title,
    "description": eventData.description,
    "image": eventData.banner,
    "startDate": eventData.startDate,
    "endDate": eventData.endDate,
    "location": {
      "@type": "Place",
      "name": eventData.venue,
    },
    "offers": {
      "@type": "Offer",
      "url": typeof window !== 'undefined' ? window.location.href : '',
      "price": eventData.price || "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "organizer": {
      "@type": "Organization",
      "name": eventData.title,
      "url": typeof window !== 'undefined' ? window.location.origin : ''
    }
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = await generateJsonLd();

  return (
    <html lang="en">
      <head>
        {jsonLd && (
          <Script
            id="event-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}