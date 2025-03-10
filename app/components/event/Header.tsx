
import React from "react";
import { Button } from "../ui/button";

export const Header = () => {
  return (
    <div className="flex w-full items-center gap-3 md:gap-5 flex-wrap justify-between max-md:max-w-full py-2">
      <div className="flex items-center gap-2 md:gap-[17px] text-base md:text-[19px] text-[rgba(62,62,62,1)] font-semibold leading-tight md:leading-[22px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/44a314cb5ccf86ada2dff1572ed2b746daa0e8fbef487de9066763d650f56623?placeholderIfAbsent=true"
          alt="KEDDA Logo"
          className="aspect-[1] object-contain w-[50px] md:w-[81px] shrink-0"
        />
        <div className="my-auto">
          Kerala Dental <br />
          Dealers Association
        </div>
      </div>
      <Button 
        // variant="event-standard" 
        size="default"
        className="rounded-xl"
      >
        Register Now
      </Button>
    </div>
  );
};
