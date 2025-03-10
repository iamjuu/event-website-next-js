
import React from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";

type DateCardProps = {
  month: string;
  day: string;
  type: string;
  date: string;
  time: string;
  variant?: "standard" | "premium";
};

const DateCard = ({
  month,
  day,
  type,
  date,
  time,
  variant = "standard"
}: DateCardProps) => {
  const colorVariants = {
    standard: "bg-event-standard-light text-event-standard",
    premium: "bg-event-premium-light text-event-premium"
  };

  const monthBgVariants = {
    standard: "bg-event-standard text-white",
    premium: "bg-event-premium text-white"
  };

  return (
    <div className="bg-white flex items-stretch gap-3 md:gap-4 grow shrink basis-auto p-4 md:p-5 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className={cn(
        "flex flex-col items-stretch font-medium whitespace-nowrap text-center rounded-lg shadow-sm overflow-hidden min-w-[45px] md:min-w-auto",
        colorVariants[variant]
      )}>
        <div className={cn(
          "text-[10px] md:text-xs uppercase py-0.5 md:py-1 px-2 md:px-4 font-semibold",
          monthBgVariants[variant]
        )}>{month}</div>
        <div className="text-lg md:text-2xl py-1 md:py-2 px-2 md:px-4 font-bold">
          {day}
        </div>
      </div>
      <div className="flex flex-col font-normal">
        <div className={cn(
          "text-[10px] md:text-xs uppercase tracking-wider font-medium",
          colorVariants[variant]
        )}>{type}</div>
        <div className="text-sm md:text-base font-medium mt-1 md:mt-2 text-gray-800">
          {date}
        </div>
        <div className="text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1 flex items-center">
          <Clock size={12} className="mr-1 md:w-4 md:h-4" />
          {time}
        </div>
      </div>
    </div>
  );
};

export const EventDetails = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <h2 className="text-black text-xl md:text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-event-standard">
        Event Schedule
      </h2>
      
      <div className="flex items-stretch gap-3 md:gap-7 text-black flex-wrap">
        <DateCard
          month="AUG"
          day="24"
          type="Start Day"
          date="Saturday 24 August 2024"
          time="10:00 AM  - 14:00 PM, IST"
          variant="standard"
        />
        <DateCard
          month="AUG"
          day="25"
          type="End Day"
          date="Sunday 25 August 2024"
          time="10:00 AM  - 14:00 PM, IST"
          variant="premium"
        />
      </div>

      <div className="bg-white shadow-md flex w-full max-w-full items-stretch gap-3 md:gap-5 flex-wrap justify-between mt-1 md:mt-2 p-5 md:p-6 rounded-xl border-l-4 border-event-standard hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 md:gap-4 text-black">
          <div className="bg-event-standard-light p-2.5 md:p-3.5 rounded-full">
            <MapPin size={18} className="md:w-5 md:h-5 text-event-standard" />
          </div>
          <div>
            <div className="text-sm md:text-base font-medium">
              Cial Convention Center
            </div>
            <div className="text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1">
              Athani, Nedumbassheri, Cochin
            </div>
          </div>
        </div>
        <Button 
          variant="event-standard" 
          size="sm"
          className="flex items-center gap-1 md:gap-2 rounded-lg mt-2 sm:mt-0"
        >
          <MapPin size={14} className="md:w-4 md:h-4" />
          View Location
        </Button>
      </div>
    </div>
  );
};
