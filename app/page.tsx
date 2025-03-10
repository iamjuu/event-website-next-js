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

const Index = () => {
  const ticketSectionRef = useRef<HTMLDivElement>(null);
  const registerCardRef = useRef<HTMLDivElement>(null);
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  
  useEffect(() => {
    // Calculate content section height for proper sticky behavior
    const calculateHeights = () => {
      if (contentSectionRef.current) {
        setContentHeight(contentSectionRef.current.offsetHeight);
      }
    };
    
    // Initial calculation
    calculateHeights();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateHeights);
    
    // Handle scroll event to make the register card stop at ticket section
    const handleScroll = () => {
      if (!ticketSectionRef.current || !registerCardRef.current) return;
      
      const ticketRect = ticketSectionRef.current.getBoundingClientRect();
      const registerCard = registerCardRef.current;
      
      // Get distance from top of viewport to top of ticket section
      const ticketTop = ticketRect.top;
      
      // If ticket section is coming into view (with a small buffer)
      if (ticketTop < window.innerHeight) {
        // Calculate how far the ticket section is from entering the viewport
        // and move the register card up accordingly
        const offset = ticketTop - window.innerHeight;
        registerCard.style.transform = `translateY(${offset}px)`;
      } else {
        // Reset transform when ticket section is far below viewport
        registerCard.style.transform = 'translateY(0)';
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Call once to set initial position
    handleScroll();
    
    return () => {
      window.removeEventListener('resize', calculateHeights);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="bg-white flex flex-col overflow-hidden items-stretch pt-4 md:pt-[26px] pb-28 md:pb-32">
      <main className="self-center flex w-full max-w-[1208px] flex-col items-stretch px-4 md:px-6">
        <Header />
        <Hero />
        <div className="mt-6 md:mt-[25px] max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-full lg:w-[64%] max-md:w-full max-md:ml-0">
              <div ref={contentSectionRef} className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-6">
                <EventDetails />
                <AboutEvent />
                <KeyFeatures />
              </div>
            </div>
            <div className="w-full lg:w-[36%] lg:ml-5 max-md:w-full max-md:ml-0">
              <div 
                ref={registerCardRef} 
                style={{ 
                  position: 'sticky', 
                  top: '24px', 
                  height: 'fit-content',
                  transition: 'transform 0.3s ease-out',
                  zIndex: 10 
                }}
              >
                <RegisterCard />
              </div>
            </div>
          </div>
        </div>
        
        {/* Ticket Section - Full Width */}
        <div ref={ticketSectionRef}>
          <TicketSection />
        </div>
        
        {/* Sessions Section - Full Width */}
        <SessionsSection />
        
        {/* Speakers Section - Full Width */}
        <SpeakersSection />
        
        {/* Sponsors Section - Full Width */}
        <SponsorsSection />
        
        {/* Full width location map */}
        <LocationMap />
        
        <section className="text-black mt-8 md:mt-11 max-md:ml-0">
          <h2 className="text-xl md:text-2xl font-medium mb-3 md:mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-12 after:rounded-full after:bg-event-standard">
            About Organizer
          </h2>
          <p className="text-[rgba(14,14,14,1)] text-base md:text-lg font-light leading-6 md:leading-7 max-md:max-w-full">
            Kerala's biggest and most awaited dentistry expo is back in full
            force. KEDDA Dental Expo 2023 organized by Kerala Dental Dealers
            Association will be held on the 12th and 13th of August at CIAL
            Convention Center in Nedumbassery, Coachin. Don't miss out the
            Kerala's Biggest Dental Trade Fair. Schedule your visit to the CIAL
            Convention Center on the 12th and 13th of August 2023 for Kerala's
            Grand Dental Event, the KEDDA Dental Expo 2023.
            <br />
            <br />
            This expo will feature 100+ National and international exhibitors
            from the reputable dental industry displaying a comprehensive range
            of innovative dental equipments, consumables, and accessories. All
            dentists and dental professionals are invited to attend the expo,
            which is hosted by the Kerala Dental Dealers Association and take
            advantage of the exclusive expo discounts offered by the exhibitors.
          </p>
        </section>
        
        <div className="mt-8 text-center">
          <Button 
            // variant="event-standard"
            className="rounded-lg hover:bg-event-standard/90 transition-colors"
            asChild
          >
            <Link href="/single-showcase">
              View Single Item Showcase
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
