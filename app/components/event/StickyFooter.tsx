import React from "react";
import { Share2 } from "lucide-react";
import { Button } from "../ui/button";

export const StickyFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1c1c25] py-3 px-4 md:px-6 z-50">
      <div className="max-w-[1208px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <h3 className="text-white text-base md:text-lg font-medium">
              KEDDA Dental Expo 2023
            </h3>
            <p className="text-gray-400 text-sm">
              24-25 August 2024, Trade Center, Calicut
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-white text-lg md:text-xl font-medium">
              ₹5000.INR
            </div>
            <div className="text-gray-400 text-sm">
              Early Bird Offer
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="w-10 h-10 rounded-full bg-[#2c2c35] hover:bg-[#3c3c45] text-white p-2.5"
            >
              <Share2 size={20} />
            </Button>
            <Button
              className="px-6 py-2.5 bg-[#00ba9d] hover:bg-[#00a589] text-white rounded-lg font-medium"
            >
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
