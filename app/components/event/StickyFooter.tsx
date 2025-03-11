import React from "react";
import { Share2 } from "lucide-react";
import { Button } from "../ui/button";

export const StickyFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1c1c25] py-3 px-4 md:px-6 z-50">
      <div className="max-w-[1208px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex items-center gap-2">
          <div>
            <h3 className="text-white text-sm md:text-base lg:text-lg font-medium">
              KEDDA Dental Expo 2023
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              24-25 August 2024, Trade Center, Calicut
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            <div className="text-white text-base sm:text-lg md:text-xl font-medium">
              ₹5000.INR
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">
              Early Bird Offer
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2c2c35] hover:bg-[#3c3c45] text-white p-2 sm:p-2.5"
            >
              <Share2 size={16} className="sm:hidden" />
              <Share2 size={20} className="hidden sm:block" />
            </Button>
            <Button
              className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 bg-[#6563ff] hover:bg-[#6563fd] text-white rounded-lg font-medium text-xs sm:text-sm md:text-base whitespace-nowrap"
            >
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};