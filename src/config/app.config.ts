import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBVRiiwYZ4ac5t381zdrZiUrICn2nSodu0',
  authDomain: 'oauth-7999e.firebaseapp.com',
  databaseURL: 'https://oauth-7999e.firebaseio.com',
  projectId: 'oauth-7999e',
  storageBucket: 'oauth-7999e.appspot.com',
  messagingSenderId: '1086800187355',
  appId: '1:1086800187355:web:6eb21033ee8e65271721fe'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('User is logged in')
    // user.getIdToken(true).then((token)=>console.log(token)) //Logs the Token into the console
  } else {
    // User is signed out.
    console.log('User not logged in yet')
  }
})

export default firebase