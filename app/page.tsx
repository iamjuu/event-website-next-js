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
import { BlackImage } from "@/public";

const Index = () => {
  const ticketSectionRef = useRef<HTMLDivElement>(null);
  const registerCardRef = useRef<HTMLDivElement>(null);
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const ticketHeadingRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="bg-white flex flex-col items-stretch pt-4 md:pt-[26px] pb-28 md:pb-[70px]">
      {/* Removed overflow-hidden from this container */}
      <main className="self-center flex w-full max-w-[1208px] flex-col items-stretch px-4 md:px-6">
        <Header />
        <Hero />
        <div className="mt-6 md:mt-[25px] max-md:max-w-full">
          {/* This wrapping div is important for proper sticky context */}
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {/* Content column */}
            <div className="w-full lg:w-[64%] max-md:w-full max-md:ml-0">
              <div ref={contentSectionRef} className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-6">
                <EventDetails />
                <AboutEvent />
                <KeyFeatures />
              </div>
            </div>
            
            {/* Register card column */}
            <div className="w-full lg:w-[36%] lg:ml-5 max-md:w-full max-md:ml-0">
              {/* This is the sticky container - Fixed with proper top value */}
              <div 
                ref={registerCardRef}
                className=" sticky-container"
                style={{
                  position: "sticky",
                  top: "20px", /* Changed from 500px to 20px */
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
        
        {/* Ticket Section - Full Width */}
        <div className="relative">
          <h2 className="text-black text-xl md:text-2xl font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-[#4F46E5]">
            Tickets
          </h2>
        </div>
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
          <h2 className="text-xl md:text-2xl font-medium mb-3 md:mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-12 after:rounded-full">
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
      <StickyFooter />
    </div>
  );
};

export default Index;