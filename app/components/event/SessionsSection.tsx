"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "../ui/carousel";
import { BlackImage } from "@/public";
type SessionType = "standard" | "premium" | "vip";

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
  standard: "border-l-primary-base",
  premium: "border-l-primary-base", 
  vip:"border-l-primary-base"
};

const SessionCard: React.FC<SessionProps> = ({
  title,
  speakers,
  date,
  time,
  stage,
  type,
}) => {

  const IMG_CDN = "https://event-manager.syd1.cdn.digitaloceanspaces.com/";
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border-l-4 ${colorVariants[type]} p-4 h-full`}
    >
      <h3 className="text-lg font-medium text-neutral-900 mb-3">{title}</h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {speakers.map((speaker, index) => (
          <div key={index} className="flex items-center">
            <Image
              src={IMG_CDN + speaker.image}
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

export const SessionsSection = ({sessions, eventId}) => {
  // const eventId = sessions[0].event;
  console.log("sessons", sessions);
  const carouselRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<any>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Wait for the carousel to be fully initialized
    const initAutoScroll = () => {
      if (carouselRef.current && apiRef.current) {
        if (!isHovering) {
          interval = setInterval(() => {
            apiRef.current.scrollNext();
          }, 1000); // Move carousel every 1 second
        }
      } else {
        // If not ready yet, try again in a short while
        setTimeout(initAutoScroll, 100);
      }
    };

    initAutoScroll();

    // Cleanup interval on component unmount or when hovering changes
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isHovering]);

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1208px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-black text-xl md:text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-primary-base">
            Sessions
          </h2>{" "}
          <Link
            href={`/sessions/${eventId}`}
            className="text-[#6563ff] hover:text-[#5452ee] text-sm font-medium flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div 
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Carousel
            ref={carouselRef}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onApiChange={(api) => {
              apiRef.current = api;
            }}
          >
            <CarouselContent className="-ml-4">
              {sessions?.map((session, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <SessionCard {...session} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious className="absolute -left-12 top-1/2 transform -translate-y-1/2" />
            <CarouselNext className="absolute -right-12 top-1/2 transform -translate-y-1/2" /> */}
            <CarouselDots className="mt-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};