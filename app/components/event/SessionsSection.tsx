"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

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

const colorVariants: Record<SessionProps["type"], string> = {
  standard: "border-blue-500",
  premium: "border-purple-500",
  vip: "border-amber-500",
} as const;

const SessionCard: React.FC<SessionProps> = ({
  title,
  speakers,
  date,
  time,
  stage,
  type = "standard",
}) => {
  const IMG_CDN = "https://event-manager.syd1.cdn.digitaloceanspaces.com/";
  const borderColor = colorVariants[type] || colorVariants.standard;
  const [showNames, setShowNames] = useState(false);
  return (
    <>
  <div
  className={`rounded-lg shadow-sm border  flex-1 border-neutral-100 transition-all duration-300 hover:shadow-lg ${borderColor} p-4 flex flex-col justify-between min-h-[200px]`}
>
  {/* Title Section */}
  <div>
    <h3 className="text-lg font-medium text-neutral-900 mb-3">{title}</h3>

    {/* Speakers Section */}
    <div
      className={`cursor-pointer ${
        speakers.length > 1 ? "" : "flex items-center gap-2"
      }`}
      onClick={() => speakers.length > 1 && setShowNames(!showNames)}
    >
      {speakers.length === 1 ? (
        <div className="flex gap-2 items-center">
          <Image
            src={IMG_CDN + speakers[0].image}
            alt={speakers[0].name}
            width={40}
            height={40}
            className="rounded-full border-2 border-white"
          />
          <p className="text-sm text-neutral-600">{speakers[0].name}</p>
        </div>
      ) : !showNames ? (
        <div className="flex -space-x-2 mb-4">
          {speakers.map((speaker, index) => (
            <Image
              key={index}
              src={IMG_CDN + speaker.image}
              alt={speaker.name}
              width={40}
              height={40}
              className="rounded-full border-2 border-white transition-transform duration-300 hover:-translate-y-2"
            />
          ))}
        </div>
      ) : (
        <div className="mt-2">
          {speakers.map((speaker, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Image
                src={IMG_CDN + speaker.image}
                alt={speaker.name}
                width={40}
                height={40}
                className="rounded-full border-2 border-white"
              />
              <p className="text-sm text-neutral-600">{speaker.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>

  {/* Bottom Section (Event Details) */}
  <div>
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

      </>
  );
};

interface LimitedCarouselDotsProps {
  totalSlides: number;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  maxDots?: number;
}

const LimitedCarouselDots: React.FC<LimitedCarouselDotsProps> = ({
  totalSlides,
  currentIndex,
  setCurrentIndex,
  maxDots = 7,
}) => {
  const renderDots = () => {
    if (totalSlides <= maxDots) {
      return Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full mx-1 transition-all ${
            index === currentIndex ? "bg-primary-base w-4" : "bg-gray-300"
          }`}
          onClick={() => setCurrentIndex(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ));
    }

    const dots = [];
    dots.push(
      <button
        key={0}
        className={`w-2 h-2 rounded-full mx-1 transition-all ${
          currentIndex === 0 ? "bg-primary-base w-4" : "bg-gray-300"
        }`}
        onClick={() => setCurrentIndex(0)}
        aria-label="Go to slide 1"
      />
    );

    const middleDots = maxDots - 2;
    const halfMiddleDots = Math.floor(middleDots / 2);
    let startDot = Math.max(1, currentIndex - halfMiddleDots);
    let endDot = Math.min(totalSlides - 2, startDot + middleDots - 1);

    if (endDot === totalSlides - 2) {
      startDot = Math.max(1, totalSlides - 1 - middleDots);
    }

    if (startDot > 1) {
      dots.push(<span key="ellipsis-start">…</span>);
    }

    for (let i = startDot; i <= endDot; i++) {
      dots.push(
        <button
          key={i}
          className={`w-2 h-2 rounded-full mx-1 transition-all ${
            i === currentIndex ? "bg-primary-base w-4" : "bg-gray-300"
          }`}
          onClick={() => setCurrentIndex(i)}
          aria-label={`Go to slide ${i + 1}`}
        />
      );
    }

    if (endDot < totalSlides - 2) {
      dots.push(<span key="ellipsis-end">…</span>);
    }

    dots.push(
      <button
        key={totalSlides - 1}
        className={`w-2 h-2 rounded-full mx-1 transition-all ${
          currentIndex === totalSlides - 1 ? "bg-primary-base w-4" : "bg-gray-300"
        }`}
        onClick={() => setCurrentIndex(totalSlides - 1)}
        aria-label={`Go to slide ${totalSlides}`}
      />
    );

    return dots;
  };

  return <div className="flex justify-center items-center mt-4">{renderDots()}</div>;
};

interface SessionsSectionProps {
  sessions: SessionProps[];
  eventId: string;
}

export const SessionsSection: React.FC<SessionsSectionProps> = ({ sessions = [], eventId }) => {
  const carouselRef = useRef(null);
  const apiRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(sessions.length / itemsPerSlide);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const initAutoScroll = () => {
      if (carouselRef.current && apiRef.current && !isHovering) {
        interval = setInterval(() => {
          apiRef.current.scrollNext();
          setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, 3000);
      }
    };

    initAutoScroll();
    return () => clearInterval(interval);
  }, [isHovering, currentIndex, totalSlides]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    apiRef.current?.scrollTo(index);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1208px] p-2">
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
          {sessions.length > 0 ? (
            <>
              <Carousel
                ref={carouselRef}
                opts={{ align: "start", loop: true }}
                className="w-full"
                onApiChange={(api) => (apiRef.current = api)}
                onSelect={(api) => setCurrentIndex(api.selectedScrollSnap())}
              >
                <CarouselContent className="-ml-4">
                  {sessions.map((session, index) => (
                    <CarouselItem key={index} className="pl-4  flex basis-full sm:basis-1/2 lg:basis-1/3">
                      <SessionCard {...session} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
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