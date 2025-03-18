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
  // const { eventId, error, loading } = useEvent();/
  const [eventData, setEventData] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  const ticketSectionRef = useRef<HTMLDivElement>(null);
  const registerCardRef = useRef<HTMLDivElement>(null);
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const ticketHeadingRef = useRef<HTMLDivElement>(null);

  const BACKEND_URL = 'https://backend-endpoint.eventhex.ai';
  
  useEffect(()=>{
    const fetchDetails = async ()=>{
      const response = await fetch(
        // `https://backend-endpoint.eventhex.ai/api/v1/auth/domain-event?domain=${window.location.hostname}`
        `${BACKEND_URL}/api/v1/auth/domain-event?domain=my-event.eventhex.ai`
        
      );
      const data = await response.json();
      setEventData(data.domainData.event);
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
          const extractedTickets = data.response.map((ticket) => ({
            title: ticket.title,
            id: ticket._id,
            thumbnail: ticket.thumbnail,
            shortDescription: ticket.shortDescription,
            location: eventData?.venue,
            date: ticket.startDate,
            price : ticket?.paymentAmount || "Free" // Assuming `date` is the `startDate`
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
          const extractedSpeakers = data.response.map((speaker) => ({
            name: speaker.name,
            title: speaker.designation,
            image: speaker.photo,
            type: speaker.type || "standard",
          }));
          setSpeakers(extractedSpeakers);
          console.log("Extracted Speakers:", extractedSpeakers);
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
        console.log(data,'dafdsgs')
        // Transform the data to match the expected structure
        const formattedSessions = data.response.map((session: any) => ({
          title: session.title,
          speakers: session.speakers.map((speaker: any) => ({
            name: speaker.value,
            image: speaker.photo, // Fallback to BlackImage if no image
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
          type: session.sessiontype?.value?.toLowerCase() || "standard",
        }));
        console.log(formattedSessions,'formtted');
        
        setSessions(formattedSessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
  
    if (!eventData?._id) return;
    else
    fetchDetails();
  }, [eventData?._id]);

  useEffect(()=>{

    const fetchSponors = async ()=>{
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/sponsors?event=${eventData?._id}`
        );
        const data = await response.json();
        console.log(data, "sponsors");
        if (data?.response && Array.isArray(data.response)) {
          const extractedSponsors = data.response.map((sponsor) => ({
            id: sponsor._id,
            name: sponsor.name,
            logoUrl : sponsor.logo,
            tier: sponsor.segment || "standard",
          }));
          setSponsors(extractedSponsors);
          console.log("Extracted Spondors:", extractedSponsors);
        } else {
          console.warn("Invalid sponsros data format:", data);
        }
  
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      }
    }

    if (!eventData?._id) return ;
    fetchSponors();

  },[eventData?._id])
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error || !eventData) {
  //   return <div>Error: {error}</div>;
  // }

  
  return (
    <div className="bg-white flex flex-col items-stretch pt-4 md:pt-[26px] pb-28 md:pb-[70px]">
     {eventData && <Header logo={eventData?.logo} title={eventData?.title} />}
      <main className="self-center flex w-full max-w-[1208px] flex-col  items-stretch px-4">
        <Hero 
          title={eventData?.title}
          banner={eventData?.banner}
        />
        
        <div className="mt-6 md:mt-[25px] max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-full lg:w-[64%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-6">
                <EventDetails 
                  startDate={eventData?.startDate}
                  endDate={eventData?.endDate}
                  venue={eventData?.venue}
                />
                <AboutEvent description={eventData?.description} />
                {/* <KeyFeatures /> */}
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
                <RegisterCard 
                venue={eventData?.venue} 
                title={eventData?.title} 
                date={eventData?.startDate}
                facebook={eventData?.facebook}
                whatsapp={eventData?.whatsapp}
                linkedin={eventData?.linkedin}
                instagram={eventData?.instagram}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative">
        
        </div>
        <div ref={ticketSectionRef}>
          {tickets.length > 1 && <TicketSection tickets = {tickets}/>}
        </div>
        
        {sessions.length  && <SessionsSection sessions={sessions} eventId={eventData?._id} />}
        
        {speakers.length && <SpeakersSection speakers ={speakers} eventId = {eventData?._id} />}
        
        {sponsors.length && <SponsorsSection sponsors={sponsors} />}
        
        <LocationMap />
      </main>
      <Footer />
      <StickyFooter title = {eventData?.title} venue={eventData?.venue} date={eventData?.startDate} price={eventData?.price || "Free"}/>
    </div>
  );
};

export default Index;