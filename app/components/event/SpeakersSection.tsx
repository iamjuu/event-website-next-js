import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots
} from "../ui/carousel";
import { BlackImage } from "@/public"; // Default fallback image

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
  return (
    <div className={`bg-white rounded-lg shadow-sm border-t-4 ${colorVariants[type]} p-4 flex flex-col items-center h-full`}>
      <Image
        src={IMG_CDN + image || BlackImage} // Use fallback if image is missing
        alt={name}
        width={92}
        height={92}
        className="rounded-full mb-3 border-2 border-white shadow-sm"
      />
      <h3 className="text-lg font-medium text-neutral-900 mb-1">{name}</h3>
      <p className="text-sm text-neutral-600">{title}</p>
    </div>
  );
};

export const SpeakersSection = ({ speakers = [] }) => {

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1208px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-black text-xl md:text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-primary-base">
            Speakers
          </h2>
          <Link 
            href="/speakers" 
            className="text-[#6563ff] hover:text-[#5452ee] text-sm font-medium flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {speakers?.length > 0 ? (
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {speakers?.slice(0, 4).map((speaker, index) => (
                  <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <SpeakerCard {...speaker} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselDots className="mt-4" />
            </Carousel>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No speakers available.</p>
        )}
      </div>
    </section>
  );
};
