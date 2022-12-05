import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const EditFirebaseDoc = async (
  e: any,
  collectionName: string,
  docId: string
) => {
  e.preventDefault();
  const event = e.target.editTask.value;
  console.log(collectionName);
  try {
    await updateDoc(doc(db, collectionName, docId), { task: event });
  } catch (error) {
    console.log(error);
  }
};

export const DeleteFirebaseDoc = async (
  e: any,
  docId: string,
  collectionName: string
) => {
  e.preventDefault();

  try {
    await deleteDoc(doc(db, docId, collectionName));
  } catch (error) {
    console.log(error);
  }
};
