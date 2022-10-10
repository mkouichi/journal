import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

import store from "./store";

// Collection ref
const colRef = collection(db, "journal");

// Get data once
const getDataFromDB = async () => {
  const entries = [];

  // Set loading to true
  store.dispatch("journal/setLoading", { dataName: "journal", status: true });

  const querySnapshot = await getDocs(colRef);

  querySnapshot.forEach((doc) => {
    const entry = {
      ...doc.data(),
      // Use the generated id
      id: doc.id,
    };
    entries.unshift(entry);
  });

  // Set loading to false
  store.dispatch("journal/setLoading", {
    dataName: "journal",
    status: false,
  });

  // Set data to Vuex
  store.dispatch("journal/setEntryData", entries);

  return entries;
};

export { getDataFromDB };
