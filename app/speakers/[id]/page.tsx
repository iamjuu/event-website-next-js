"use client"

import React, { useState, useEffect } from "react";
import { Header } from "../../components/event/Header";
import { Footer } from "../../components/event/Footer";
import { Search, ArrowLeft, X, Building2, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BlackImage } from "@/public";

type SpeakerType = "standard" | "premium" | "vip";

type SpeakerProps = {
  id: string;
  name: string;
  title: string;
  organization: string;
  location: string;
  specialization: string;
  description: string;
  image: string;
  type: SpeakerType;
};

const speakerStyles = {
  standard: "border-t-primary-base bg-primary-lightest",
  premium: "border-t-primary-dark bg-primary-lighter",
  vip: "border-t-primary-darker bg-primary-lighter"
};

const SpeakerCard = ({ speaker }: { speaker: SpeakerProps }) => {
 
  const IMG_CDN = process.env.IMG_CDN;
  return (
    <div className={cn(
      "flex flex-col bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg border-t-4 p-5 md:p-6 h-full",
      speakerStyles[speaker.type]
    )}>
      <div className="flex flex-col items-center mb-4">
        <Image
          src={IMG_CDN + speaker.image || BlackImage}
          alt={speaker.name}
          width={120}
          height={120}
          className="rounded-full mb-4 border-2 border-white shadow-sm"
        />
        <div className="text-center">
          <h3 className="font-semibold text-lg md:text-xl text-gray-800 mb-1">{speaker.name}</h3>
          <div className={cn(
            "text-xs font-medium px-2 py-1 rounded-full inline-block mb-2",
            speaker.type === "standard" ? "bg-primary-lightest text-primary-base" :
            speaker.type === "premium" ? "bg-primary-lighter text-primary-dark" :
            "bg-primary-lighter text-primary-darker"
          )}>
            {speaker.title}
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-3 text-center">{speaker.description}</p>
      
      <div className="mt-auto space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <Building2 size={16} className="mr-2 shrink-0" />
          <span className="truncate">{speaker.organization}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <MapPin size={16} className="mr-2 shrink-0" />
          <span>{speaker.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Users size={16} className="mr-2 shrink-0" />
          <span>{speaker.specialization}</span>
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
        ? "bg-primary-base text-white" 
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    )}
  >
    {children}
  </button>
);

const Speakers = ({ params }: { params: { id: string } }) => {
  const [activeType, setActiveType] = useState<SpeakerType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [speakers, setSpeakers] = useState<SpeakerProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const eventId = params?.id;
  const BACKEND_URL = 'https://backend-endpoint.eventhex.ai';
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
    const fetchSpeakers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/speakers?event=${eventId}`
        );
        const data = await response.json();
        if (data?.response && Array.isArray(data.response)) {
          const extractedSpeakers = data.response.map((speaker, index) => ({
            id: speaker.id || `speaker-${index}`,
            name: speaker.name || "Unknown Speaker",
            title: speaker.designation || "Speaker",
            organization: speaker.company || "Organization",
            description: speaker.description || "No description available",
            location: speaker.location || "Location not specified",
            specialization: speaker.specialization || "General",
            image: speaker.photo || BlackImage,
            type: (speaker.type as SpeakerType) || "standard",
          }));
          setSpeakers(extractedSpeakers);
        } else {
          console.warn("Invalid speakers data format:", data);
          // Fallback to sample data in case of error
          setSpeakers(sampleSpeakers);
        }
      } catch (error) {
        console.error("Error fetching speakers:", error);
        // Fallback to sample data in case of error
        setSpeakers(sampleSpeakers);
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchSpeakers();
    } else {
      setSpeakers(sampleSpeakers);
      setIsLoading(false);
    }
  }, [eventId]);


  const filteredSpeakers = speakers?.filter(speaker => {
    const matchesType = activeType === 'all' || speaker.type === activeType;
    const matchesSearch = searchQuery === '' || 
      speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSearch;
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
        <Link href="/" className="flex items-center text-sm text-gray-600 hover:text-event-standard mb-4 transition-colors">
          <ArrowLeft size={16} className="mr-1" />
          Back to Home
        </Link>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Conference Speakers</h1>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSearch}
            className="relative"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </Button>
        </div>
        
        {searchOpen && (
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6 transition-all duration-300 ease-in-out">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-event-standard focus:border-event-standard"
                placeholder="Search speakers, specializations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        )}
        
        {/* <div className="mb-6">
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2">
              <FilterButton 
                active={activeType === 'all'} 
                onClick={() => setActiveType('all')}
              >
                All Speakers
              </FilterButton>
              <FilterButton 
                active={activeType === 'standard'} 
                onClick={() => setActiveType('standard')}
              >
                Dental Surgeons
              </FilterButton>
              <FilterButton 
                active={activeType === 'premium'} 
                onClick={() => setActiveType('premium')}
              >
                Specialists
              </FilterButton>
              <FilterButton 
                active={activeType === 'vip'} 
                onClick={() => setActiveType('vip')}
              >
                Expert Consultants
              </FilterButton>
            </div>
          </div>
        </div> */}
        
        {isLoading ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-gray-500 mb-4">Loading speakers...</div>
          </div>
        ) : filteredSpeakers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpeakers.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-gray-500 mb-4">No speakers match your filters</div>
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveType('all');
                setSearchQuery('');
                setSearchOpen(false);
              }}
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

export default Speakers;