import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import store from "./store";

// Function to fetch data from the database
const fetchJournalEntries = async (userId) => {
  // Define a reference to the "journal" collection
  const collectionRef = collection(db, "journal");

  // Create a query against the collection
  // Only get entries for the current user
  const q = query(collectionRef, where("userId", "==", userId));

  try {
    // Retrieve data from the Firestore database using the provided query
    const querySnapshot = await getDocs(q);

    // Return an array of journal entries with added ids
    return querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch journal entries");
  }
};

// Function to get data and store it in Vuex
const loadJournalEntries = async (userId) => {
  // Set loading state to true
  store.dispatch("setLoading", true);

  try {
    // Retrieve data from the Firestore database
    const entries = await fetchJournalEntries(userId);

    // Store the retrieved data in Vuex by dispatching a Vuex action
    await store.dispatch("journal/setEntryData", entries);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get data from database");
  } finally {
    // Set loading state to false
    store.dispatch("setLoading", false);
  }
};

export { loadJournalEntries };
