
import React from "react";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

export const RegisterCard = () => {
  return (
    <aside className="bg-white shadow-lg border border-gray-100 flex flex-col items-stretch text-black w-full px-5 md:px-8 py-8 md:py-10 rounded-2xl transition-all hover:shadow-xl">
      <div className="flex justify-center">
        <div className="bg-event-premium-light p-4 rounded-full mb-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7173469a3912214a00fc1d6cac6d6ce8c90a9d557a5d69b20d7473dff6551242?placeholderIfAbsent=true"
            alt="Event Logo"
            className="aspect-[1] object-contain w-[120px] md:w-[150px]"
          />
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold text-center mt-2">
        KEDDA Dental Expo 2023
      </h2>
      
      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3 text-gray-700">
          <div className="bg-event-standard-medium p-2 rounded-full">
            <Calendar size={18} className="text-event-standard" />
          </div>
          <div className="text-base">
            <span className="font-medium">24-25 August 2024</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-gray-700">
          <div className="bg-event-vip-medium p-2 rounded-full">
            <MapPin size={18} className="text-event-vip" />
          </div>
          <div className="text-base">
            <span className="font-medium">Trade Center, Calicut</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <Button 
          variant="event-gradient"
          size="lg"
          className="w-full rounded-xl py-6 group"
        >
          <span>Register Now</span>
          <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      
      <div className="mt-6 text-center">
        <span className="text-sm text-gray-500">Limited seats available. Register early!</span>
      </div>
    </aside>
  );
};
