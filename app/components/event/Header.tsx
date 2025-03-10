import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import RegisterButton from '../ui/newButton'
export const Header = () => {
  return (
    <div className="flex w-full items-center gap-3 md:gap-5 flex-wrap justify-between max-md:max-w-full py-2">
      <div className="flex items-center gap-2 md:gap-[17px] text-base md:text-[19px] text-[rgba(62,62,62,1)] font-semibold leading-tight md:leading-[22px]">
        <Image
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/44a314cb5ccf86ada2dff1572ed2b746daa0e8fbef487de9066763d650f56623?placeholderIfAbsent=true"
          alt="KEDDA Logo"
          width={81}
          height={81}
          className="aspect-[1] object-contain w-[50px] md:w-[81px] shrink-0"
          unoptimized // This bypasses the domain verification for external images
        />
        <div className="my-auto">
          Kerala Dental <br />
          Dealers Association
        </div>
      </div>

<RegisterButton buttonName={'Register Now'} icon={''}  className={'bg-blue-500 py-3 px-4 rounded-xl text-white text-[12px] font-600 '}/>
      {/* <Button
        variant="event-standard"
        size="default"
        className="rounded-xl"
      >
        Register Now
      </Button> */}
    </div>
  );
};