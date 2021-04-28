import firebase from "firebase";
import globals from "./globals";

const productionConfig = JSON.parse(
  process.env.REACT_APP_FIREBASE_CONFIG_PRODUCTION
);
const stagingConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG_STAGING);
const config = JSON.parse(globals.isProduction ? productionConfig : stagingConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
