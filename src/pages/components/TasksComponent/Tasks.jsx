import { useAuthContext } from "context/AuthContext";
import { useUserDocsContext } from "context/UserDocsContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import firebaseService from "firebaseService";
import {
  DeleteFirebaseDoc,
  EditFirebaseDoc,
} from "firebaseService/firebaseDocsEditor";
import moment from "moment";
import { useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";

export const Tasks = ({ tasks }) => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [editedTask, setEditedTask] = useState("");
  const [nulledValue, setNulledValue] = useState(null);
  const [taskId, setTaskId] = useState("");

  const currentUser = useAuthContext();
  const currentUserDocs = useUserDocsContext();

  // useEffect(() => {
  //   console.log(currentUser);
  // }, [currentUser]);

  const handleAcceptTask = async (
    e,
    { createdDate, task, displayName, id, creatorDepartment }
  ) => {
    e.preventDefault();
    const collectionRef = collection(firebaseService.db, "completed-tasks");
    try {
      if (task) {
        await addDoc(collectionRef, {
          task,
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

  return (
    <>
      {" "}
      {tasks.map(
        ({ createdDate, task, displayName, id, creatorDepartment }) => (
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
                <Card.Text className="fw-semibold w-50">{task}</Card.Text>
                <div className="d-flex gap-2 align-items-center ">
                  {currentUserDocs.department === "magazyn" ? (
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
                            creatorDepartment,
                          });
                          setTaskId(id);
                        }}
                      >
                        Zaakceptować
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
                        Anulować
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
                        Edytować
                      </Button>
                      <Button
                        onClick={() => {
                          setTaskId(id);
                          setShow(true);
                        }}
                        className="h-50 d-flex align-items-center "
                        variant="primary"
                      >
                        Usunąć
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
            <Modal.Title>Usuń zadanie</Modal.Title>
          </Modal.Header>
          <Modal.Body>Czy chcesz usunąć zadanie?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Zamknąć
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
              Usunąć
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
              Zamknąć
            </Button>
            <Button type="submit" variant="primary">
              Zapisać
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
            Napisz dlaczego nie możesz tego zrobić.
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              defaultValue={editedTask}
              type="text"
              placeholder="Wytłumaczyć"
              name="explain"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowExplanation(false)}
            >
              Zamknąć
            </Button>
            <Button
              onClick={() => setShowExplanation(false)}
              type="submit"
              variant="primary"
            >
              Zapisać
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
