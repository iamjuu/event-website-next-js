import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { cn } from "../../lib/utils";
import { Logo } from "@/public";
import Image from "next/image";
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full mt-16 py-6 px-4">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-3">
      <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left font-normal flex flex-wrap justify-center items-center">
        All Rights Reserved
        <span className="mx-1">|</span> 
        Event Hosted in
        <Image 
          src={Logo} 
          alt="logo" 
          className="inline-block ml-1 h-4 sm:h-5 w-auto" 
        />
      </div>
    </div>
  </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div
    className={cn(
      "w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full",
      "text-gray-400 hover:text-[#009AC2] transition-colors duration-200",
      "border border-gray-700 hover:border-[#009AC2] bg-gray-800 hover:bg-gray-700 cursor-pointer"
    )}
  >
    {icon}
  </div>
);
