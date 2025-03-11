
import React from "react";
import Link from "next/link";
import { Header } from "../components/event/Header";
import { Hero } from "../components/event/Hero";
import { EventDetails } from "../components/event/EventDetails";
import { AboutEvent } from "../components/event/AboutEvent";
import { KeyFeatures } from "../components/event/KeyFeatures";
import { LocationMap } from "../components/event/LocationMap";
import { RegisterCard } from "../components/event/RegisterCard";
import { Footer } from "../components/event/Footer";
import { SingleTicketSection } from "../components/event/SingleTicketSection";
import { SingleSessionSection } from "../components/event/SingleSessionSection";
import { SingleSpeakerSection } from "../components/event/SingleSpeakerSection";

const SingleItemShowcase = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden items-stretch pt-4 md:pt-[26px]">
      <main className="self-center flex w-full max-w-[1208px] flex-col items-stretch px-4 md:px-6">
        <Header />
        <Hero />
        <div className="mt-6 md:mt-[25px] max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-full lg:w-[64%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-6">
                <EventDetails />
                <AboutEvent />
                <KeyFeatures />
              </div>
            </div>
            <div className="w-full lg:w-[36%] lg:ml-5 relative max-md:w-full max-md:ml-0">
              <div className="sticky top-24 pb-[170px] mt-8 lg:mt-0">
                <RegisterCard />
              </div>
            </div>
          </div>
        </div>
        
        {/* Single Ticket Section - Full Width */}
        <SingleTicketSection />
        
        {/* Single Session Section - Full Width */}
        <SingleSessionSection />
        
        {/* Single Speaker Section - Full Width */}
        <SingleSpeakerSection />
        
        {/* Full width location map */}
        <LocationMap />
        
        <section className="text-black text-xl md:text-[22px] font-medium leading-normal md:leading-[60px] mt-8 md:mt-11 max-md:ml-0">
          <h2 className="mb-3 md:mb-0">About Organaizer</h2>
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
          <Link 
            href="/" 
            className="inline-block px-6 py-3 bg-event-standard text-white rounded-lg hover:bg-event-standard/90 transition-colors"
          >
            Back to Main Page
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SingleItemShowcase;
