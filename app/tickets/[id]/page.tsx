'use client';

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Tag, CheckCircle, XCircle, Ticket, User, Clock, AlertCircle } from "lucide-react";
import { Header } from "../../components/event/Header";
import { Footer } from "../../components/event/Footer";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { useToast } from "../../hooks/use-toast";

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
  const [eventLogo, setEventLogo] = useState(null);
  const BACKEND_URL = process.env.BACKEND_URL ; 
  const IMG_CDN = process.env.IMG_CDN;
  const { toast } = useToast();
  
  const [ticket, setTicket] = useState<TicketData | null>(null);
    useEffect(()=>{
      const fetchDetails = async ()=>{
        const response = await fetch(
          // `https://backend-endpoint.eventhex.ai/api/v1/auth/domain-event?domain=${window.location.hostname}`
          `${BACKEND_URL}/api/v1/auth/domain-event?domain=my-event.eventhex.ai`
          
        );
        const data = await response.json();
        setEventLogo(data.domainData.event.logo);
      }
      fetchDetails();
    },[])
  useEffect(() => {
    const fetchDetails = async() => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/ticket?id=${id}`);
        const data = await response.json();
        console.log("Data", data);

        const ticketData = data.response;
        console.log("ticket", ticketData);
        
        setTicket({
          id,
          name: ticketData.title,
          type: ticketData.type || "standard",
          price: ticketData.paymentAmount || "",
          thumbnail: ticketData.thumbnail,
          salesEnd: ticketData.registrationEndDate,
          description: ticketData.shortDescription,
          longDescription: ticketData.description,
          // features: [
          //   { name: "ID Card", included: ticketData.idCard || false },
          //   { name: "Certificate", included: ticketData.certificate || false },
          //   { name: "Conference Materials", included: true },
          //   { name: "Lunch Included", included: false },
          //   { name: "Networking Events", included: false },
          //   { name: "VIP Lounge Access", included: false },
          //   { name: "Dinner Gala", included: false },
          // ],
          capacity: ticketData.maximumRegistrations || "",
          available: ticketData.maximumRegistrations - ticketData.bookingCount || ""
        });
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };
    
    if(id) {
      fetchDetails();
    }
  }, [id]);

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
          <h1 className="text-2xl font-bold mb-4">Loading Ticket Details</h1>
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
    <div className="bg-gray-50 flex flex-col overflow-hidden items-stretch min-h-screen pt-4 md:pt-[26px] ">
      <main className="self-center flex w-full max-w-[1208px] flex-col items-stretch px-4 md:px-6">
        <Header logo={eventLogo} />
        
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
                  src={IMG_CDN + ticket.thumbnail} 
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
                    <span>Sales end: <span className="font-medium">
                    {new Date(ticket.salesEnd).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span></span>
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
                  
                    {/* <div>
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
                    </div> */}
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
              
              {/* <div className="mt-4 p-5 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex gap-3 items-start">
                  <AlertCircle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-800 mb-1">Limited Availability</h3>
                    <p className="text-sm text-yellow-700">
                      This ticket type is selling fast. Complete your registration soon to secure your spot.
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}