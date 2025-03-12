import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { BlackImage } from "@/public";
export const Header = () => {
  return (
    
<header className="px-5 py-3 md:py-0 sm:px-5 bg-white/80 backdrop-blur-sm border border-t-0 border-neutral-200 shadow-sm">
<div className="max-w-[1208px] mx-auto ">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex  items-center">
            <Image
              src={BlackImage}
              alt="Kerala Dental Dealers Association"
              
              // height={260}
              className="  w-[100px] object-contain"
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