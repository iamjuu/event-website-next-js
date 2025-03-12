"use client"

import React, { useState } from "react";
import { Header } from "../components/event/Header";
import { Footer } from "../components/event/Footer";
import { CalendarDays, Clock, Users, Search, Theater, ArrowLeft, X, Tag } from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import Image from "next/image";
import { BlackImage } from "@/public";
type SessionType = "standard" | "premium" | "vip";
type SessionDay = "day1" | "day2";

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

const SessionCard = ({ session }: { session: SessionProps }) => {
  const sessionStyles = {
    standard: "border-l-primary-base bg-primary-lightest",
    premium: "border-l-primary-dark bg-primary-lighter",
    vip: "border-l-primary-darker bg-primary-lighter"
  };

  const tagStyles = {
    standard: "bg-primary-lightest text-primary-base",
    premium: "bg-primary-lighter text-primary-dark",
    vip: "bg-primary-lighter text-primary-darker"
  };

  return (
    <div className={cn(
      "flex flex-col bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg border-l-4 p-5 md:p-6 h-full",
      sessionStyles[session.type]
    )}>
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-lg md:text-xl text-neutral-800 mb-2">{session.title}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <div className={cn(
              "text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1",
              tagStyles[session.type]
            )}>
              <Tag size={12} />
              <span className="capitalize">{session.type}</span>
            </div>
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-neutral-100 text-neutral-600">
              {session.day === 'day1' ? 'Day 1' : 'Day 2'}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
          {/* <Image
          src={BlackImage}
            // src={`${BlackImage} ${session.speaker.toLowerCase().replace(/\s+/g, '-')}.jpg`}
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
      
      <p className="text-sm text-neutral-600 mb-6 line-clamp-3">{session.description}</p>
      
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
            <span className="truncate">{session.audience}</span>
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

const Sessions = () => {
  const [activeDay, setActiveDay] = useState<SessionDay | 'all'>('all');
  const [activeStage, setActiveStage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const sessions: SessionProps[] = [
    {
      id: "session1",
      title: "Future of Dental Technology",
      speaker: "Dr. Priya Sharma",
      speakerTitle: "Director, Indian Dental Association",
      time: "10:00 AM - 11:30 AM",
      date: "August 24, 2024",
      audience: "General Dentists, Specialists",
      description: "Discover the latest advancements in dental technology and how they can be implemented in your practice for better patient outcomes.",
      type: "standard",
      day: "day1",
      stage: "Main Stage"
    },
    {
      id: "session2",
      title: "Advanced Implantology Workshop",
      speaker: "Dr. Rajiv Mehta",
      speakerTitle: "Senior Implantologist, Mumbai Dental College",
      time: "1:00 PM - 3:30 PM",
      date: "August 24, 2024",
      audience: "Implantologists, Oral Surgeons",
      description: "This hands-on workshop covers advanced techniques in dental implantology with focus on complex cases and digital planning.",
      type: "premium",
      day: "day1",
      stage: "Workshop Room B"
    },
    {
      id: "session3",
      title: "Digital Smile Design Masterclass",
      speaker: "Dr. Ananya Desai",
      speakerTitle: "Cosmetic Dentistry Expert",
      time: "11:00 AM - 1:00 PM",
      date: "August 25, 2024",
      audience: "Cosmetic Dentists, Prosthodontists",
      description: "Learn how to implement Digital Smile Design in your practice to enhance treatment planning and patient communication.",
      type: "vip",
      day: "day2",
      stage: "Workshop Room A"
    },
    {
      id: "session4",
      title: "Pediatric Dentistry Update",
      speaker: "Dr. Sunil Kumar",
      speakerTitle: "Pediatric Dentistry Specialist",
      time: "3:00 PM - 4:30 PM",
      date: "August 24, 2024",
      audience: "Pediatric Dentists, General Practitioners",
      description: "Stay current with the latest research and techniques in treating pediatric dental patients with emphasis on behavior management.",
      type: "standard",
      day: "day1",
      stage: "Panel Room"
    },
    {
      id: "session5",
      title: "Business of Dentistry",
      speaker: "Dr. Ritu Verma",
      speakerTitle: "Dental Practice Management Consultant",
      time: "9:30 AM - 11:00 AM",
      date: "August 25, 2024",
      audience: "Practice Owners, Office Managers",
      description: "Essential strategies for dental practice growth, staff management, and increasing profitability in competitive markets.",
      type: "premium",
      day: "day2",
      stage: "Main Stage"
    },
    {
      id: "session6",
      title: "Endodontic Microsurgery",
      speaker: "Dr. Vikram Singh",
      speakerTitle: "Endodontic Specialist, Delhi Dental Institute",
      time: "2:00 PM - 4:00 PM",
      date: "August 25, 2024",
      audience: "Endodontists, Oral Surgeons",
      description: "Advanced surgical techniques in endodontics using microscopes and modern instruments for improved outcomes in complex cases.",
      type: "vip",
      day: "day2",
      stage: "Workshop Room B"
    }
  ];

  const stages = Array.from(new Set(sessions.map(session => session.stage)));

  const filteredSessions = sessions.filter(session => {
    const matchesDay = activeDay === 'all' || session.day === activeDay;
    const matchesStage = activeStage === 'all' || session.stage === activeStage;
    const matchesSearch = searchQuery === '' || 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase());
    
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
        <Header />
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
                <FilterButton 
                  active={activeDay === 'day1'} 
                  onClick={() => setActiveDay('day1')}
                >
                  Day 1 (Aug 24)
                </FilterButton>
                <FilterButton 
                  active={activeDay === 'day2'} 
                  onClick={() => setActiveDay('day2')}
                >
                  Day 2 (Aug 25)
                </FilterButton>
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
