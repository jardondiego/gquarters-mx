import firebase from 'firebase/app';
import 'firebase/analytics'

const config = {
  apiKey: "AIzaSyA3dLhO3YUgJTSLwlIC_yFBkET024Ip-ig",
  authDomain: "gquarters-staging.firebaseapp.com",
  projectId: "gquarters-staging",
  storageBucket: "gquarters-staging.appspot.com",
  messagingSenderId: "63565517170",
  appId: "1:63565517170:web:b32ebc5397032cfd56cdeb",
  measurementId: "G-312GYTB2W7",
};

firebase.initializeApp(config);
