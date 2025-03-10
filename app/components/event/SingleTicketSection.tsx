
import React from "react";
import { Ticket, ExternalLink, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

type TicketProps = {
  id: string;
  name: string;
  thumbnail: string;
  salesEnd: string;
  description: string;
  price: string;
  type: "standard" | "premium" | "vip";
};

const SingleTicket = ({ ticket }: { ticket: TicketProps }) => {
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

  const buttonColorVariants = {
    standard: "bg-event-standard hover:bg-event-standard/90",
    premium: "bg-event-premium hover:bg-event-premium/90",
    vip: "bg-event-vip hover:bg-event-vip/90"
  };

  return (
    <div className={cn(
      "flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border-t-4 md:border-l-4 md:border-t-0",
      colorVariants[ticket.type]
    )}>
      <div className="relative w-full md:w-1/3">
        <img 
          src={ticket.thumbnail} 
          alt={`${ticket.name} thumbnail`} 
          className="w-full h-64 md:h-full object-cover"
        />
        <div className="absolute top-0 right-0 m-3 px-3 py-1 text-xs font-medium rounded-full bg-white text-gray-700 shadow-sm">
          {ticket.price}
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-3 rounded-full",
              iconColorVariants[ticket.type]
            )}>
              <Ticket size={24} />
            </div>
            <h3 className="font-medium text-2xl">{ticket.name}</h3>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar size={18} className="mr-2" />
          <span>Sales end: {ticket.salesEnd}</span>
        </div>
        
        <p className="text-base text-gray-600 mb-6">{ticket.description}</p>
        
        <div className="mt-auto">
          <ul className="mb-6 space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-event-standard"></span>
              Access to all exhibit areas
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-event-standard"></span>
              Conference materials
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-event-standard"></span>
              Certificate of attendance
            </li>
          </ul>
          
          <button className={cn(
            "px-6 py-3 rounded-lg text-white transition-colors flex items-center justify-center gap-2 w-full md:w-auto",
            buttonColorVariants[ticket.type]
          )}>
            <span>Register Now</span>
            <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const SingleTicketSection = () => {
  const ticket: TicketProps = {
    id: "premium",
    name: "Premium Pass",
    thumbnail: "https://cdn.builder.io/api/v1/image/assets/TEMP/8b43d09e3eca3d3bf64292012ab469a7492ab9f5a59394bc9c7a8e3a21f0b3f7?placeholderIfAbsent=true",
    salesEnd: "Aug 15, 2024",
    description: "Enhanced access including premium sessions, lunch, and networking opportunities. This ticket provides the best value for dental professionals looking to maximize their experience at the expo.",
    price: "₹2,999",
    type: "premium"
  };

  return (
    <section className="w-full">
      <h2 className="text-xl md:text-2xl font-medium mb-5">Featured Ticket</h2>
      <SingleTicket ticket={ticket} />
    </section>
  );
};
