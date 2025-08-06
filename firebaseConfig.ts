import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6X1DijSgpur-YUVe7s8byv15oYwaSMQ4",
  authDomain: "quickdish-1e0aa.firebaseapp.com",
  projectId: "quickdish-1e0aa",
  storageBucket: "quickdish-1e0aa.firebasestorage.app",
  messagingSenderId: "670620986025",
  appId: "1:670620986025:web:9505b44b212dbfde9817b8",
  measurementId: "G-6VJ9SQX3VK"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;