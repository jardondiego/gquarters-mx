import firebase from 'firebase/app';
import 'firebase/analytics';

const isProduction = process.env.REACT_APP_ENVIRONMENT === 'production';
const productionConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG_PRODUCTION);
const stagingConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG_STAGING);
const config = isProduction ? productionConfig : stagingConfig;

firebase.initializeApp(config);
