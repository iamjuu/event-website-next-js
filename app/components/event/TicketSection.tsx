import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { CalendarIcon, ExternalLinkIcon, TicketIcon, MapPinIcon } from "lucide-react";
import { NoImage,BlackImage } from "@/public";

interface TicketProps {
  id: string;
  title: string;
  price: string | number;
  date: string;
  location: string;
  thumbnail: string;
  shortDescription: string;
}

const TicketCard: React.FC<TicketProps> = ({ 
  id, 
  title, 
  price, 
  date, 
  location, 
  thumbnail, 
  shortDescription 
}) => {
  // Determine ticket type based on title or other criteria if needed
  const getTicketType = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('vip')) return 'vip';
    if (lowerTitle.includes('premium')) return 'premium';
    return 'standard';
  };
  
  const type = getTicketType(title);
  
  const ticketStyles = {
    standard: { 
      border: "border-[var(--ticket-border)]", 
      accent: "text-[var(--primary-base)]", 
      hover: 'hover:border-[var(--primary-base)]' 
    },
    premium: { 
      border: "border-[var(--ticket-border)]", 
      accent: "text-[var(--primary-dark)]", 
      hover: 'hover:border-[var(--primary-dark)]' 
    },
    vip: { 
      border: "border-[var(--ticket-border)]", 
      accent: "text-[var(--primary-darker)]", 
      hover: 'hover:border-[var(--primary-darker)]' 
    },
  };

  const buttonStyles = {
    standard: "bg-gradient-to-r from-[var(--button-gradient-from)] to-[var(--button-gradient-to)] hover:from-[var(--button-hover-from)] hover:to-[var(--button-hover-to)]",
    premium: "bg-gradient-to-r from-[var(--button-gradient-from)] to-[var(--button-gradient-to)] hover:from-[var(--button-hover-from)] hover:to-[var(--button-hover-to)]",
    vip: "bg-gradient-to-r from-[var(--button-gradient-from)] to-[var(--button-gradient-to)] hover:from-[var(--button-hover-from)] hover:to-[var(--button-hover-to)]",
  };

  // Format date string if needed
  const formatDate = (dateString) => {
    if (!dateString) return "TBA";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  };

  // Format price display
  const formatPrice = (price) => {
    if (price === "Free" || price === 0) return "Free";
    if (typeof price === 'number') {
      return price.toLocaleString('en-IN');
    }
    return price;
  };

  const IMG_CDN = "https://event-manager.syd1.cdn.digitaloceanspaces.com/";
  return (
    <div 
    className={`${ticketStyles[type].border} ${ticketStyles[type].hover} rounded-2xl overflow-hidden shadow-sm border border-neutral-100 transition-all duration-300 hover:shadow-lg`}
  >
    <div className="relative h-48 w-full">
      {thumbnail === NoImage ? (
        <Image
          src= {NoImage}
          alt="No image available"
          fill
          className="object-cover"
        />
      ) : (
        <Image
          src={IMG_CDN + thumbnail}
          alt={`${title} ticket`}
          fill
          className="object-cover"
        />
      )}
    </div>
  
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`${ticketStyles[type].accent} p-2 rounded-lg bg-white/80`}>
              <TicketIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
          </div>
          <div className="flex items-center gap-1">
            {price !== "Free" && <span className="text-sm font-medium text-neutral-500">₹</span>}
            <span className="text-xl font-bold text-neutral-900">{formatPrice(price)}</span>
          </div>
        </div>
  
        <p className="text-sm text-neutral-600">{shortDescription}</p>
  
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <CalendarIcon className="w-4 h-4" />
            <span>{formatDate(date)}</span>
          </div>
          {location && (
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <MapPinIcon className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}
        </div>
  
        <div className="flex gap-3 mt-2">
          <Button className={`flex-1 text-white ${buttonStyles[type]}`}>
            Register
            <ExternalLinkIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export const TicketSection = ({ tickets }) => {
  // If no tickets are provided, show empty state
  if (!tickets || tickets.length === 0) {
    return (
      <section className="py-12 md:py-16">
        <div className="max-w-[1208px] mx-auto">
          <h2 className="mb-[24px] text-black text-xl md:text-2xl font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-primary-base">
            Tickets
          </h2>
          <div className="py-12 text-center">
            <p className="text-neutral-600">No tickets are available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1208px] mx-auto">
        <h2 className="mb-[24px] text-black text-xl md:text-2xl font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-primary-base">
          Tickets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket, index) => (
        
            <TicketCard 
              key={index} 
              id={ticket.id}
              title={ticket.title}
              price={ticket.price}
              date={ticket.date}
              location={ticket.location}
              thumbnail={ticket.thumbnail }
              shortDescription={ticket.shortDescription}
            />
          ))}
        </div>
      </div>
    </section>
  );
};