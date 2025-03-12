import React from "react";
import Image from "next/image";
import { Banner } from "@/public";

export const Hero = () => {
  return (
    <div className="w-full mt-[19px] rounded-[0px_0px_0px_0px] max-md:max-w-full py-0">
      <div className="relative w-full overflow-hidden rounded-xl">
        <Image
          src={Banner}
          alt="KEDDA Dental Expo Banner"
          className="w-full h-auto object-cover"
          priority
        />
      </div>
    </div>
  );
};