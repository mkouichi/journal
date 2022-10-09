import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

// Collection ref
const colRef = collection(db, "journal");

// Get data once
const getDataFromDB = async () => {
  const entries = [];
  const querySnapshot = await getDocs(colRef);

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
