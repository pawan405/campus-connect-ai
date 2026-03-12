import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const requiredEnvVars = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
] as const;

const getEnv = (key: (typeof requiredEnvVars)[number]) => {
  const value = import.meta.env[key];
  if (!value) {
    console.error(`Missing required env: ${key}`);
  }
  return value;
};

const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY"),
  authDomain: getEnv("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: getEnv("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: getEnv("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: getEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: getEnv("VITE_FIREBASE_APP_ID"),
};

const missing = requiredEnvVars.filter((key) => !import.meta.env[key]);

// If env is missing, don't crash the whole app; export null handles so UI can still render
if (missing.length) {
  console.error(
    `Firebase config missing env vars: ${missing.join(", ")}. UI will render but Firebase features are disabled until these are set.`,
  );
}

const app = missing.length ? null : initializeApp(firebaseConfig);
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
