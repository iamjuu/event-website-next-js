import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { CalendarIcon, ExternalLinkIcon, TicketIcon } from "lucide-react";
import { BlackImage } from "@/public";
type TicketType = "standard" | "premium" | "vip";

interface TicketProps {
  id: string;
  type: TicketType;
  title: string;
  price: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
}

const ticketStyles = {
  standard: { border: "border-[#d9ceff]", accent: "text-primary-base", hover: 'hover:border-primary-base' },
  premium: { border: "border-[#d9ceff]", accent: "text-primary-base", hover: 'hover:border-primary-base' },
  vip: { border: "border-[#d9ceff]", accent: "text-primary-base", hover: 'hover:border-primary-base' },
};
const buttonStyles = {
  standard: "bg-primary-base hover:bg-primary-dark",
  premium: "bg-primary-base hover:bg-primary-dark",
  vip: "bg-primary-base hover:bg-primary-dark",
};

const TicketCard: React.FC<TicketProps> = ({ id, type, title, price, date, location, thumbnail, description }) => {
  return (
    <div 
    className={`${ticketStyles[type].border || ticketStyles[type].bg} ${ticketStyles[type].hover || ''} rounded-2xl overflow-hidden shadow-sm border border-neutral-100 transition-all duration-300 hover:shadow-lg`}
    // className={`${ticketStyles[type].bg} rounded-2xl  overflow-hidden shadow-sm border border-neutral-100`}
    >
      <div className="relative h-48 w-full">
        <Image
          src={BlackImage}
          alt={`${title} ticket`}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6 ">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`${ticketStyles[type].accent} p-2 rounded-lg bg-white/80`}>
                <TicketIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-neutral-500">₹</span>
              <span className="text-xl font-bold text-neutral-900">{price}</span>
            </div>
          </div>

          <p className="text-sm text-neutral-600">{description}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <CalendarIcon className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <CalendarIcon className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <Link href={`/tickets/${id}`} className="flex-1">
              <Button 
                variant="outline"
                className="w-full border-neutral-200 hover:bg-neutral-50"
              >
                Details
              </Button>
            </Link>
            <Button 
              className={`flex-1 text-white ${buttonStyles[type]}`}
            >
              Register
              <ExternalLinkIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TicketSection = () => {
  const tickets: TicketProps[] = [
    {
      id: "standard",
      type: "standard",
      title: "Standard",
      price: "5,000",
      date: "March 15-17, 2024",
      location: "Le Meridien, Kochi",
      thumbnail: "/images/tickets/standard.jpg",
      description: "Access to all exhibit areas and general sessions. Perfect for first-time attendees.",
    },
    {
      id: "premium",
      type: "premium",
      title: "Premium",
      price: "7,500",
      date: "March 15-17, 2024",
      location: "Le Meridien, Kochi",
      thumbnail: "/images/tickets/premium.jpg",
      description: "Enhanced access including premium sessions and networking opportunities.",
    },
    {
      id: "vip",
      type: "vip",
      title: "VIP",
      price: "10,000",
      date: "March 15-17, 2024",
      location: "Le Meridien, Kochi",
      thumbnail: "/images/tickets/vip.jpg",
      description: "Full access to all sessions, exclusive VIP lounge, and speaker meetups.",
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1208px] mx-auto px-4 md:px-6">
        <h2 className="mb-[24px] text-black text-xl md:text-2xl font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-primary-base">
            Tickets
          </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tickets.map((ticket, index) => (
            <TicketCard key={index} {...ticket} />
          ))}
        </div>
      </div>
    </section>
  );
};