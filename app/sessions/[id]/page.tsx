"use client"

import React, { useState, useEffect } from "react";
import { Header } from "../../components/event/Header";
import { Footer } from "../../components/event/Footer";
import { CalendarDays, Clock, Users, Search, Theater, ArrowLeft, X, Tag } from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import { BlackImage } from "@/public";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";


type SessionType = "standard" | "premium" | "vip" | string;
type SessionDay = "day1" | "day2" | string;

type Speaker = {
  _id: string;
  value: string;
  name?: string;
  image?: string;
};

type SessionProps = {
  id: string;
  title: string;
  speaker: string;
  speakerTitle: string;
  time: string;
  date: string;
  audience: string;
  description: string;
  type: SessionType;
  day: SessionDay;
  stage: string;
};

const BACKEND_URL = process.env.BACKEND_URL ; 

const SessionCard = ({ session }: { session: SessionProps }) => {
  const sessionStyles = {
    standard: "border-l-primary-base bg-primary-lightest",
    premium: "border-l-primary-dark bg-primary-lighter",
    vip: "border-l-primary-darker bg-primary-lighter",
    seminar: "border-l-primary-base bg-primary-lightest", // Added mapping for "Seminar"
    workshop: "border-l-primary-dark bg-primary-lighter",
    panel: "border-l-primary-darker bg-primary-lighter"
  };

  const tagStyles = {
    standard: "bg-primary-lightest text-primary-base",
    premium: "bg-primary-lighter text-primary-dark",
    vip: "bg-primary-lighter text-primary-darker",
    seminar: "bg-primary-lightest text-primary-base", // Added mapping for "Seminar"
    workshop: "bg-primary-lighter text-primary-dark",
    panel: "bg-primary-lighter text-primary-darker"
  };

  // Get the session type style safely
  const getSessionStyle = (type: string) => {
    const normalizedType = type.toLowerCase();
    return sessionStyles[normalizedType] || sessionStyles.standard;
  };

  // Get the tag style safely
  const getTagStyle = (type: string) => {
    const normalizedType = type.toLowerCase();
    return tagStyles[normalizedType] || tagStyles.standard;
  };

  return (
    <div className={cn(
      "flex flex-col bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg border-l-4 p-5 md:p-6 h-full",
      getSessionStyle(session.type)
    )}>
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-lg md:text-xl text-neutral-800 mb-2">{session.title}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <div className={cn(
              "text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1",
              getTagStyle(session.type)
            )}>
              <Tag size={12} />
              <span className="capitalize">{session.type}</span>
            </div>
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-neutral-100 text-neutral-600">
              {session.day}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
          {/* <Image
            src={BlackImage}
            alt={session.speaker}
            width={48}
            height={48}
            className="rounded-full border-2 border-white shadow-sm"
          /> */}
          <div>
            <div className="font-medium text-base text-neutral-900">{session.speaker}</div>
            <div className="text-sm text-neutral-600">{session.speakerTitle}</div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-neutral-600 mb-6 line-clamp-3">{session.description || "No description available."}</p>
      
      <div className="mt-auto grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-neutral-500">
            <CalendarDays size={16} className="mr-2 shrink-0" />
            <span>{session.date}</span>
          </div>
          
          <div className="flex items-center text-sm text-neutral-500">
            <Clock size={16} className="mr-2 shrink-0" />
            <span>{session.time}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-neutral-500">
            <Theater size={16} className="mr-2 shrink-0" />
            <span className="truncate">{session.stage}</span>
          </div>
          
          <div className="flex items-center text-sm text-neutral-500">
            <Users size={16} className="mr-2 shrink-0" />
            <span className="truncate">{session.audience || "All Attendees"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterButton = ({ 
  active, 
  onClick, 
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
      active 
        ? "bg-primary-base text-white shadow-sm" 
        : "bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200"
    )}
  >
    {children}
  </button>
);

const Sessions = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  // const id = searchParams.get('id') || '';
  // console.log("id", id);
  const id = params?.id;
  // const router = useRouter();
  // const pathSegments = router.pathname.split("/");
  // const id = pathSegments[2];
  console.log(id);
  const [activeDay, setActiveDay] = useState<string>('all');
  const [activeStage, setActiveStage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [sessions, setSessions] = useState<SessionProps[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [stages, setStages] = useState<string[]>([]);

  const [eventLogo, setEventLogo] = useState(null);
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
    const fetchSessions = async () => {
      if (!id) return;
      
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/sessions?event=${id}`);
        const data = await response.json();
        
        // Transform the data to match the expected structure
        const formattedSessions = data.response.map((session: any) => {
          // Extract first speaker info or use default values
          const speakerName = session.speakers && session.speakers.length > 0 
            ? session.speakers[0].value || "Unknown Speaker" 
            : "Unknown Speaker";
            
          // Convert day value to day1 or day2 format
          const dayValue = session.day?.value || "";
          const simplifiedDay = dayValue.toLowerCase().replace(/\s+/g, '');
          
          return {
            id: session._id,
            title: session.title || "Untitled Session",
            speaker: speakerName,
            speakerTitle: "Speaker", // Default value as it's not in the API response
            time: `${new Date(session.startTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })} - ${new Date(session.endTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}`,
            date: new Date(session.startTime).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            audience: session.ticketType || "All Attendees",
            description: session.description || "",
            type: session.sessiontype?.value?.toLowerCase() || "standard",
            day: session.day?.value || "Unknown Day",
            stage: session.stage?.value || "Main Stage",
          };
        });
        
        setSessions(formattedSessions);
        
        // Extract unique days and stages for filters
        const uniqueDays = Array.from(new Set(formattedSessions.map(session => session.day)));
        const uniqueStages = Array.from(new Set(formattedSessions.map(session => session.stage)));
        
        setDays(uniqueDays);
        setStages(uniqueStages);
        
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    
    if (id) {
      fetchSessions();
    }
  }, [id]);

  const filteredSessions = sessions.filter(session => {
    const matchesDay = activeDay === 'all' || session.day === activeDay;
    const matchesStage = activeStage === 'all' || session.stage === activeStage;
    const matchesSearch = searchQuery === '' || 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (session.description && session.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesDay && matchesStage && matchesSearch;
  });

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchQuery('');
    }
  };

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header logo={eventLogo}/>
      </div>
      
      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="flex items-center text-sm text-neutral-600 hover:text-primary-base mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-1" />
          Back to Home
        </Link>
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Conference Sessions</h1>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSearch}
            className="relative hover:bg-neutral-100"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </Button>
        </div>
        
        {searchOpen && (
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6 transition-all duration-300 ease-in-out">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-neutral-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:ring-primary-base focus:border-primary-base transition-colors"
                placeholder="Search sessions, speakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        )}
        
        <div className="mb-8 bg-neutral-50 rounded-xl space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="p-3 shadow-sm overflow-x-auto scrollbar-hide flex-shrink-0">
              <div className="flex items-center gap-2">
                <FilterButton 
                  active={activeDay === 'all'} 
                  onClick={() => setActiveDay('all')}
                >
                  All Days
                </FilterButton>
                {days.map((day) => (
                  <FilterButton 
                    key={day}
                    active={activeDay === day} 
                    onClick={() => setActiveDay(day)}
                  >
                    {day}
                  </FilterButton>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl shadow-sm overflow-x-auto scrollbar-hide flex-shrink-0">
              <div className="flex items-center gap-2">
                <FilterButton 
                  active={activeStage === 'all'} 
                  onClick={() => setActiveStage('all')}
                >
                  All Stages
                </FilterButton>
                {stages.map((stage) => (
                  <FilterButton 
                    key={stage}
                    active={activeStage === stage} 
                    onClick={() => setActiveStage(stage)}
                  >
                    {stage}
                  </FilterButton>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {filteredSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-neutral-500 mb-4">No sessions match your filters</div>
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveDay('all');
                setActiveStage('all');
                setSearchQuery('');
                setSearchOpen(false);
              }}
              className="hover:bg-neutral-50"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Sessions;