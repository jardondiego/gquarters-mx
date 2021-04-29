// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.4.2/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCXdg68NoUhyCKvosL4HiKjnGnzE0EoSUQ",
  authDomain: "gquarters-c14f8.firebaseapp.com",
  databaseURL: "https://gquarters-c14f8-default-rtdb.firebaseio.com",
  projectId: "gquarters-c14f8",
  storageBucket: "gquarters-c14f8.appspot.com",
  messagingSenderId: "686400748046",
  appId: "1:686400748046:web:d3d305e150498e01349a5f",
  measurementId: "G-67061N4P64",
});

firebase.messaging();