// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';
// Add the Firebase services that you want to use
import "firebase/auth";


var firebaseConfig = {
    apiKey: "AIzaSyBVRiiwYZ4ac5t381zdrZiUrICn2nSodu0",
    authDomain: "oauth-7999e.firebaseapp.com",
    databaseURL: "https://oauth-7999e.firebaseio.com",
    projectId: "oauth-7999e",
    storageBucket: "oauth-7999e.appspot.com",
    messagingSenderId: "1086800187355",
    appId: "1:1086800187355:web:6eb21033ee8e65271721fe"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;