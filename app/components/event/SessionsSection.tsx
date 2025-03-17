"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
  standard: "border-l-primary-base",
  premium: "border-l-primary-base", 
  vip: "border-l-primary-base"
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

// Custom carousel dots component with limited dots
const LimitedCarouselDots = ({ totalSlides, currentIndex, setCurrentIndex, maxDots = 7 }) => {
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Logic to show limited dots with ellipsis
  const renderDots = () => {
    if (totalSlides <= maxDots) {
      // If we have fewer slides than max dots, show all dots
      return Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full mx-1 transition-all ${
            index === currentIndex ? "bg-primary-base w-4" : "bg-gray-300"
          }`}
          onClick={() => handleDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ));
    } else {
      // Calculate which dots to show
      const dots = [];
      
      // Always show first dot
      dots.push(
        <button
          key={0}
          className={`w-2 h-2 rounded-full mx-1 transition-all ${
            currentIndex === 0 ? "bg-primary-base w-4" : "bg-gray-300"
          }`}
          onClick={() => handleDotClick(0)}
          aria-label="Go to slide 1"
        />
      );
      
      // Calculate middle dots
      const middleDots = maxDots - 2; // Subtract first and last dots
      const halfMiddleDots = Math.floor(middleDots / 2);
      
      // Calculate range of dots to show
      let startDot = Math.max(1, currentIndex - halfMiddleDots);
      let endDot = Math.min(totalSlides - 2, startDot + middleDots - 1);
      
      // Adjust if we're near the end
      if (endDot === totalSlides - 2) {
        startDot = Math.max(1, totalSlides - 1 - middleDots);
      }
      
      // Show ellipsis if needed at the beginning
      if (startDot > 1) {
        dots.push(
          <span key="ellipsis-start" className="mx-1">
            …
          </span>
        );
      }
      
      // Add middle dots
      for (let i = startDot; i <= endDot; i++) {
        dots.push(
          <button
            key={i}
            className={`w-2 h-2 rounded-full mx-1 transition-all ${
              i === currentIndex ? "bg-primary-base w-4" : "bg-gray-300"
            }`}
            onClick={() => handleDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        );
      }
      
      // Show ellipsis if needed at the end
      if (endDot < totalSlides - 2) {
        dots.push(
          <span key="ellipsis-end" className="mx-1">
            …
          </span>
        );
      }
      
      // Always show last dot
      dots.push(
        <button
          key={totalSlides - 1}
          className={`w-2 h-2 rounded-full mx-1 transition-all ${
            currentIndex === totalSlides - 1 ? "bg-primary-base w-4" : "bg-gray-300"
          }`}
          onClick={() => handleDotClick(totalSlides - 1)}
          aria-label={`Go to slide ${totalSlides}`}
        />
      );
      
      return dots;
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      {renderDots()}
    </div>
  );
};

export const SessionsSection = ({ sessions = [], eventId }) => {
  const carouselRef = useRef(null);
  const apiRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3; // For large screens (lg:basis-1/3)
  const totalSlides = Math.ceil((sessions?.length || 0) / itemsPerSlide);

  useEffect(() => {
    let interval;

    // Wait for the carousel to be fully initialized
    const initAutoScroll = () => {
      if (carouselRef.current && apiRef.current) {
        if (!isHovering) {
          interval = setInterval(() => {
            apiRef.current.scrollNext();
            // Update current index when auto-scrolling
            const newIndex = (currentIndex + 1) % totalSlides;
            setCurrentIndex(newIndex);
          }, 3000); // Move carousel every 3 seconds (changed from 1 second for better UX)
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
  }, [isHovering, currentIndex, totalSlides]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    if (apiRef.current) {
      apiRef.current.scrollTo(index);
    }
  };

  // Handle when carousel scrolls
  const handleCarouselChange = (api) => {
    const index = api.selectedScrollSnap();
    setCurrentIndex(index);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1208px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-black text-xl md:text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-primary-base">
            Sessions
          </h2>
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
          {sessions?.length > 0 ? (
            <>
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
                onSelect={handleCarouselChange}
              >
                <CarouselContent className="-ml-4">
                  {sessions.map((session, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <SessionCard {...session} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              
              {/* Custom limited dots navigation */}
              <LimitedCarouselDots 
                totalSlides={totalSlides}
                currentIndex={currentIndex}
                setCurrentIndex={handleDotClick}
                maxDots={7}
              />
            </>
          ) : (
            <p className="text-gray-500 text-center">No sessions available.</p>
          )}
        </div>
      </div>
    </section>
  );
};