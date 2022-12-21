import { useAuthContext } from "context/AuthContext";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import firebaseService from "firebaseService";
import { useEffect, useState } from "react";
import { PaginatedTasks } from "./Pagination";

export const CompletedComponent = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const collectionRef = collection(firebaseService.db, "completed-tasks");

  const q = query(collectionRef, orderBy("date"));
  const getTasks = async () => {
    await onSnapshot(q, (task) => {
      let tasksData = task.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCompletedTasks(tasksData.reverse());
    });
  };

  useEffect(() => {
    try {
      getTasks();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="m-auto ">
      <PaginatedTasks completedTasks={completedTasks} />
    </div>
  );
};
