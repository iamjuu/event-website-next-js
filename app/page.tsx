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
import { BlackImage, NoImage } from "@/public";
import { updateThemeColors } from "./utils/theme";

interface EventData {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  banner: string;
  logo: string;
  price?: string;
  facebook?: string;
  whatsapp?: string;
  linkedin?: string;
  instagram?: string;
  themeColor?: string;
  themeTextColor?: string;
  secondaryColor?: string;
  secondaryTextColor?: string;
  theme?: {
    primary?: {
      darker?: string;
      dark?: string;
      base?: string;
      lighter?: string;
      lightest?: string;
    };
    eventStandard?: string;
    eventPremium?: string;
    eventVip?: string;
  };
}

interface Ticket {
  title: string;
  id: string;
  thumbnail: string;
  shortDescription: string;
  location: string;
  date: string;
  price: string;
}

interface Speaker {
  name: string;
  title: string;
  image: string;
  type: string;
}

interface Session {
  title: string;
  speakers: {
    name: string;
    image: string;
  }[];
  date: string;
  time: string;
  stage: string;
  type: "standard" | "premium" | "vip";
}

interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  tier: string;
}

const Index = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  const ticketSectionRef = useRef<HTMLDivElement>(null);
  const registerCardRef = useRef<HTMLDivElement>(null);
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const ticketHeadingRef = useRef<HTMLDivElement>(null);

  const BACKEND_URL = 'https://backend-endpoint.eventhex.ai';
  
  useEffect(()=>{
    const fetchDetails = async ()=>{
      const response = await fetch(
        `${BACKEND_URL}/api/v1/auth/domain-event?domain=my-event.eventhex.ai`
      );
      const data = await response.json();
      setEventData(data.domainData.event);
      
      // Update theme colors if they exist in the response
      if (data.domainData.event.theme) {
        updateThemeColors(data.domainData.event.theme);
      }

      // Fetch and apply certification theme data
      const themeResponse = await fetch(`${BACKEND_URL}/api/v1/app-setting?event=${data.domainData?.event?._id}`);
      const themeData = await themeResponse.json();
      
      if (themeData?.response?.[0]) {
        const themeColors = themeData.response[0];
        updateThemeColors({
          primary: {
            darker: themeColors.primaryDarker,
            dark: themeColors.primaryDark,
            base: themeColors.primaryBase,
            lighter: themeColors.primaryLighter,
            lightest: themeColors.primaryLightest
          }
        });
      }
 
      // Update direct theme colors if they exist
      if (data.domainData.event.themeColor || data.domainData.event.themeTextColor || 
          data.domainData.event.secondaryColor || data.domainData.event.secondaryTextColor) {
        updateThemeColors({
          themeColor: data.domainData.event.themeColor,
          themeTextColor: data.domainData.event.themeTextColor,
          secondaryColor: data.domainData.event.secondaryColor,
          secondaryTextColor: data.domainData.event.secondaryTextColor
        });
      }
    }
    fetchDetails();
  },[])

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/ticket?event=${eventData?._id}`
        );
        const data = await response.json();
        
        if (data?.response && Array.isArray(data.response)) {
          const extractedTickets = data.response.map((ticket: any) => ({
            title: ticket.title,
            id: ticket._id,
            thumbnail: ticket.thumbnail || NoImage,
            shortDescription: ticket.shortDescription,
            location: eventData?.venue || '',
            date: ticket.startDate,
            price: ticket?.paymentAmount || "Free"
          }));
          setTickets(extractedTickets);
        } else {
          console.warn("Invalid ticket data format:", data);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
  
    if (!eventData?._id) return;
    fetchDetails();
  }, [eventData?._id]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/speakers?event=${eventData?._id}`
        );
        const data = await response.json();
        if (data?.response && Array.isArray(data.response)) {
          const extractedSpeakers = data.response.map((speaker: any) => ({
            name: speaker.name,
            title: speaker.designation,
            image: speaker.photo,
            type: speaker.type || "standard",
          }));
          setSpeakers(extractedSpeakers);
        } else {
          console.warn("Invalid speakers data format:", data);
        }
      } catch (error) {
        console.error("Error fetching speakers:", error);
      }
    };
  
    if (!eventData?._id) return;
    fetchDetails();
  }, [eventData?._id]);
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/sessions?event=${eventData?._id}`
        );
        const data = await response.json();
        
        const formattedSessions = data.response.map((session: any) => ({
          title: session.title,
          speakers: session.speakers.map((speaker: any) => ({
            name: speaker.value,
            image: speaker.photo,
          })),
          date: new Date(session.startTime).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          time: `${new Date(session.startTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })} - ${new Date(session.endTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}`,
          stage: session.stage?.value || "Unknown Stage",
          type: session.sessiontype?.value?.toLowerCase() === "standard" ? "standard" : session.sessiontype?.value?.toLowerCase() === "premium" ? "premium" : "vip",
        }));
        
        setSessions(formattedSessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
  
    if (!eventData?._id) return;
    fetchDetails();
  }, [eventData?._id]);

  useEffect(()=>{
    const fetchSponors = async ()=>{
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/sponsors?event=${eventData?._id}`
        );
        const data = await response.json();
        if (data?.response && Array.isArray(data.response)) {
          const extractedSponsors = data.response.map((sponsor: any) => ({
            id: sponsor._id,
            name: sponsor.name,
            logoUrl: sponsor.logo,
            tier: sponsor.segment || "standard",
          }));
          setSponsors(extractedSponsors);
        } else {
          console.warn("Invalid sponsors data format:", data);
        }
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      }
    }

    if (!eventData?._id) return;
    fetchSponors();
  },[eventData?._id])
  
  return (
    <div className="bg-white flex flex-col items-stretch pt-4 md:pt-[26px] pb-28 md:pb-[70px]">
      {eventData && <Header logo={eventData.logo} />}
      
      {/* Theme Test Buttons */}
      <div className="flex flex-wrap gap-4 p-4 justify-center">
        <button className="px-4 py-2 rounded-lg bg-theme text-theme-text hover:bg-theme/90">
          Theme Button
        </button>
        <button className="px-4 py-2 rounded-lg bg-primary-base text-white hover:bg-primary-dark">
          Primary Base
        </button>
        <button className="px-4 py-2 rounded-lg bg-primary-dark text-white hover:bg-primary-darker">
          Primary Dark
        </button>
        <button className="px-4 py-2 rounded-lg bg-primary-lighter text-primary-base hover:bg-primary-lightest">
          Primary Lighter
        </button>
        <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-text hover:bg-secondary/90">
          Secondary Button
        </button>
      </div>

      <main className="self-center flex w-full max-w-[1208px] flex-col items-stretch px-4">
        <Hero 
          banner={eventData?.banner || ''}
        />
        
        <div className="mt-6 md:mt-[25px] max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-full lg:w-[64%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-6">
                <EventDetails 
                  startDate={eventData?.startDate || ''}
                  endDate={eventData?.endDate || ''}
                  venue={eventData?.venue || ''}
                />
                <AboutEvent description={eventData?.description || ''} />
              </div>
            </div>
            
            <div className="w-full lg:w-[36%] lg:ml-5 max-md:w-full max-md:ml-0">
              <div 
                ref={registerCardRef}
                className="sticky-container"
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
                <RegisterCard 
                  venue={eventData?.venue || ''} 
                  title={eventData?.title || ''} 
                  date={eventData?.startDate || ''}
                  facebook={eventData?.facebook || ''}
                  instagram={eventData?.instagram || ''}
                  twitter=""
                  linkedin={eventData?.linkedin || ''}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative">
        </div>
        <div ref={ticketSectionRef}>
          {tickets.length > 1 && <TicketSection tickets={tickets}/>}
        </div>
        
        {sessions.length && <SessionsSection sessions={sessions as any} eventId={eventData?._id || ''} />}
        
        {speakers.length && <SpeakersSection speakers={speakers as any} eventId={eventData?._id || ''} />}
        
        {sponsors.length && <SponsorsSection sponsors={sponsors as any} />}
        
        <LocationMap />
      </main>
      <Footer />
      <StickyFooter 
        title={eventData?.title || ''} 
        venue={eventData?.venue || ''} 
        date={eventData?.startDate || ''} 
        price={eventData?.price || "Free"}
      />
    </div>
  );
};

export default Index;