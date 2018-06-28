import firebase from 'firebase'
import firestore from 'firebase/firestore'

const config = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    databaseURL: process.env.FB_DATABASE_URL,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
  };

  const firebaseApp = firebase.initializeApp(config)
  firebaseApp.firestore().settings({timestampsInSnapshots: true})

  export default firebaseApp.firestore()