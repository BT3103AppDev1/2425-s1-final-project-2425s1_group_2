import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

let firebaseApp, auth, db, storage, GoogleProvider, EmailProvider, onAuthStateChanged;

if (import.meta.env.MODE !== 'test') {
  firebaseApp = firebase.initializeApp(firebaseConfig)
  auth = firebase.auth()
  onAuthStateChanged = auth.onAuthStateChanged.bind(auth)

  db = firebase.firestore()
  storage = firebase.storage()
  GoogleProvider = new firebase.auth.GoogleAuthProvider()
  EmailProvider = new firebase.auth.EmailAuthProvider()
} else {
  firebaseApp = {}
  auth = {}
  db = {}
  storage = {}
  GoogleProvider = {}
  EmailProvider = {}
  onAuthStateChanged = () => {}
}

export { firebaseApp, firebase, auth, db, storage, GoogleProvider, EmailProvider, onAuthStateChanged }
export default firebaseApp
