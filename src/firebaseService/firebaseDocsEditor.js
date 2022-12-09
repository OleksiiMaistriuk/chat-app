import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import firebaseService from "firebaseService";

export const EditFirebaseDoc = async (e, collectionName, docId) => {
  e.preventDefault();
  const event = e.target.editTask.value;

  try {
    await updateDoc(doc(firebaseService.db, collectionName, docId), {
      task: event,
    });
  } catch (error) {
    console.log(error);
  }
};

export const DeleteFirebaseDoc = async (e, docId, collectionName) => {
  e.preventDefault();

  try {
    await deleteDoc(doc(firebaseService.db, docId, collectionName));
  } catch (error) {
    console.log(error);
  }
};
