
import React from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StickyFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      {/* Mobile design */}
      <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex flex-col">
            <div className="text-sm font-medium text-gray-500">
              KEDDA Dental Expo
            </div>
            <div className="text-lg font-bold text-black">
              ₹5000.INR
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon"
              className="rounded-full border border-gray-300 h-10 w-10"
              aria-label="Share"
            >
              <Share2 size={18} />
            </Button>
            
            <Button 
              className="bg-[#00BFA6] hover:bg-[#00A896] transition-colors text-white font-medium py-2 px-6 rounded-full"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
      
      {/* Desktop design */}
      <div className="hidden md:block bg-[#1A1F2C] text-white border-t border-gray-800 shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1208px] mx-auto">
          <div className="flex flex-col">
            <div className="text-lg font-semibold truncate max-w-full">
              KEDDA Dental Expo 2023
            </div>
            <div className="text-sm text-gray-400">
              24-25 August 2024, Trade Center, Calicut
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-end">
              <div className="text-lg font-bold">₹5000.INR</div>
              <div className="text-xs text-gray-400">Early Bird Offer</div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-300 h-11 w-11"
              aria-label="Share"
            >
              <Share2 size={20} />
            </Button>
            <Button 
              className="bg-[#00BFA6] hover:bg-[#00A896] transition-colors text-white font-medium text-sm py-2 px-6 rounded-md whitespace-nowrap"
            >
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
