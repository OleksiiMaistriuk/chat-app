import { useAuthContext } from "context/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { db } from "../../firebase/firebase";

export const Tasks = () => {
  const [messages, setMessages] = useState<any>([]);
  const [tasks, setTasks] = useState<any>([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [editedTask, setEditedTask] = useState("");

  const navigate = useNavigate();

  //@ts-ignore
  const { data } = useUserContext();
  //@ts-ignore
  const { currentUser } = useAuthContext();
  const collectionRef = collection(db, "tasks");

  useEffect(() => {
    const getTasks = async () => {
      await getDocs(collectionRef).then((task) => {
        let tasksData = task.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setTasks(tasksData);
      });
    };
    getTasks();
  }, []);

  useEffect(() => {
    console.log("data.chatId", data.chatId);
    const getMessages = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      getMessages();
    };
  }, [data.chatId]);

  useEffect(() => {
    console.log("tasks", tasks);
  }, [tasks]);

  const handleDeleteTask = async (e: any) => {
    e.preventDefault();

    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setShow(false);
      setTaskId("");

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditTask = async (e: any) => {
    e.preventDefault();
    const event = e.target.editTask.value;

    try {
      await updateDoc(doc(db, "tasks", taskId), { task: event });
      setShowEdit(false);
      setTaskId("");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const backBCAfterTime = (createdDate: any) => {
    const date = new Date();
    const FIVE_MIN = 5 * 60 * 1000;

    if (date.getTime() - new Date(createdDate).getTime() > FIVE_MIN) {
      return { backgroundColor: "#cc2c27" };
    } else {
      return { backgroundColor: "#038138" };
    }
  };

  return (
    <>
      {tasks.map(({ createdDate, task, displayName, id }: any) => (
        <div className="m-auto mb-3" key={id}>
          <Card
            style={backBCAfterTime(createdDate.toDate())}
            className={`rounded-start rounded-end  overflow-hidden  shadow`}
          >
            <Card.Body
              style={backBCAfterTime(createdDate.toDate())}
              className={`p-1 bg-opacity-10  d-flex gap-2 align-items-center d-flex justify-content-between`}
            >
              <div className="">
                <Card.Title>{displayName}</Card.Title>
                <Card.Text className="fst-italic">
                  {new Date(createdDate.seconds * 1000)
                    .toLocaleString()
                    .slice(0, 10)}
                  {moment(createdDate.toDate()).toString().slice(15, 21)}
                </Card.Text>
              </div>
              <Card.Text className="fw-semibold">{task}</Card.Text>
              <div className="d-flex gap-2 align-items-center ">
                <Button
                  className=" h-50 d-flex align-items-center "
                  variant="primary"
                >
                  Accept
                </Button>
                <Button
                  className="h-50 d-flex align-items-center "
                  variant="primary"
                >
                  Cancel
                </Button>
                {currentUser.displayName === displayName ? (
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
                handleDeleteTask(e);
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
            handleEditTask(e);
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
    </>
  );
};
