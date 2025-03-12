import React from "react";
import { Share2 } from "lucide-react";
import { Button } from "../ui/button";

export const StickyFooter = () => {
  return (
<div className="fixed bottom-0 left-0 right-0 bg-[#1c1c25] py-2 sm:py-3 px-3 sm:px-4 md:px-6 z-50 border-t sm:border-t-0 border-neutral-100">
      <div className="max-w-[1208px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
        {/* Desktop View */}
        <div className="hidden sm:flex items-center gap-2">
          <div>
            <h3 className="text-white text-sm md:text-base lg:text-lg font-medium">
              KEDDA Dental Expo 2024
            </h3>
            <p className="text-white text-xs md:text-sm">
              24-25 August 2024, Trade Center, Calicut
            </p>
          </div>
        </div>
       
        {/* Desktop Price and Buttons */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            <div className="text-white text-base sm:text-lg md:text-xl font-medium">
              ₹5000.INR
            </div>
            <div className="text-white text-xs md:text-sm">
              Early Bird Offer
            </div>
          </div>
         
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2c2c35] hover:bg-[#3c3c45] text-white p-1.5 sm:p-2.5"
            >
              <Share2 size={16} className="sm:hidden" />
              <Share2 size={18} className="hidden sm:inline-block md:hidden" />
              <Share2 size={20} className="hidden md:inline-block" />
            </Button>
            <Button
              className="hidden sm:flex px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 bg-[var(--primary-base)] hover:bg-[var(--primary-dark)] text-white rounded-lg font-medium text-xs sm:text-sm md:text-base whitespace-nowrap"
            >
              Register Now
            </Button>
          </div>
        </div>
        {/* Mobile View */}
        <div className="flex sm:hidden w-full items-center justify-between">
          <div>
            <h3 className="text-white text-base xs:text-lg font-medium">
              KEDDA Dental Expo
            </h3>
            <div className="text-white text-lg xs:text-xl font-bold">
              ₹5000.INR
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-[#2c2c35] hover:bg-[#3c3c45] text-white p-1.5 xs:p-2"
            >
              <Share2 size={14} className="xs:hidden" />
              <Share2 size={16} className="hidden xs:inline-block" />
            </Button>
            <Button
              className="bg-[var(--primary-base)] hover:bg-[var(--primary-dark)] text-white rounded-xl px-4 xs:px-6 py-2 xs:py-2.5 text-sm xs:text-base font-medium"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};