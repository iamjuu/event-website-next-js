import React from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import EventButton from '../ui/newButton'

interface EventDetailsProps {
  startDate: string;
  endDate: string;
  venue: string;
}

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
    standard: "bg-[#EEF2FF] text-[#4F46E5]",
    premium: "bg-[var(--primary-light)] text-[#7C3AED]"
  };

  const monthBgVariants = {
    standard: "bg-[#4F46E5] text-white",
    premium: "bg-[#7C3AED] text-white"
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

export const EventDetails: React.FC<EventDetailsProps> = ({ startDate, endDate, venue }) => {
  const formatDateCard = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      day: date.getDate().toString(),
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      time: date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'short'
      })
    };
  };

  const startDateFormatted = formatDateCard(startDate);
  const endDateFormatted = formatDateCard(endDate);
  // const [venueName, venueLocation] = venue.split(',').map(s => s.trim());
const venueName = venue;
// const venueLocation = "temp ocation";
  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <h2 className="text-black text-xl md:text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-primary-base">
        Event Schedule
      </h2>
      
      <div className="flex items-stretch gap-3 md:gap-7 text-black flex-wrap">
        <DateCard
          month={startDateFormatted.month}
          day={startDateFormatted.day}
          type="START DAY"
          date={startDateFormatted.date}
          time={startDateFormatted.time}
          variant="standard"
        />
        <DateCard
          month={endDateFormatted.month}
          day={endDateFormatted.day}
          type="END DAY"
          date={endDateFormatted.date}
          time={endDateFormatted.time}
          variant="premium"
        />
      </div>

      <div className="bg-white shadow-md flex w-full max-w-full items-stretch gap-3 md:gap-5 flex-wrap justify-between mt-1 md:mt-2 p-5 md:p-6 rounded-xl hover:border-l-4 hover:border-[var(--primary-base)] hover:shadow-lg transition-all duration-200">
        <div className="flex items-center gap-3 md:gap-4 text-black">
          <div className="bg-[#EEF2FF] p-2.5 md:p-3.5 rounded-full">
            <MapPin size={18} className="md:w-5 md:h-5 text-[#4F46E5]" />
          </div>
          <div>
            <div className="text-sm md:text-base font-medium">
              {venueName}
            </div>
            <div className="text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1">
              {/* {venueLocation */}Venue Location
            </div>
          </div>
        </div>
        <Button 
          className="bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90 flex items-center gap-1 md:gap-2 rounded-lg mt-2 sm:mt-0"
          size="sm"
          onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(venue)}`, '_blank')}
        >
          <MapPin size={14} className="md:w-4 md:h-4" />
          View Location
        </Button>
      </div>
    </div>
  );
};