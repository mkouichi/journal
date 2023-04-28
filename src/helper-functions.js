import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

import store from "./store";

const userId = store.getters.getUserId;

// Define a reference to the "journal" collection
const journalRef = collection(db, "journal");

// Create a query against the collection
// Only get entries for the current user
const q = query(journalRef, where("userId", "==", userId));

// Get data once
const getDataFromDB = async () => {
  const entries = [];

  // Set loading state to true
  store.dispatch("dialog/setLoading", true);

  // Retrieve data from the Firestore database using the provided query
  const querySnapshot = await getDocs(q);

  // Iterate over each document returned by the query and add it to the entries array
  querySnapshot.forEach((doc) => {
    const entry = {
      ...doc.data(),
      // Use the generated id
      id: doc.id,
    };

    // Add the entry to the beginning of the array
    entries.unshift(entry);
  });

  // Set loading state to false
  store.dispatch("dialog/setLoading", false);

  // Store the retrieved data in Vuex by dispatching a Vuex action
  store.dispatch("journal/setEntryData", entries);

  // Return the retrieved entries
  return entries;
};

export { getDataFromDB };
