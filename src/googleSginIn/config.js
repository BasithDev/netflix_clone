import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,setPersistence, browserLocalPersistence} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBeE0qUE--GQTLeKO0MVqnMOxAIbvSn-Yw",
  authDomain: "netflix-clone-6dfa8.firebaseapp.com",
  projectId: "netflix-clone-6dfa8",
  storageBucket: "netflix-clone-6dfa8.appspot.com",
  messagingSenderId: "95985173033",
  appId: "1:95985173033:web:2a74883e2ed53c9da8d238",
  measurementId: "G-CYTTND4FDV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
setPersistence(auth, browserLocalPersistence);
export {auth,provider}