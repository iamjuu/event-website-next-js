'use client';

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Tag, CheckCircle, XCircle, Ticket, User, Clock, AlertCircle } from "lucide-react";
import { Header } from "../../components/event/Header";
import { Footer } from "../../components/event/Footer";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { useToast } from "../../hooks/use-toast";

// Define ticket types
type TicketType = "standard" | "premium" | "vip";

interface TicketData {
  id: string;
  name: string;
  type: TicketType;
  price: string;
  thumbnail: string;
  salesEnd: string;
  description: string;
  features: Array<{
    name: string;
    included: boolean;
  }>;
  longDescription: string;
  capacity?: string;
  available?: string;
}

export default function TicketDetail() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { toast } = useToast();

  // Sample ticket data - in a real app, this would come from an API
  const tickets: Record<string, TicketData> = {
    "standard": {
      id: "standard",
      name: "Standard Access",
      type: "standard",
      price: "₹1,499",
      thumbnail: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ab5ccd61b17b7c6d55f4a46e6c9d45a91d8dac35242b87aed33f09c1a07a1ab?placeholderIfAbsent=true",
      salesEnd: "Aug 20, 2024",
      description: "Basic access to all exhibit areas and general sessions. Perfect for first-time attendees.",
      longDescription: "The Standard Access pass gives you entry to all exhibit areas and general sessions at the KEDDA Dental Expo 2023. This is the perfect option for first-time attendees who want to explore the expo and get a taste of what it has to offer. With this pass, you'll have access to over 100 national and international exhibitors showcasing their latest dental equipment, consumables, and accessories.",
      features: [
        { name: "Exhibit Hall Access", included: true },
        { name: "General Sessions", included: true },
        { name: "Conference Materials", included: true },
        { name: "Lunch Included", included: false },
        { name: "Networking Events", included: false },
        { name: "VIP Lounge Access", included: false },
        { name: "Dinner Gala", included: false },
      ],
      capacity: "1000",
      available: "364"
    },
    "premium": {
      id: "premium",
      name: "Premium Pass",
      type: "premium",
      price: "₹2,999",
      thumbnail: "https://cdn.builder.io/api/v1/image/assets/TEMP/8b43d09e3eca3d3bf64292012ab469a7492ab9f5a59394bc9c7a8e3a21f0b3f7?placeholderIfAbsent=true",
      salesEnd: "Aug 15, 2024",
      description: "Enhanced access including premium sessions, lunch, and networking opportunities.",
      longDescription: "The Premium Pass gives you enhanced access to the KEDDA Dental Expo 2023. In addition to the standard features, you'll also get access to premium sessions, lunch on both days, and exclusive networking opportunities. This pass is ideal for dental professionals who want to make the most of their expo experience and connect with other industry leaders.",
      features: [
        { name: "Exhibit Hall Access", included: true },
        { name: "General Sessions", included: true },
        { name: "Conference Materials", included: true },
        { name: "Lunch Included", included: true },
        { name: "Networking Events", included: true },
        { name: "VIP Lounge Access", included: false },
        { name: "Dinner Gala", included: false },
      ],
      capacity: "500",
      available: "197"
    },
    "vip": {
      id: "vip",
      name: "VIP Experience",
      type: "vip",
      price: "₹4,999",
      thumbnail: "https://cdn.builder.io/api/v1/image/assets/TEMP/db06e3b6d1fd7fa32e05ce5fb1b362f48c9d6bdd3eae8d19e0a0cfd7ca41f80a?placeholderIfAbsent=true",
      salesEnd: "Aug 10, 2024",
      description: "Full access to all sessions, exclusive VIP lounge, dinner gala, and speaker meetups.",
      longDescription: "The VIP Experience is the ultimate way to enjoy the KEDDA Dental Expo 2023. This all-inclusive pass gives you full access to all sessions, exclusive access to the VIP lounge, invitation to the dinner gala, and special meetups with keynote speakers. This premium experience is designed for industry leaders and serious professionals who want the very best the expo has to offer.",
      features: [
        { name: "Exhibit Hall Access", included: true },
        { name: "General Sessions", included: true },
        { name: "Conference Materials", included: true },
        { name: "Lunch Included", included: true },
        { name: "Networking Events", included: true },
        { name: "VIP Lounge Access", included: true },
        { name: "Dinner Gala", included: true },
      ],
      capacity: "200",
      available: "56"
    }
  };

  const ticket = tickets[id];
  
  // Color variants based on ticket type
  const colorVariants = {
    standard: "border-event-standard text-event-standard",
    premium: "border-event-premium text-event-premium",
    vip: "border-event-vip text-event-vip"
  };

  const bgColorVariants = {
    standard: "bg-event-standard hover:bg-event-standard/90",
    premium: "bg-event-premium hover:bg-event-premium/90",
    vip: "bg-event-vip hover:bg-event-vip/90"
  };

  const lightBgColorVariants = {
    standard: "bg-event-standard-light",
    premium: "bg-event-premium-light",
    vip: "bg-event-vip-light"
  };

  const handleRegister = () => {
    toast({
      title: "Registration initiated",
      description: `You're about to register for the ${ticket?.name}`,
    });
  };

  if (!ticket) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
          <h1 className="text-2xl font-bold mb-4">Ticket Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the ticket you're looking for. It may have been removed or the URL might be incorrect.</p>
          <Button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 mx-auto"
            variant="outline"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex flex-col overflow-hidden items-stretch min-h-screen pt-4 md:pt-[26px] pb-20 md:pb-24">
      <main className="self-center flex w-full max-w-[1208px] flex-col items-stretch px-4 md:px-6">
        <Header />
        
        <div className="mt-6 flex items-center">
          <Button 
            onClick={() => router.push('/')}
            className="flex items-center text-gray-600 hover:text-gray-900"
            variant="ghost"
            size="sm"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span>Back to event</span>
          </Button>
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Ticket Details */}
          <div className="lg:col-span-2">
            <div className={cn(
              "border-t-4 rounded-xl overflow-hidden shadow-md bg-white mb-8 transition-all duration-300 hover:shadow-lg",
              colorVariants[ticket.type]
            )}>
              <div className="relative">
                <img 
                  src={ticket.thumbnail} 
                  alt={`${ticket.name} thumbnail`} 
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className={cn(
                    "inline-block px-3 py-1 rounded-full text-xs font-medium mb-3",
                    lightBgColorVariants[ticket.type]
                  )}>
                    {ticket.type.toUpperCase()}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold drop-shadow-sm">{ticket.name}</h1>
                </div>
                <div className="absolute top-0 right-0 m-4 px-4 py-2 text-sm font-bold rounded-full bg-white shadow-md">
                  {ticket.price}
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-4 mb-6 text-sm border-b border-gray-100 pb-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar size={16} className="text-gray-500" />
                    <span>Sales end: <span className="font-medium">{ticket.salesEnd}</span></span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700">
                    <User size={16} className="text-gray-500" />
                    <span>Capacity: <span className="font-medium">{ticket.capacity}</span></span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700">
                    <Ticket size={16} className="text-gray-500" />
                    <span>Available: <span className="font-medium">{ticket.available}</span></span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Description</h2>
                    <p className="text-gray-700 leading-relaxed">{ticket.longDescription}</p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">What's Included</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                      {ticket.features.map((feature, index) => (
                        <div key={index} className={cn(
                          "flex items-center gap-3 p-3 rounded-lg transition-colors",
                          feature.included 
                            ? "bg-green-50" 
                            : "bg-gray-50 opacity-70"
                        )}>
                          {feature.included ? (
                            <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                          ) : (
                            <XCircle size={18} className="text-red-400 flex-shrink-0" />
                          )}
                          <span className={cn(
                            "text-gray-700",
                            !feature.included && "text-gray-500"
                          )}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Registration */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className={cn(
                  "py-4 px-6",
                  bgColorVariants[ticket.type]
                )}>
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Ticket size={20} />
                    Register for {ticket.name}
                  </h2>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2">
                      <Tag size={18} className={cn("text-gray-700")} />
                      <span className="text-gray-700">Price</span>
                    </div>
                    <span className="font-bold text-xl">{ticket.price}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-gray-700" />
                      <span className="text-gray-700">Available until</span>
                    </div>
                    <span className="font-medium">{ticket.salesEnd}</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Availability</span>
                      <span className="text-sm font-medium">{ticket.available}/{ticket.capacity}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full", 
                          bgColorVariants[ticket.type]
                        )} 
                        style={{ width: `${(parseInt(ticket.available || "0") / parseInt(ticket.capacity || "1")) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <Button 
                    className={cn(
                      "w-full text-white font-medium py-3 transition-all",
                      bgColorVariants[ticket.type]
                    )}
                    onClick={handleRegister}
                  >
                    Register Now
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center">
                    By registering, you agree to the terms and conditions of the event.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-5 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex gap-3 items-start">
                  <AlertCircle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-800 mb-1">Limited Availability</h3>
                    <p className="text-sm text-yellow-700">
                      This ticket type is selling fast. Complete your registration soon to secure your spot.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}