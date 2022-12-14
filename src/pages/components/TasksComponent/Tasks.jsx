import { useAuthContext } from "context/AuthContext";
import { useUserDocsContext } from "context/UserDocsContext";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import firebaseService from "firebaseService";
import {
  DeleteFirebaseDoc,
  EditFirebaseDoc,
} from "firebaseService/firebaseDocsEditor";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";

export const Tasks = ({ tasks }) => {
  const [show, setShow] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [editedTask, setEditedTask] = useState("");
  const [nulledValue, setNulledValue] = useState(null);
  const [taskId, setTaskId] = useState("");
  const [message, setMessage] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const currentUser = useAuthContext();
  const currentUserDocs = useUserDocsContext();

  useEffect(() => {
    console.log(editIndex);
    const items = JSON.parse(localStorage.getItem("id"));
    if (items) {
      setEditIndex(items);
    }
  }, []);

  const handleAcceptTask = async (
    e,
    { createdDate, task, mistake, displayName, id, creatorDepartment }
  ) => {
    e.preventDefault();
    const collectionRef = collection(firebaseService.db, "completed-tasks");
    try {
      if (task) {
        await addDoc(collectionRef, {
          showButton: true,
          task,
          mistake,
          uid: id,
          displayName,
          createdDate,
          date: serverTimestamp(),
          isDone: true,
          currentUserName: currentUser.displayName,
          department: currentUserDocs.department,
          creatorDepartment,
        });
        await deleteDoc(doc(firebaseService.db, "tasks", id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeBGcolorAfterTime = (createdDate) => {
    const date = new Date();
    const FIVE_MIN = 10 * 60 * 1000;

    if (date.getTime() - new Date(createdDate).getTime() > FIVE_MIN) {
      return { backgroundColor: "#cc2c27" };
    } else {
      return { backgroundColor: "#038138" };
    }
  };
  const handleCancelTask = async (e) => {
    e.preventDefault();

    const collectionRef = collection(firebaseService.db, "completed-tasks");

    const event = e.target.explain.value;

    try {
      if (nulledValue && event) {
        await addDoc(collectionRef, {
          ...nulledValue,
          date: serverTimestamp(),
          isDone: false,
          explanation: event,
          department: currentUserDocs.department,
          currentUserName: currentUser.displayName,
        });

        await deleteDoc(doc(firebaseService.db, "tasks", nulledValue.id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addChat = async (e, docId) => {
    e.preventDefault();

    if (message) {
      try {
        await updateDoc(doc(firebaseService.db, "tasks", docId), {
          chat: arrayUnion(message + " "),
        });
        setMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {" "}
      {tasks.map(
        ({
          createdDate,
          task,
          mistake,
          displayName,
          id,
          creatorDepartment,
          chat,
        }) => (
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
                  <div className="d-flex gap-2">
                    <Card.Title>{creatorDepartment}</Card.Title>

                    <Card.Title>{displayName}</Card.Title>
                  </div>

                  <Card.Text className="fst-italic">
                    {new Date(createdDate?.seconds * 1000)
                      .toLocaleString()
                      .slice(0, 10)}
                    {moment(createdDate?.toDate()).toString().slice(15, 21)}
                  </Card.Text>
                </div>
                <Card.Text className="fw-semibold w-50">
                  {task}
                  <span className="m-1 text-light">{mistake} </span>
                </Card.Text>

                <div className="d-flex gap-2 align-items-center ">
                  {editIndex === id && (
                    <div>
                      <Card border="info" style={{ width: "18rem" }}>
                        <Card.Body>
                          <div className="text-dark">
                            {chat &&
                              chat.map((mes, index) => (
                                <p
                                  className={`${
                                    index & 1 ? "text-end text-secondary" : ""
                                  } fw-semibold text-uppercase`}
                                  key={index}
                                >
                                  {mes}
                                </p>
                              ))}
                          </div>
                        </Card.Body>
                      </Card>
                      <Form className="d-flex" onSubmit={(e) => addChat(e, id)}>
                        <Form.Group className="mb-3" controlId="task">
                          <Form.Control
                            className="fs-6  bg-opacity-75 fw-semibold"
                            value={message}
                            autoFocus
                            type="text"
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </Form.Group>
                        <Button
                          type="submit"
                          className="h-50 d-flex align-items-center "
                          variant="info"
                        >
                          Wysla??
                        </Button>
                      </Form>
                    </div>
                  )}
                  <Button
                    className="h-50 d-flex align-items-center "
                    variant="danger"
                    onClick={() => {
                      setEditIndex((editIndex) =>
                        editIndex === id ? null : id
                      );
                      localStorage.setItem("id", JSON.stringify(id));
                    }}
                  >
                    chat
                  </Button>

                  {currentUserDocs.department === "magazyn" ? (
                    <>
                      <Button
                        className=" h-50 d-flex align-items-center "
                        variant="primary"
                        onClick={(e) => {
                          handleAcceptTask(e, {
                            createdDate,
                            mistake,
                            task,
                            displayName,
                            id,
                            creatorDepartment,
                          });
                          setTaskId(id);
                        }}
                      >
                        Zaakceptowa??
                      </Button>
                      <Button
                        className="h-50 d-flex align-items-center "
                        variant="primary"
                        onClick={() => {
                          setNulledValue({
                            createdDate,
                            task,
                            displayName,
                            id,
                            creatorDepartment,
                          });
                          setTaskId(id);
                          setShowExplanation(true);
                        }}
                      >
                        Anulowa??
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
                        Edytowa??
                      </Button>
                      <Button
                        onClick={() => {
                          setTaskId(id);
                          setShow(true);
                        }}
                        className="h-50 d-flex align-items-center "
                        variant="primary"
                      >
                        Usun????
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        )
      )}
      <Modal show={show} onHide={() => setShow(false)}>
        {" "}
        <Form className="p-3">
          <Modal.Header closeButton>
            <Modal.Title>Usu?? zadanie</Modal.Title>
          </Modal.Header>
          <Modal.Body>Czy chcesz usun???? zadanie?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Zamkn????
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
              Usun????
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
            <Modal.Title>Edytuj zadanie</Modal.Title>
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
              Zamkn????
            </Button>
            <Button type="submit" variant="primary">
              Zapisa??
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
            Napisz dlaczego nie mo??esz tego zrobi??.
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              defaultValue={editedTask}
              type="text"
              placeholder="Wyt??umaczy??"
              name="explain"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowExplanation(false)}
            >
              Zamkn????
            </Button>
            <Button
              onClick={() => setShowExplanation(false)}
              type="submit"
              variant="primary"
            >
              Zapisa??
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
