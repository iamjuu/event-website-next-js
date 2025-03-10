
import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { cn } from "../../lib/utils";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full mt-16 py-8 md:py-10 px-4 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <div className="text-gray-400 text-xs md:text-sm font-normal text-center md:text-left">
          © 2024 KEDDA All Rights Reserved <span className="hidden md:inline">|</span> <span className="block md:inline mt-1 md:mt-0">Privacy Policy | Powered by DataHex</span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6 mt-4 md:mt-0">
          <SocialIcon icon={<Facebook size={16} className="md:text-lg" />} />
          <SocialIcon icon={<Instagram size={16} className="md:text-lg" />} />
          <SocialIcon icon={<Twitter size={16} className="md:text-lg" />} />
          <SocialIcon icon={<Linkedin size={16} className="md:text-lg" />} />
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className={cn(
    "w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full",
    "text-gray-400 hover:text-[#009AC2] transition-colors duration-200",
    "border border-gray-700 hover:border-[#009AC2] bg-gray-800 hover:bg-gray-700 cursor-pointer"
  )}>
    {icon}
  </div>
);
