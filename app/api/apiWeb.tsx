import React,{useEffect, useState} from "react";
import { eventService } from "./api";
export const useEvent = () => {
    const [eventId, setEventId] = useState("");
    const [bannerData, setBannerData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginRequired, setLoginRequired] = useState(false);
  
    useEffect(() => {
      const fetchEventId = async () => {
        try {
          const data = await eventService.getEventByDomain();
          console.log("Event data", data);
          const data = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ticket`)
          if (data.success && data.domainData?.event?._id) {
            setEventId(data.domainData.event._id);
          } else {
            setError("Failed to fetch event information");
          }
        } catch (error) {
          console.error("Error fetching Event Id", error);
          setError("Failed to fetch event information");
        }
      };
      fetchEventId();
    }, []);
  
    useEffect(() => {
      if (!eventId) return;
  
      const fetchEventDetails = async () => {
        setLoading(true);
        try {
          // Fetch banner data
          const bannerData = await eventService.getEventDetails(eventId);
          setBannerData(bannerData);
  
          // Fetch recap settings
          const recapData = await eventService.getRecapSettings(eventId);
          // setLoginRequired(
          //   (recapData.success && recapData.response[0]?.enableLogin) || false
          // );
        } catch (error) {
          console.error("Error fetching event details:", error);
          setError("Failed to fetch event details");
        } finally {
          setLoading(false);
        }
      };
  
      fetchEventDetails();
    }, [eventId]);
  
    return {
      eventId,
      bannerData,
      error,
      loading,
      loginRequired,
    };
  };