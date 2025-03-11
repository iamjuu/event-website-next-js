import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots
} from "../ui/carousel";
import { BlackImage } from "@/public";

interface SpeakerInfo {
  name: string;
  image: string;
}

interface SessionProps {
  title: string;
  speakers: SpeakerInfo[];
  date: string;
  time: string;
  stage: string;
  type: "standard" | "premium" | "vip";
}

const colorVariants = {
  standard: "border-l-[#6563ff]",
  premium: "border-l-[#9181ff]",
  vip: "border-l-[#ff9933]",
};

const SessionCard: React.FC<SessionProps> = ({ title, speakers, date, time, stage, type }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border-l-4 ${colorVariants[type]} p-4 h-full`}>
      <h3 className="text-lg font-medium text-neutral-900 mb-3">{title}</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {speakers.map((speaker, index) => (
          <div key={index} className="flex items-center">
            <Image
              src={speaker.image}
              alt={speaker.name}
              width={24}
              height={24}
              className="rounded-full mr-2"
            />
            <span className="text-sm text-neutral-600">{speaker.name}</span>
            {index < speakers.length - 1 && (
              <span className="mx-2 text-neutral-400">•</span>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-neutral-500">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-sm text-neutral-500">
          <Clock className="w-4 h-4 mr-2" />
          <span>{time}</span>
        </div>
        <div className="flex items-center text-sm text-neutral-500">
          <Users className="w-4 h-4 mr-2" />
          <span>{stage}</span>
        </div>
      </div>
    </div>
  );
};

export const SessionsSection = () => {
  const sessions: SessionProps[] = [
    {
      title: "Future of Dental Technology",
      speakers: [
        {
          name: "Dr. Priya Sharma",
          image: BlackImage
        },
        {
          name: "Dr. Amit Patel",
          image: BlackImage
        }
      ],
      date: "August 24, 2024",
      time: "10:00 AM - 11:30 AM",
      stage: "Main Stage",
      type: "standard"
    },
    {
      title: "Advanced Implantology Workshop",
      speakers: [
        {
          name: "Dr. Rajiv Mehta",
          image:BlackImage
        }
      ],
      date: "August 24, 2024",
      time: "1:00 PM - 3:30 PM",
      stage: "Workshop Room B",
      type: "premium"
    },
    {
      title: "Digital Smile Design Masterclass",
      speakers: [
        {
          name: "Dr. Ananya Desai",
          image: BlackImage
        }
      ],
      date: "August 25, 2024",
      time: "11:00 AM - 1:00 PM",
      stage: "Workshop Room A",
      type: "vip"
    },
    {
      title: "Pediatric Dentistry Update",
      speakers: [
        {
          name: "Dr. Sunil Kumar",
          image: BlackImage
        }
      ],
      date: "August 24, 2024",
      time: "3:00 PM - 4:30 PM",
      stage: "Panel Room",
      type: "standard"
    },
    {
      title: "Business of Dentistry",
      speakers: [
        {
          name: "Dr. Ritu Verma",
          image: BlackImage
        }
      ],
      date: "August 25, 2024",
      time: "9:30 AM - 11:00 AM",
      stage: "Main Stage",
      type: "premium"
    },
    {
      title: "Endodontic Microsurgery",
      speakers: [
        {
          name: "Dr. Vikram Singh",
          image: BlackImage
        }
      ],
      date: "August 25, 2024",
      time: "2:00 PM - 4:00 PM",
      stage: "Workshop Room B",
      type: "vip"
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1208px] mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-black text-xl md:text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-[#4F46E5]">
        Sessions
      </h2>          <Link 
            href="/sessions" 
            className="text-[#6563ff] hover:text-[#5452ee] text-sm font-medium flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {sessions.slice(0, 4).map((session, index) => (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <SessionCard {...session} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-12 top-1/2 transform -translate-y-1/2" />
            <CarouselNext className="absolute -right-12 top-1/2 transform -translate-y-1/2" />
            <CarouselDots className="mt-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
