import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

// Get data once
const getDataFromDB = async () => {
  const entries = [];
  const querySnapshot = await getDocs(collection(db, "journal"));

  querySnapshot.forEach((doc) => {
    const entry = {
      ...doc.data(),
      // Use the generated id
      id: doc.id,
    };
    entries.unshift(entry);
  });

  return entries;
};

// Update data


// Delete data


// Keep on listening to changes in the collection
// const getDataFromDBAndListenToChanges = () => {
//   const entries = [];

//   onSnapshot(collection(db, "journal"), (querySnapshot) => {
//     // Loop through each entry in the collection
//     querySnapshot.forEach((doc) => {
//       const entry = {
//         ...doc.data(),
//         // Use the generated id
//         id: doc.id,
//       };
//       entries.unshift(entry);
//     });
//   });

//   return entries;
// };

export { getDataFromDB };
