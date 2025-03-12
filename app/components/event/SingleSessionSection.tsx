
import React from "react";
import { Clock, Users, CalendarDays, MapPin } from "lucide-react";
import { cn } from "../../lib/utils";

type SessionProps = {
  id: string;
  title: string;
  speakers: Array<{
    name: string;
    imageUrl: string;
  }>;
  time: string;
  date: string;
  stage: string;
  description: string;
  type: "standard" | "premium" | "vip";
};

const SingleSession = ({ session }: { session: SessionProps }) => {
  const colorVariants = {
    standard: "border-event-standard/70 bg-event-standard-light/30",
    premium: "border-event-premium/70 bg-event-premium-light/30",
    vip: "border-event-vip/70 bg-event-vip-light/30"
  };

  return (
    <div className={cn(
      "flex flex-col bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border-l-4 p-6 md:p-8",
      colorVariants[session.type]
    )}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-xl md:text-2xl text-gray-800">{session.title}</h3>
      </div>
      
      <p className="text-gray-600 mb-6">{session.description}</p>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center px-3 py-1.5 bg-gray-100 rounded-full">
          <CalendarDays size={16} className="mr-2 text-gray-500" />
          <span className="text-sm">{session.date}</span>
        </div>
        
        <div className="flex items-center px-3 py-1.5 bg-gray-100 rounded-full">
          <Clock size={16} className="mr-2 text-gray-500" />
          <span className="text-sm">{session.time}</span>
        </div>
        
        <div className="flex items-center px-3 py-1.5 bg-gray-100 rounded-full">
          <MapPin size={16} className="mr-2 text-gray-500" />
          <span className="text-sm">{session.stage}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Speakers</h4>
        <div className="flex flex-wrap gap-4">
          {session.speakers.map((speaker, index) => (
            <div key={index} className="flex items-center bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm">
              <img 
                src={speaker.imageUrl} 
                alt={speaker.name} 
                className="w-8 h-8 rounded-full object-cover mr-2"
              />
              <span className="text-sm text-gray-700">{speaker.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-auto">
        <button className="px-4 py-2 bg-event-standard text-white rounded-lg hover:bg-event-standard/90 transition-colors">
          Add to Calendar
        </button>
      </div>
    </div>
  );
};

export const SingleSessionSection = () => {
  const session: SessionProps = {
    id: "session2",
    title: "Advanced Implantology Workshop",
    description: "This comprehensive workshop explores the latest techniques and technologies in dental implantology. Participants will learn about immediate loading protocols, digital planning, and managing complex cases through demonstrations and discussions.",
    speakers: [
      { 
        name: "Dr. Rajiv Mehta", 
        imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
      },
      { 
        name: "Dr. Ananya Desai", 
        imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
      }
    ],
    time: "1:00 PM - 3:30 PM",
    date: "August 24, 2024",
    stage: "Workshop Room B",
    type: "premium"
  };

  return (
    <section className="w-full">
      <h2 className="text-xl md:text-2xl font-medium mb-5">Featured Session</h2>
      <SingleSession session={session} />
    </section>
  );
};
