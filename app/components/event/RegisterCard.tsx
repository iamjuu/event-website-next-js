import React from "react";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { cn } from "../../lib/utils";

export const RegisterCard = ({venue, title, date, facebook, instagram, twitter, linkedin}) => {
  return (
    <aside className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-stretch text-black w-full px-6 py-8">
      <div className="flex justify-center mb-6">
        <div className="relative w-[180px] h-[180px]">
          <div className="absolute inset-0 bg-[var(--primary-light)] rounded-full"></div>
          <svg className="relative z-10 w-full h-full p-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 30H75C77.7614 30 80 32.2386 80 35V45C77.2386 45 75 47.2386 75 50C75 52.7614 77.2386 55 80 55V65C80 67.7614 77.7614 70 75 70H25C22.2386 70 20 67.7614 20 65V55C22.7614 55 25 52.7614 25 50C25 47.2386 22.7614 45 20 45V35C20 32.2386 22.2386 30 25 30Z" stroke="black" strokeWidth="1.5" fill="white"/>
            <path d="M35 45H65" stroke="black" strokeWidth="1.5"/>
            <path d="M35 55H65" stroke="black" strokeWidth="1.5"/>
            <path d="M40 50H60" stroke="black" strokeWidth="1.5"/>
            <circle cx="45" cy="40" r="2" fill="white" stroke="black"/>
            <circle cx="55" cy="60" r="2" fill="white" stroke="black"/>
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-8">
        {title}
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-[var(--primary-light)] p-2.5 rounded-full">
            <Calendar size={20} className="text-primary-base" />
          </div>
          <span className="text-[15px] text-neutral-700 font-medium">
            {date ? new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Invalid Date'}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-[var(--primary-light)] p-2.5 rounded-full">
            <MapPin size={20} className="text-primary-dark" />
          </div>
          <span className="text-[15px] text-neutral-700 font-medium">
            {venue}
          </span>
        </div>
      </div>
      
      <div className="mt-8">
        <Button 
          className="w-full bg-primary-base hover:bg-primary-dark text-white py-2.5 rounded-lg
                     text-sm font-medium transition-colors shadow-sm hover:shadow-md
                     flex items-center justify-center gap-2"
        >
          Register Now
        </Button> 
      </div>
      
      <div className="mt-4 text-center">
        <span className="text-sm text-neutral-600">Limited seats available. Register early!</span>
      </div>
      <div className="flex mt-3 items-center justify-center gap-4 md:gap-6 px-[10px]">
      <Link   href={`${facebook}`} target="_blank" rel="noopener noreferrer">
       <SocialIcon icon={<Facebook size={16} className="md:text-lg" />} /> 
       </Link>
       <Link href={`${instagram}`} target="_blank" rel="noopener noreferrer">
       <SocialIcon icon={<Instagram size={16} className="md:text-lg" />} /> 
       </Link>
       <Link href={`${twitter}`} target="_blank" rel="noopener noreferrer">
       <SocialIcon icon={<Twitter size={16} className="md:text-lg" />} /> 
       </Link>
       <Link href={`${linkedin}`} target="_blank" rel="noopener noreferrer">
       <SocialIcon icon={<Linkedin size={16} className="md:text-lg" />} /> 
       </Link>
      </div>
    </aside>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
<div
  className={cn(
    "w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full",
    "text-gray-400 hover:text-primary-base transition-colors duration-200",
    "border border-gray-700 hover:border-primary-base bg-[var(--primary-light)] border-1",
    "cursor-pointer hover:bg-gradient-to-r hover:from-primary-base hover:to-primary-dark"
  )}
>
  {icon}
</div>

);