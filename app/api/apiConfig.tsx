// const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = "https://backend-endpoint.eventhex.ai/api/v1"
const BACKEND_URL = "https://backend-endpoint.eventhex.ai";
const CDN_URL = "https://event-manager.syd1.cdn.digitaloceanspaces.com/";

export const API_ENDPOINTS = {
  LOGIN: `${BACKEND_URL}/api/v1/auth/login-mobile-with-country`,
  VERIFY_OTP: `${BACKEND_URL}/api/v1/auth/verify-otp-with-country`,
  RESEND_OTP: `${BACKEND_URL}/api/v1/auth/login-mobile-with-country`,
  EVENT: `${BACKEND_URL}/api/v1/auth/domain-event`,
  RECAP_SETTINGS: `${BACKEND_URL}/api/v1/instarecap-setting`,
  SESSION: `${BASE_URL}/session`,
  SESSIONS: `${BASE_URL}/sessions/event`,
  EVENT_DETAILS: `${BASE_URL}/event`,
};

export const CDN_BASE_URL = CDN_URL;
