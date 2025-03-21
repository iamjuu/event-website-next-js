import React from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem
} from "../ui/carousel";

type SponsorProps = {
  id: string;
  name: string;
  logoUrl: string;
  tier: "platinum" | "gold" | "silver" | "bronze";
};

const SponsorLogo = ({ sponsor }: { sponsor: SponsorProps }) => {

  const IMG_CDN = "https://event-manager.syd1.cdn.digitaloceanspaces.com/";
  return (
    <div className="bg-white rounded-lg p-4 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 aspect-[3/2]">
      <img 
        src={IMG_CDN + sponsor.logoUrl} 
        alt={`${sponsor.name} logo`}
        className="max-h-16 max-w-full object-contain"
      />
    </div>
  );
};

export const SponsorsSection = ({sponsors = []}) => {

  return (
    <section className="w-full mt-12 md:mt-16">
      <div className="mb-5">
      <h2 className=" mb-[24px] text-black text-xl md:text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-primary-base">
          Our Sponsors</h2>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {sponsors?.map((sponsor) => (
            <CarouselItem key={sponsor.id} className="pl-2 md:pl-4 basis-1/3 sm:basis-1/4 lg:basis-1/6">
              <SponsorLogo sponsor={sponsor} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-1 mt-4">
          {Array.from({ length: Math.ceil(sponsors?.length / 6) }).map((_, index) => (
            <div 
              key={index} 
              className={`h-2 w-2 rounded-full bg-gray-300 hover:bg-primary-base cursor-pointer transition-colors`}
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
