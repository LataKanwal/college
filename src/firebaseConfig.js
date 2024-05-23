import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDGnnmAC7znLilOcW6Mqkg1fUk5FV1kSh4",
    authDomain: "college123-36b80.firebaseapp.com",
    projectId: "college123-36b80",
    storageBucket: "college123-36b80.appspot.com",
    messagingSenderId: "81626968862",
    appId: "1:81626968862:web:029b281bc19865cb9ecf0f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
