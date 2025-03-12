import React from "react";
import { Mail, Globe, Calendar, Clock, Award, Bookmark, Share2, Mic, MapPin, Users, Star, Link2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
type SpeakerProps = {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
  sessions: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
  }>;
  type: "standard" | "premium" | "vip";
};
const SingleSpeaker = ({
  speaker
}: {
  speaker: SpeakerProps;
}) => {
  const colorVariants = {
    standard: "border-event-standard/70 bg-gradient-to-br from-white to-event-standard-light/30",
    premium: "border-event-premium/70 bg-gradient-to-br from-white to-event-premium-light/30",
    vip: "border-event-vip/70 bg-gradient-to-br from-white to-event-vip-light/30"
  };
  const iconVariants = {
    standard: "text-event-standard",
    premium: "text-event-premium",
    vip: "text-event-vip"
  };
  const speakerStats = [{
    label: "Presentations",
    value: "12+",
    icon: Mic
  }, {
    label: "Experience",
    value: "15 Years",
    icon: Clock
  }, {
    label: "Awards",
    value: "8",
    icon: Award
  }];
  return <div className={cn("flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border-t-4 md:border-l-4 md:border-t-0 group", colorVariants[speaker.type])}>
      <div className="p-8 flex flex-col items-center md:items-start md:w-1/3 backdrop-blur-sm px-[75px]">
        <div className="relative w-full flex flex-col items-center">
          <div className="mb-6 relative">
            <div className={cn("absolute -inset-1.5 rounded-full opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-60", speaker.type === "standard" ? "bg-event-standard" : speaker.type === "premium" ? "bg-event-premium" : "bg-event-vip")}></div>
            <img src={speaker.imageUrl} alt={speaker.name} className="w-40 h-40 md:w-48 md:h-48 relative rounded-full object-cover border-4 border-white shadow-xl transition-transform duration-300 group-hover:scale-[1.03] z-10" />
            <div className={cn("absolute -bottom-2 -right-2 p-2 rounded-full shadow-md z-20", speaker.type === "standard" ? "bg-event-standard" : speaker.type === "premium" ? "bg-event-premium" : "bg-event-vip")}>
              <Mic size={20} className="text-white" />
            </div>
          </div>
          
          <div className="text-center w-full mb-6 relative">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h3 className="font-semibold text-2xl text-gray-800">{speaker.name}</h3>
              <Award size={18} className={iconVariants[speaker.type]} />
            </div>
            <p className="text-lg text-gray-600">{speaker.title}</p>
            <div className="w-20 h-1 bg-gray-200 rounded-full my-3 mx-auto"></div>
          </div>
          
          {/* Speaker Stats */}
          
          
          <div className="w-full space-y-3 mt-2 animate-fade-in">
            <Button variant="default" className="w-full flex items-center justify-center gap-2">
              <Mail size={16} />
              <span>Contact</span>
            </Button>
            
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <Globe size={16} />
              <span>Website</span>
            </Button>
            
            <div className="flex gap-2 mt-4 justify-center">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 group/btn">
                <Bookmark size={16} className="text-gray-500 group-hover/btn:text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 group/btn">
                <Share2 size={16} className="text-gray-500 group-hover/btn:text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 group/btn">
                <Link2 size={16} className="text-gray-500 group-hover/btn:text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 group/btn">
                <Star size={16} className="text-gray-500 group-hover/btn:text-gray-700" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex-grow">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-8 shadow-sm border border-gray-100">
          <h4 className="font-medium text-lg mb-4 flex items-center gap-2">
            <span className={cn("inline-block w-2 h-2 rounded-full", speaker.type === "standard" ? "bg-event-standard" : speaker.type === "premium" ? "bg-event-premium" : "bg-event-vip")}></span>
            Biography
          </h4>
          <p className="text-gray-600 leading-relaxed">{speaker.bio}</p>
        </div>
        
        <h4 className="font-medium text-lg mb-4 flex items-center gap-2">
          <span className={cn("inline-block w-2 h-2 rounded-full", speaker.type === "standard" ? "bg-event-standard" : speaker.type === "premium" ? "bg-event-premium" : "bg-event-vip")}></span>
          Sessions
        </h4>
        <div className="space-y-3">
          {speaker.sessions.map(session => <div key={session.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md cursor-pointer group/session">
              <h5 className="font-medium text-gray-800 mb-2 group-hover/session:text-gray-900 transition-colors">{session.title}</h5>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1.5 opacity-70" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1.5 opacity-70" />
                  <span>{session.time}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 opacity-0 group-hover/session:opacity-100 transition-opacity flex justify-end">
                <Button variant="ghost" size="sm" className="text-xs">
                  View Session Details
                </Button>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export const SingleSpeakerSection = () => {
  const speaker: SpeakerProps = {
    id: "speaker3",
    name: "Dr. Ananya Desai",
    title: "Cosmetic Dentistry Expert",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    bio: "Dr. Ananya Desai is a renowned expert in cosmetic dentistry with over 15 years of experience. She specializes in digital smile design and minimally invasive aesthetic procedures. Dr. Desai has published numerous articles in international dental journals and is a frequent speaker at global conferences.",
    sessions: [{
      id: "session3",
      title: "Digital Smile Design Masterclass",
      date: "August 25, 2024",
      time: "11:00 AM - 1:00 PM"
    }, {
      id: "session4",
      title: "Panel: Future of Dental Education",
      date: "August 25, 2024",
      time: "2:00 PM - 3:30 PM"
    }],
    type: "vip"
  };
  return <section className="w-full mt-12 mb-8">
      <h2 className="text-xl md:text-2xl font-medium mb-6 flex items-center gap-2 relative">
        <span className="bg-event-vip-light/50 w-10 h-10 rounded-full flex items-center justify-center">
          <Mic size={18} className="text-event-vip" />
        </span>
        Featured Speaker
      </h2>
      <SingleSpeaker speaker={speaker} />
    </section>;
};