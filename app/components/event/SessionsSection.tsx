
import React from "react";
import { Clock, Users, CalendarDays } from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "../ui/carousel";

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
  type: "standard" | "premium" | "vip";
};

const SessionCard = ({ session }: { session: SessionProps }) => {
  const colorVariants = {
    standard: "border-event-standard/70 bg-event-standard-light/50",
    premium: "border-event-premium/70 bg-event-premium-light/50",
    vip: "border-event-vip/70 bg-event-vip-light/50"
  };

  return (
    <div className={cn(
      "flex flex-col bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md border-l-4 p-4 h-full",
      colorVariants[session.type]
    )}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-base md:text-lg text-gray-800">{session.title}</h3>
      </div>
      
      <div className="flex gap-2 flex-wrap mb-3">
        {session.speakers.map((speaker, index) => (
          <div key={index} className="flex items-center">
            <img 
              src={speaker.imageUrl} 
              alt={speaker.name} 
              className="w-6 h-6 rounded-full object-cover mr-2"
            />
            <span className="text-sm text-gray-600">{speaker.name}</span>
            {index < session.speakers.length - 1 && <span className="mx-1">•</span>}
          </div>
        ))}
      </div>
      
      <div className="mt-auto flex flex-col gap-1.5">
        <div className="flex items-center text-xs text-gray-500">
          <CalendarDays size={14} className="mr-1.5" />
          <span>{session.date}</span>
        </div>
        
        <div className="flex items-center text-xs text-gray-500">
          <Clock size={14} className="mr-1.5" />
          <span>{session.time}</span>
        </div>
        
        <div className="flex items-center text-xs text-gray-500">
          <Users size={14} className="mr-1.5" />
          <span>{session.stage}</span>
        </div>
      </div>
    </div>
  );
};

export const SessionsSection = () => {
  const sessions: SessionProps[] = [
    {
      id: "session1",
      title: "Future of Dental Technology",
      speakers: [
        { 
          name: "Dr. Priya Sharma", 
          imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
        },
        { 
          name: "Dr. Amit Patel", 
          imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
        }
      ],
      time: "10:00 AM - 11:30 AM",
      date: "August 24, 2024",
      stage: "Main Stage",
      type: "standard"
    },
    {
      id: "session2",
      title: "Advanced Implantology Workshop",
      speakers: [
        { 
          name: "Dr. Rajiv Mehta", 
          imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
        }
      ],
      time: "1:00 PM - 3:30 PM",
      date: "August 24, 2024",
      stage: "Workshop Room",
      type: "premium"
    },
    {
      id: "session3",
      title: "Digital Smile Design Masterclass",
      speakers: [
        { 
          name: "Dr. Ananya Desai", 
          imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
        }
      ],
      time: "11:00 AM - 1:00 PM",
      date: "August 25, 2024",
      stage: "Workshop Room",
      type: "vip"
    },
    {
      id: "session4",
      title: "Panel: Future of Dental Education",
      speakers: [
        { 
          name: "Dr. Priya Sharma", 
          imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
        },
        { 
          name: "Dr. Rajiv Mehta", 
          imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
        },
        { 
          name: "Dr. Ananya Desai", 
          imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
        }
      ],
      time: "2:00 PM - 3:30 PM",
      date: "August 25, 2024",
      stage: "Panel Room",
      type: "standard"
    }
  ];

  return (
    <section className="w-full mt-12 md:mt-16">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl md:text-2xl font-medium">Sessions</h2>
        <Link href="/sessions" className="text-sm text-event-standard hover:text-event-standard/80 transition-colors font-medium">
          View All
        </Link>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {sessions.map((session) => (
            <CarouselItem key={session.id} className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3">
              <SessionCard session={session} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-1 mt-4">
          {sessions.map((_, index) => (
            <div 
              key={index} 
              className={`h-2 w-2 rounded-full bg-gray-300 hover:bg-event-standard cursor-pointer transition-colors`}
              onClick={() => {
                // Dots for visual reference - actual implementation would need 
                // integration with the carousel state
              }}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};
