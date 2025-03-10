
import React from "react";
import { MapPin } from "lucide-react";

export const LocationMap = () => {
  return (
    <section className="flex flex-col w-full text-black mt-8 md:mt-16">
      <h2 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">Location</h2>
      <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 w-full flex flex-col items-stretch rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 border-b border-gray-100">
          <div className="bg-[#009AC2]/10 p-2 md:p-2.5 rounded-full">
            <MapPin size={18} className="md:w-6 md:h-6 text-[#009AC2]" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-medium">Cial Convention Center</h3>
            <p className="text-gray-500 text-xs md:text-sm">Athani, Nedumbassheri, Cochin</p>
          </div>
        </div>
        <div className="w-full aspect-[16/9] relative">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/76b878506dc57613a650fd3f4b2c6dd3ade78660997efae41bc3e37b8bad73b3?placeholderIfAbsent=true"
            alt="Location Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-6 w-6 md:h-8 md:w-8 bg-[#009AC2] rounded-full flex items-center justify-center animate-pulse border-4 border-white">
              <div className="h-1.5 w-1.5 md:h-2 md:w-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
