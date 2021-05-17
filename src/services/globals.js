const envToUrl = {
  local: process.env.REACT_APP_API_URL_LOCAL,
  staging: process.env.REACT_APP_API_URL_STAGING,
  production: process.env.REACT_APP_API_URL_PRODUCTION,
};

const apiUrl = envToUrl[process.env.REACT_APP_ENVIRONMENT];
const isProduction = process.env.REACT_APP_ENVIRONMENT === "production";
const facebookUrl = process.env.REACT_APP_FACEBOOK_URL;
const vapidKey = isProduction
  ? process.env.REACT_APP_FCM_VAPID_KEY_PRODUCTION
  : process.env.REACT_APP_FCM_VAPID_KEY_STAGING;
const workerUrl = isProduction
  ? "firebase-messaging-sw-production.js"
  : "firebase-messaging-sw-staging.js";

const productionConfig = JSON.parse(
  process.env.REACT_APP_FIREBASE_CONFIG_PRODUCTION
);
const stagingConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG_STAGING);
const firebaseConfig = JSON.parse(
  isProduction ? productionConfig : stagingConfig
);

const globals = { apiUrl, isProduction, vapidKey, workerUrl, facebookUrl, firebaseConfig };
export default globals;
