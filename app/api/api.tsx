import { API_ENDPOINTS } from "./apiConfig";
import React, { useEffect, useState } from "react";

// Add Response type annotation
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

export const eventService = {
  getEventDetails: async (eventId: string) => {
    const response = await fetch(
      `${API_ENDPOINTS.EVENT_DETAILS}?eventId=${eventId}`
    );
    return handleResponse(response);
  },

  getEventByDomain: async () => {
    const response = await fetch(
      // `${API_ENDPOINTS.EVENT}?domain=${window.location.hostname}`
      `${API_ENDPOINTS.EVENT}?domain=my-event.eventhex.ai`
      
    );
    // handleResponse(response);
    // console.log("Event const data = await by domain response :", data);

    return handleResponse(response);
  },  

  getRecapSettings: async (eventId: string) => {
    const response = await fetch(
      `${API_ENDPOINTS.RECAP_SETTINGS}?eventId=${eventId}`
    );
    return handleResponse(response);
  },
};

export const sessionService = {
  getSession: async (sessionId: string) => {
    const response = await fetch(
      `${API_ENDPOINTS.SESSION}?sessionId=${sessionId}`
    );
    return handleResponse(response);
  },

  getEventSessions: async (eventId: string) => {
    const response = await fetch(
      `${API_ENDPOINTS.SESSIONS}?eventId=${eventId}`
    );
    // const data = await handleResponse(response);
    // console.log("Event Sessions response :", data);
    return handleResponse(response);
  },
};

interface EventData {
  _id: string;
  title: string;
  description: string;
  venue: string;
  eventType: string;
  ticketType: string;
  startDate: string;
  endDate: string;
  logo: string;
  banner: string;
  themeColor: string;
  themeTextColor: string;
  registrationCount: number;
}

interface DomainResponse {
  success: boolean;
  domainData: {
    event: EventData;
  };
}

export const useEvent = () => {
    const [eventData, setEventData] = useState<EventData | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    // const [eventId, setEventId] = useState<string>("");
    let eventId = "";
    useEffect(() => {
      const fetchEventData = async () => {
        try {
          const response = await eventService.getEventByDomain();
          if (response.success && response.domainData?.event) {
            setEventData(response.domainData.event);
            // setEventId(response.domainData.event._id);
            eventId = response.domainData.event._id;
            console.log("eventId", eventId);
          } else {
            setError("Failed to fetch event information");
          }
        } catch (error) {
          console.error("Error fetching Event data:", error);
          setError("Failed to fetch event information");
        } finally {
          setLoading(false);
        }
      };
      fetchEventData();
    }, []);
  
    return {
      eventData,
      eventId,
      error,
      loading
    };
};