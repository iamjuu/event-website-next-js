"use client"
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "./components/event/Header";
import { Hero } from "./components/event/Hero";
import { EventDetails } from "./components/event/EventDetails";
import { AboutEvent } from "./components/event/AboutEvent";
import { KeyFeatures } from "./components/event/KeyFeatures";
import { LocationMap } from "./components/event/LocationMap";
import { RegisterCard } from "./components/event/RegisterCard";
import { Footer } from "./components/event/Footer";
import { TicketSection } from "./components/event/TicketSection";
import { SessionsSection } from "./components/event/SessionsSection";
import { SpeakersSection } from "./components/event/SpeakersSection";
import { SponsorsSection } from "./components/event/SponsorsSection";
import { Button } from "./components/ui/button";
import { StickyFooter } from "./components/event/StickyFooter";
import { eventService, sessionService, useEvent } from "./api/api";
import { BlackImage } from "@/public";

const Index = () => {
  const { eventId, error, loading } = useEvent();
  const [eventData, setEventData] = useState();
  // useEffect(() => {
  //   const fetchEventData = async () => {
  //     if (!eventId) {
  //       console.log("No event ID available");
  //       return;
  //     }

  //     try {
  //       const data = await eventService.getEventDetails(eventId);
  //       console.log("Event details data:", data);
  //     } catch (error) {
  //       console.error("Error fetching event details:", error);
  //     }
  //   };

  //   fetchEventData();
  // }, [eventId]);

  useEffect(()=>{
    const fetchEventData = async ()=>{
    const response = await fetch(
      // `${API_ENDPOINTS.EVENT}?domain=${window.location.hostname}`
      `https://backend-endpoint.eventhex.ai/api/v1/auth/domain-event?domain=my-event.eventhex.ai`);
      const data = await response.json()
      console.log("Data", data);
      setEventData(data?.domainData?.domain);
    }
  
    fetchEventData();
  },[]);

  if (loading) {


    return <div>Loading...</div>;
  }

  if (error || !eventData) {
    return <div>Error: {error}</div>;
  }

  const ticketSectionRef = useRef<HTMLDivElement>(null);
  const registerCardRef = useRef<HTMLDivElement>(null);
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const ticketHeadingRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="bg-white flex flex-col items-stretch pt-4 md:pt-[26px] pb-28 md:pb-[70px]">
      <Header logo={eventData.logo} title={eventData.title} />
      <main className="self-center flex w-full max-w-[1208px] flex-col items-stretch px-4">
        <Hero 
          title={eventData.title}
          banner={eventData.banner}
          startDate={eventData.startDate}
          venue={eventData.venue}
        />
        
        <div className="mt-6 md:mt-[25px] max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-full lg:w-[64%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-6">
                <EventDetails 
                  startDate={eventData.startDate}
                  endDate={eventData.endDate}
                  venue={eventData.venue}
                />
                <AboutEvent description={eventData.description} />
                <KeyFeatures />
              </div>
            </div>
            
            <div className="w-full lg:w-[36%] lg:ml-5 max-md:w-full max-md:ml-0">
              <div 
                ref={registerCardRef}
                className=" sticky-container"
                style={{
                  position: "sticky",
                  top: "20px",
                  display: "block",
                  height: "max-content",
                  maxHeight: "calc(100vh - 40px)",
                  overflowY: "auto",
                  zIndex: 40
                }}
              >
                <RegisterCard />
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          {/* <h2 className="text-black text-xl md:text-2xl font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-[#4F46E5]">
            Tickets
          </h2> */}
        </div>
        <div ref={ticketSectionRef}>
          <TicketSection />
        </div>
        
        <SessionsSection />
        
        <SpeakersSection />
        
        <SponsorsSection />
        
        <LocationMap />
        
      </main>
      <Footer />
      <StickyFooter />
    </div>
  );
};

export default Index;