// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.4.2/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyA3dLhO3YUgJTSLwlIC_yFBkET024Ip-ig",
  authDomain: "gquarters-staging.firebaseapp.com",
  projectId: "gquarters-staging",
  storageBucket: "gquarters-staging.appspot.com",
  messagingSenderId: "63565517170",
  appId: "1:63565517170:web:b32ebc5397032cfd56cdeb",
  measurementId: "G-312GYTB2W7",
});

firebase.messaging();