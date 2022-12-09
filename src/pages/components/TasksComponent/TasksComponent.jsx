import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import firebaseService from "firebaseService";
import { useEffect, useState } from "react";
import { Tasks } from "./Tasks";

export const TasksComponent = () => {
  const [tasks, setTasks] = useState([]);

  const collectionRef = collection(firebaseService.db, "tasks");
  const q = query(collectionRef, orderBy("createdDate"));

  const getTasks = async () => {
    await onSnapshot(q, (task) => {
      let tasksData = task.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTasks(tasksData);
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
    <>
      <Tasks tasks={tasks} />
    </>
  );
};
