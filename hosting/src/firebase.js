import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFunctions,
  httpsCallable
} from "firebase/functions";

import {getFirestore} from "firebase/firestore";

const env = process.env;

const firebaseConfig = {
  apiKey: env.REACT_APP_API_KEY,
  authDomain: env.REACT_APP_AUTH_DOMAIN,
  databaseURL: env.REACT_APP_DATABASE_URL,
  projectId: env.REACT_APP_PROJECT_ID,
  storageBucket: env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_APP_ID,
  measurementId: env.REACT_APP_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const functions = getFunctions(app, 'asia-northeast1');
export const startGameFunction = httpsCallable(functions, 'startGame');

export const firestore = getFirestore(app);
