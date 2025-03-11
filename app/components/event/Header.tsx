import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { BlackImage } from "@/public";
export const Header = () => {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-neutral-200 z-50">
      <div className="max-w-[1208px] mx-auto ">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex  items-center">
            <Image
              src={BlackImage}
              alt="Kerala Dental Dealers Association"
              width={160}
              height={40}
              className="h-[40px] w-auto object-contain"
              priority
            />
          </div>

          <Button 
            className="bg-[#6563ff] hover:bg-[#5452ee] text-white px-6 py-2.5 rounded-lg
                     text-sm font-medium transition-colors shadow-sm hover:shadow-md
                     flex items-center gap-2"
          >
            Register Now
          </Button>
        </div>
      </div>
    </header>
  );
};