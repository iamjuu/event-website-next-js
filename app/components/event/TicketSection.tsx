
import React from "react";
import { Ticket, ExternalLink, Calendar } from "lucide-react";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";

type TicketProps = {
  id: string;
  name: string;
  thumbnail: string;
  salesEnd: string;
  description: string;
  price: string;
  type: "standard" | "premium" | "vip";
};

const TicketCard = ({ ticket }: { ticket: TicketProps }) => {
  const colorVariants = {
    standard: "border-event-standard/70 bg-event-standard-light",
    premium: "border-event-premium/70 bg-event-premium-light",
    vip: "border-event-vip/70 bg-event-vip-light"
  };

  const iconColorVariants = {
    standard: "text-event-standard bg-event-standard-light/80",
    premium: "text-event-premium bg-event-premium-light/80",
    vip: "text-event-vip bg-event-vip-light/80"
  };

  const buttonVariants = {
    standard: "event-standard",
    premium: "event-premium",
    vip: "event-vip"
  };

  return (
    <div className={cn(
      "flex flex-col bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border-t-4",
      colorVariants[ticket.type]
    )}>
      <div className="relative">
        <img 
          src={ticket.thumbnail} 
          alt={`${ticket.name} thumbnail`} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-0 right-0 m-3 px-3 py-1 text-xs font-medium rounded-full bg-white text-gray-700 shadow-sm">
          {ticket.price}
        </div>
      </div>
      
      <div className="p-4 md:p-5 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={cn(
              "p-2 rounded-full",
              iconColorVariants[ticket.type]
            )}>
              <Ticket size={16} />
            </div>
            <h3 className="font-medium text-lg">{ticket.name}</h3>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <Calendar size={14} className="mr-1" />
          <span>Sales end: {ticket.salesEnd}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 flex-grow">{ticket.description}</p>
        
        <div className="flex gap-2 mt-auto">
          <Link 
            href={`/ticket/${ticket.id}`} 
            className="text-xs md:text-sm px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 flex-1 transition-colors text-center"
          >
            Details
          </Link>
          <Button 
            variant={buttonVariants[ticket.type] as any}
            size="sm"
            className="text-xs md:text-sm px-3 py-1.5 rounded-md flex-1 flex items-center justify-center gap-1"
          >
            <ExternalLink size={14} />
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export const TicketSection = () => {
  const tickets: TicketProps[] = [
    {
      id: "standard",
      name: "Standard Access",
      thumbnail: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ab5ccd61b17b7c6d55f4a46e6c9d45a91d8dac35242b87aed33f09c1a07a1ab?placeholderIfAbsent=true",
      salesEnd: "Aug 20, 2024",
      description: "Basic access to all exhibit areas and general sessions. Perfect for first-time attendees.",
      price: "₹1,499",
      type: "standard"
    },
    {
      id: "premium",
      name: "Premium Pass",
      thumbnail: "https://cdn.builder.io/api/v1/image/assets/TEMP/8b43d09e3eca3d3bf64292012ab469a7492ab9f5a59394bc9c7a8e3a21f0b3f7?placeholderIfAbsent=true",
      salesEnd: "Aug 15, 2024",
      description: "Enhanced access including premium sessions, lunch, and networking opportunities.",
      price: "₹2,999",
      type: "premium"
    },
    {
      id: "vip",
      name: "VIP Experience",
      thumbnail: "https://cdn.builder.io/api/v1/image/assets/TEMP/db06e3b6d1fd7fa32e05ce5fb1b362f48c9d6bdd3eae8d19e0a0cfd7ca41f80a?placeholderIfAbsent=true",
      salesEnd: "Aug 10, 2024",
      description: "Full access to all sessions, exclusive VIP lounge, dinner gala, and speaker meetups.",
      price: "₹4,999",
      type: "vip"
    }
  ];

  return (
    <section className="w-full mt-12 md:mt-20">
      <h2 className="text-xl md:text-2xl font-medium mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-12 after:rounded-full after:bg-event-standard">
        Tickets
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {tickets.map((ticket, index) => (
          <TicketCard key={index} ticket={ticket} />
        ))}
      </div>
    </section>
  );
};
