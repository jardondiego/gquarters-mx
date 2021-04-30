const envToUrl = {
  local: process.env.REACT_APP_API_URL_LOCAL,
  staging: process.env.REACT_APP_API_URL_STAGING,
  production: process.env.REACT_APP_API_URL_PRODUCTION,
};

const apiUrl = envToUrl[process.env.REACT_APP_ENVIRONMENT];
const isProduction = process.env.REACT_APP_ENVIRONMENT === "production";
const vapidKey = isProduction
  ? process.env.REACT_APP_FCM_VAPID_KEY_PRODUCTION
  : process.env.REACT_APP_FCM_VAPID_KEY_STAGING;
const workerUrl = isProduction
  ? "firebase-messaging-sw-production.js"
  : "firebase-messaging-sw-staging.js";

const globals = { apiUrl, isProduction, vapidKey, workerUrl };
export default globals;
