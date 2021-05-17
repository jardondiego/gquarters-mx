import firebase from "firebase";
import globals from "./globals";

if (!firebase.apps.length) {
  firebase.initializeApp(globals.firebaseConfig);
}

export default firebase;
