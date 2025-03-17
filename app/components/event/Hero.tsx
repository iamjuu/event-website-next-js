import React from "react";
import Image from "next/image";
import { Banner } from "@/public";

export const Hero = ({banner}) => {

  const IMG_CDN = process.env.IMG_CDN;

  return (
    <div className="w-full mt-[19px] rounded-[0px_0px_0px_0px] max-md:max-w-full py-0">
      <div className="relative w-full overflow-hidden rounded-xl">
        { banner && <Image
          src={IMG_CDN+banner || "Img"}
          width={1920}  // Adjust as needed
          height={600}  // Adjust as needed
          alt="KEDDA Dental Expo Banner"
          className="w-full h-auto object-cover"
          priority
        />}
      </div>
    </div>
  );
};