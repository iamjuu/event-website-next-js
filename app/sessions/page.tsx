
import React, { useState } from "react";
import { Header } from "../components/event/Header";
import { Footer } from "../components/event/Footer";
import { CalendarDays, Clock, Users, Search, Theater, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";

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
  const colorVariants = {
    standard: "border-event-standard/70 bg-event-standard-light/30",
    premium: "border-event-premium/70 bg-event-premium-light/30",
    vip: "border-event-vip/70 bg-event-vip-light/30"
  };

  const iconColorVariants = {
    standard: "text-event-standard bg-event-standard-light/80",
    premium: "text-event-premium bg-event-premium-light/80",
    vip: "text-event-vip bg-event-vip-light/80"
  };

  return (
    <div className={cn(
      "flex flex-col bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border-l-4 p-5 md:p-6 h-full",
      colorVariants[session.type]
    )}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-lg md:text-xl text-gray-800">{session.title}</h3>
        <div className={cn(
          "text-xs font-medium px-2 py-1 rounded-full",
          iconColorVariants[session.type]
        )}>
          {session.type}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="font-medium text-base">{session.speaker}</div>
        <div className="text-sm text-gray-600">{session.speakerTitle}</div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{session.description}</p>
      
      <div className="mt-auto flex flex-col gap-2">
        <div className="flex items-center text-sm text-gray-500">
          <CalendarDays size={16} className="mr-2 shrink-0" />
          <span>{session.date}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={16} className="mr-2 shrink-0" />
          <span>{session.time}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Theater size={16} className="mr-2 shrink-0" />
          <span className="truncate">{session.stage}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Users size={16} className="mr-2 shrink-0" />
          <span>{session.audience}</span>
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
        ? "bg-event-standard text-white" 
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header />
      </div>
      
      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="flex items-center text-sm text-gray-600 hover:text-event-standard mb-4 transition-colors">
          <ArrowLeft size={16} className="mr-1" />
          Back to Home
        </Link>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Conference Sessions</h1>
          
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
                placeholder="Search sessions, speakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        )}
        
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm overflow-x-auto scrollbar-hide flex-shrink-0">
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

            <div className="bg-white p-3 rounded-lg shadow-sm overflow-x-auto scrollbar-hide flex-shrink-0">
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
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-gray-500 mb-4">No sessions match your filters</div>
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveDay('all');
                setActiveStage('all');
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

export default Sessions;
