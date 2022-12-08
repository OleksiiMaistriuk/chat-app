import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const EditFirebaseDoc = async (e, collectionName, docId) => {
  e.preventDefault();
  const event = e.target.editTask.value;

  try {
    await updateDoc(doc(db, collectionName, docId), { task: event });
  } catch (error) {
    console.log(error);
  }
};

export const DeleteFirebaseDoc = async (e, docId, collectionName) => {
  e.preventDefault();

  try {
    await deleteDoc(doc(db, docId, collectionName));
  } catch (error) {
    console.log(error);
  }
};
