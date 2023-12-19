import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

let db;
let auth;

// Fetch the Firebase configuration data from the server-side '/firebase-config' endpoint
// Define a constant that stores the URL used to retrieve Firebase configuration so that the request can be cached
const FIREBASE_CONFIG_URL =
  'https://journal-lake.vercel.app/api/firebase-config';

// Define a variable to store the cached Firebase configuration
let cachedFirebaseConfig;

async function getFirebaseConfig() {
  if (cachedFirebaseConfig) {
    // Return the cached Firebase configuration if it exists
    return cachedFirebaseConfig;
  } else {
    try {
      // Retrieve Firebase configuration
      const response = await fetch(FIREBASE_CONFIG_URL);
      const firebaseConfig = await response.json();

      // Cache Firebase configuration
      cachedFirebaseConfig = firebaseConfig;

      // Return Firebase configuration
      return firebaseConfig;
    } catch (error) {
      // Log an error if one occurs
      console.error('Failed to fetch Firebase config:', error);
    }
  }
}

async function init() {
  const firebaseConfig = await getFirebaseConfig();

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(app);

  // Initialize Firebase Authentication and get a reference to the service
  auth = getAuth(app);
}

await init();

export { db, auth };
