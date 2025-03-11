import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots
} from "../ui/carousel";
import { BlackImage } from "@/public";
interface SpeakerProps {
  name: string;
  title: string;
  image: string;
  type: "standard" | "premium" | "vip";
}

const colorVariants = {
  standard: "border-t-[#6563ff]",
  premium: "border-t-[#9181ff]",
  vip: "border-t-[#ff9933]",
};

const SpeakerCard: React.FC<SpeakerProps> = ({ name, title, image, type }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border-t-4 ${colorVariants[type]} p-4 flex flex-col items-center h-full`}>
      <Image
        src={image}
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

export const SpeakersSection = () => {
  const speakers: SpeakerProps[] = [
    {
      name: "Dr. Priya Sharma",
      title: "Dental Surgeon",
      image: BlackImage,
      type: "standard"
    },
    {
      name: "Dr. Rajiv Mehta",
      title: "Senior Implantologist",
      image: BlackImage,
      type: "premium"
    },
    {
      name: "Dr. Ananya Desai",
      title: "Cosmetic Dentistry Expert",
      image: BlackImage,
      type: "vip"
    },
    {
      name: "Dr. Sunil Kumar",
      title: "Orthodontics Specialist",
      image: BlackImage,
      type: "standard"
    },
    {
      name: "Dr. Maya Reddy",
      title: "Pediatric Dentist",
      image:BlackImage,
      type: "premium"
    },
    {
      name: "Dr. Vikram Singh",
      title: "Endodontic Specialist",
      image: BlackImage,
      type: "vip"
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1208px] mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-black text-xl md:text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-[#4F46E5]">
        Speakers
      </h2>          <Link 
            href="/speakers" 
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
              {speakers.slice(0, 4).map((speaker, index) => (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <SpeakerCard {...speaker} />
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
