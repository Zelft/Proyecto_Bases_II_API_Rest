import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'dotenv/config'

const firebaseConfig = {
  apiKey: process.env.ApiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
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