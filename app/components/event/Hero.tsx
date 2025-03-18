import React from "react";
import Image from "next/image";
import { Banner } from "@/public";

export const Hero = ({banner}) => {

  const IMG_CDN = "https://event-manager.syd1.cdn.digitaloceanspaces.com/";

  return (
    <div className="w-full mt-[19px] rounded-[0px_0px_0px_0px] max-md:max-w-full py-0">
 <div className="relative w-full  overflow-hidden rounded-xl">
  {banner && (
    <Image
      src={banner ? `${IMG_CDN}${banner}` : "/fallback.jpg"}
      width={850} // Set as per your aspect ratio
      height={350} // Set as per your aspect ratio
      alt="KEDDA Dental Expo Banner"
      className="w-full h-auto  object-cover aspect-[17/7]" // Maintains 750:350 ratio
      priority
    />
  )}
</div>


    </div>
  );
};