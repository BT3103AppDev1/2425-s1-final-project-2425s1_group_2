// write errors
import firebaseApp from '../../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { doc, setDoc, addDoc, serverTimestamp, collection } from 'firebase/firestore'

if (import.meta.env.MODE !== 'test') {
  var db = getFirestore(firebaseApp)
}

export async function createUser(email, username, password, cPassword) {
  // have to rewrite this with authentification in mind
  // use firebase authentification to Create
  //eg
  // // Create user in Firebase Authentication (instead of Firestore)
  // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  // const userId = userCredential.user.uid;  // Firebase Auth user ID

  try {
    if (password === cPassword) {
      const userRef = await addDoc(collection(db, 'UserProfile'), {
        DateCreated: serverTimestamp(),
        Email: email,
        Username: username,
        password: password,
        ProfileType: 'Customer'
      })
      const userId = userRef.id

      await setDoc(doc(db, 'UserProfile', userId), {
        UserId: userId,
        DateCreated: serverTimestamp(),
        Email: email,
        Username: username,
        password: password,
        ProfileType: 'Customer'
      })

      document.getElementById('userForm').reset()
      console.log('Account Created Successfully!')
    } else {
      throw new Error('Passwords do not match!')
    }
  } catch (error) {
    console.error('Error adding document: ', error)
    console.log('No Account Created.' + error)
  }
}
