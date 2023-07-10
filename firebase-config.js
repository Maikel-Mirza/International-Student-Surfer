// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI_pwc43gUWOuSdB-52pP3DevQJBlf4oA",
  authDomain: "unisurf-de1e3.firebaseapp.com",
  databaseURL:
    "https://unisurf-de1e3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "unisurf-de1e3",
  storageBucket: "unisurf-de1e3.appspot.com",
  messagingSenderId: "564794753151",
  appId: "1:564794753151:web:61caae51e814c1cd263f4a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
