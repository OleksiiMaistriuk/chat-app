import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import firebaseService from "firebaseService";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { PaginatedTasks } from "./Pagination";

export const CompletedComponent = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentValue, setCurrentValue] = useState("");

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

  const departments = completedTasks.map(
    ({ creatorDepartment }) => creatorDepartment
  );
  const filteredDepartments = [...new Set(departments)];

  const search = completedTasks.filter(
    (task) => task.creatorDepartment?.indexOf(currentValue) > -1
  );

  console.log(search);

  return (
    <div className="m-auto ">
      <div className="row mb-3">
        {" "}
        <div className=" text-center col-xs-4 col-lg-3 col-md-4  ">
          <Form.Label className=" fw-semibold " htmlFor="floatingSelect">
            Wybierz dział
          </Form.Label>
          <Form.Select
            className="fs-6 text-center  bg-light bg-opacity-75 fw-semibold"
            onChange={(e) => setCurrentValue(e.target.value)}
          >
            <option value="">Wszystkie</option>
            {filteredDepartments.map((e, index) => (
              <option key={index}>{e}</option>
            ))}
          </Form.Select>
        </div>
      </div>
      <PaginatedTasks completedTasks={search} />
    </div>
  );
};
