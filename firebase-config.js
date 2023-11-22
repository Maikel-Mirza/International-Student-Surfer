// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGnyElXfx9m1gaTCWgOw5st4I_2zXWjDM",
  authDomain: "controller-47601.firebaseapp.com",
  databaseURL:
    "https://controller-47601-default-rtdb.firebaseio.com",
  projectId: "controller-47601",
  storageBucket: "controller-47601.appspot.com",
  messagingSenderId: "958161953407",
  appId: "1:958161953407:web:ef3eb6658375657ea8d54a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
