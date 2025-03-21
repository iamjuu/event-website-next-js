import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { BlackImage } from "@/public"; // Default fallback image
import { type CarouselApi } from "@/components/ui/carousel";

interface SpeakerProps {
  name: string;
  title: string;
  image?: string;
  type: "standard" | "premium" | "vip";
}

const colorVariants = {
  standard: "border-t-primary-base",
  premium: "border-t-primary-base",
  vip: "border-t-primary-base",
};

const SpeakerCard: React.FC<SpeakerProps> = ({ name, title, image, type }) => {
  const IMG_CDN = "https://event-manager.syd1.cdn.digitaloceanspaces.com/";
  const imageUrl = image ? `${IMG_CDN}${image}` : BlackImage;

  return (
    <div
      className={`border rounded-lg border-neutral-200 hover:border-neutral-100 hover:shadow-lg transition-all duration-300 ease-in-out p-4 flex flex-col items-center h-full`}
    >
      <Image
        src={imageUrl}
        alt={name}
        width={92}
        height={92}
        className="rounded-full mb-3 border-2 border-white shadow-sm"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = BlackImage;
        }}
      />
      <h3 className="text-lg font-medium text-neutral-900 mb-1">{name}</h3>
      <p className="text-sm text-center text-neutral-600">{title}</p>
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

export const SpeakersSection = ({ speakers = [], eventId }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const itemsPerSlide = 4; // For large screens (lg)
  const totalSlides = Math.ceil(speakers.length / itemsPerSlide);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Set up auto-scrolling
  useEffect(() => {
    if (!api || isHovering) {
      // Clear existing interval when hovering or API isn't ready
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
      return;
    }

    // Set up a new interval for auto-scrolling
    autoScrollTimerRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % totalSlides;
      api.scrollTo(nextIndex);
    }, 3000);

    // Cleanup function
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
    };
  }, [api, isHovering, currentIndex, totalSlides]);

  // Update currentIndex when the carousel scrolls
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1208px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-black text-xl md:text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-primary-base">
            Speakers
          </h2>
          <Link 
            href={`/speakers/${eventId}`}
            className="text-primary-base hover:text-primary-dark text-sm font-medium flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {speakers?.length > 0 ? (
          <div 
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
              setApi={setApi}
            >
              <CarouselContent className="-ml-4">
                {speakers.slice(0, 20).map((speaker, index) => (
                  <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <SpeakerCard {...speaker} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            {/* Custom dots component with max 7 dots */}
            <LimitedCarouselDots 
              totalSlides={totalSlides} 
              currentIndex={currentIndex} 
              setCurrentIndex={(index) => {
                if (api) {
                  api.scrollTo(index);
                }
              }}
              maxDots={7}
            />
          </div>
        ) : (
          <p className="text-gray-500 text-center">No speakers available.</p>
        )}
      </div>
    </section>
  );
};