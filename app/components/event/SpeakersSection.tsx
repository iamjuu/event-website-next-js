import React from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem
} from "../ui/carousel";

type SpeakerProps = {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  type: "standard" | "premium" | "vip";
};

const SpeakerCard = ({ speaker }: { speaker: SpeakerProps }) => {
  const colorVariants = {
    standard: "border-event-standard/70 bg-event-standard-light/30",
    premium: "border-event-premium/70 bg-event-premium-light/30",
    vip: "border-event-vip/70 bg-event-vip-light/30"
  };

  return (
    <div className={cn(
      "flex flex-col items-center bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md border-t-4 p-4 h-full",
      colorVariants[speaker.type]
    )}>
      <div className="mb-3">
        <img 
          src={speaker.imageUrl} 
          alt={speaker.name}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-white shadow-sm"
        />
      </div>
      
      <div className="text-center">
        <h3 className="font-medium text-base md:text-lg text-gray-800 mb-1">{speaker.name}</h3>
        <p className="text-sm text-gray-600">{speaker.title}</p>
      </div>
    </div>
  );
};

export const SpeakersSection = () => {
  const speakers: SpeakerProps[] = [
    {
      id: "speaker1",
      name: "Dr. Priya Sharma",
      title: "Dental Surgeon",
      imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      type: "standard"
    },
    {
      id: "speaker2",
      name: "Dr. Rajiv Mehta",
      title: "Senior Implantologist",
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      type: "premium"
    },
    {
      id: "speaker3",
      name: "Dr. Ananya Desai",
      title: "Cosmetic Dentistry Expert",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      type: "vip"
    },
    {
      id: "speaker4",
      name: "Dr. Sunil Kumar",
      title: "Orthodontics Specialist",
      imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      type: "standard"
    }
  ];

  return (
    <section className="w-full mt-12 md:mt-16">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl md:text-2xl font-medium">Speakers</h2>
        <Link href="/speakers" className="text-sm text-event-standard hover:text-event-standard/80 transition-colors font-medium">
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
          {speakers.map((speaker) => (
            <CarouselItem key={speaker.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <SpeakerCard speaker={speaker} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-1 mt-4">
          {speakers.map((_, index) => (
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