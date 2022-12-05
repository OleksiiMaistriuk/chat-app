import { useAuthContext } from "context/AuthContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { db } from "../../firebase/firebase";
import {
  DeleteFirebaseDoc,
  EditFirebaseDoc,
} from "../../firebase/FirebaseDocsEditor";

interface Task {
  createdDate: Timestamp;
  task: string;
  displayName: string;
  id: string;
}
export const Tasks = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [editedTask, setEditedTask] = useState("");
  const [cancelValues, setCancelValues] = useState<Task | null>(null);

  const currentUser = useAuthContext();

  const collectionRef = collection(db, "tasks");

  useEffect(() => {
    try {
      getTasks();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getTasks = async () => {
    await onSnapshot(collectionRef, (task) => {
      let tasksData = task.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTasks(tasksData);
    });
  };

  const changeBGcolorAfterTime = (createdDate: Date) => {
    const date = new Date();
    const FIVE_MIN = 10 * 60 * 1000;

    if (date.getTime() - new Date(createdDate).getTime() > FIVE_MIN) {
      return { backgroundColor: "#cc2c27" };
    } else {
      return { backgroundColor: "#038138" };
    }
  };

  const handleAcceptTask = async (
    e: any,
    { createdDate, task, displayName, id }: any
  ) => {
    e.preventDefault();
    const collectionRef = collection(db, "completed-tasks");
    try {
      if (task) {
        await addDoc(collectionRef, {
          task,
          uid: id,
          displayName,
          createdDate,
          date: serverTimestamp(),
          isDone: true,
        });
        await deleteDoc(doc(db, "tasks", id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelTask = async (e: any) => {
    e.preventDefault();
    const collectionRef = collection(db, "completed-tasks");
    const event = e.target.explain.value;
    try {
      if (cancelValues) {
        await addDoc(collectionRef, {
          ...cancelValues,
          date: serverTimestamp(),
          isDone: false,
          explanation: event,
        });

        await deleteDoc(doc(db, "tasks", cancelValues.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {tasks.map(({ createdDate, task, displayName, id }: Task) => (
        <div className="m-auto mb-3" key={id}>
          <Card
            style={changeBGcolorAfterTime(createdDate?.toDate())}
            className={`rounded-start rounded-end  overflow-hidden  shadow`}
          >
            <Card.Body
              style={changeBGcolorAfterTime(createdDate?.toDate())}
              className={`p-1 bg-opacity-10  d-flex gap-2 align-items-center d-flex justify-content-between`}
            >
              <div className="">
                <Card.Title>{displayName}</Card.Title>
                <Card.Text className="fst-italic">
                  {new Date(createdDate?.seconds * 1000)
                    .toLocaleString()
                    .slice(0, 10)}
                  {moment(createdDate?.toDate()).toString().slice(15, 21)}
                </Card.Text>
              </div>
              <Card.Text className="fw-semibold">{task}</Card.Text>
              <div className="d-flex gap-2 align-items-center ">
                {currentUser?.displayName === "magazyn" ? (
                  <>
                    <Button
                      className=" h-50 d-flex align-items-center "
                      variant="primary"
                      onClick={(e) => {
                        handleAcceptTask(e, {
                          createdDate,
                          task,
                          displayName,
                          id,
                        });
                        setTaskId(id);
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      className="h-50 d-flex align-items-center "
                      variant="primary"
                      onClick={() => {
                        setCancelValues({ createdDate, task, displayName, id });
                        setTaskId(id);
                        setShowExplanation(true);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  ""
                )}
                {currentUser?.displayName === displayName ? (
                  <>
                    {" "}
                    <Button
                      className="h-50 d-flex align-items-center "
                      variant="primary"
                      onClick={() => {
                        setTaskId(id);
                        setShowEdit(true);
                        setEditedTask(task);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setTaskId(id);
                        setShow(true);
                      }}
                      className="h-50 d-flex align-items-center "
                      variant="primary"
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}

      <Modal show={show} onHide={() => setShow(false)}>
        {" "}
        <Form className="p-3">
          <Modal.Header closeButton>
            <Modal.Title>Delete task</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to delete task?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={(e) => {
                DeleteFirebaseDoc(e, "tasks", taskId);
                setShow(false);
                setTaskId("");
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
        }}
      >
        <Form
          className="p-3"
          onSubmit={(e) => {
            EditFirebaseDoc(e, "tasks", taskId);
            setShowEdit(false);
            setTaskId("");
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              defaultValue={editedTask}
              type="text"
              placeholder="Edit task"
              name="editTask"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEdit(false)}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={showExplanation}
        onHide={() => {
          setShowExplanation(false);
        }}
      >
        <Form
          className="p-3"
          onSubmit={(e) => {
            handleCancelTask(e);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>explain</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              defaultValue={editedTask}
              type="text"
              placeholder="explain"
              name="explain"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowExplanation(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => setShowExplanation(false)}
              type="submit"
              variant="primary"
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
