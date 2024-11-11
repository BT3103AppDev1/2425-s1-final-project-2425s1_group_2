import firebaseApp from '../../firebase.js'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'

if (import.meta.env.MODE !== 'test') {
  var db = getFirestore(firebaseApp)
}

export async function readUser(email) {
  try {
    const q = query(collection(db, 'UserProfile'), where('Email', '==', email))
    const querySnapshot = await getDocs(q)
    // If any document exists with the same email, return true
    return !querySnapshot.empty
  } catch (error) {
    console.error('Error checking email existence: ', error)
    throw new Error('Failed to verify email.')
  }
}