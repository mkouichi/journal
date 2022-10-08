import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { isArray } from "@vue/shared";

// Keep on listening to changes in the collection
const getDataFromDBAndListenToChanges = () => {
  const entries = [];

  onSnapshot(collection(db, "journal"), (querySnapshot) => {
    // Loop through each entry in the collection
    querySnapshot.forEach((doc) => {
      const entry = {
        ...doc.data(),
        // Use the generated id
        id: doc.id,
      };
      console.log(entry);
      entries.unshift(entry);
    });
  });

  return entries;
};

export { getDataFromDBAndListenToChanges };
