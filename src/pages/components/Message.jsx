import { useAuthContext } from "context/AuthContext";
import { useUserDocsContext } from "context/UserDocsContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import firebaseService from "firebaseService";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Message = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [mistake, setMistake] = useState("");
  // const [showExplanation, setShowExplanation] = useState(false);
  // const [editedTask, setEditedTask] = useState("");
  const currentUser = useAuthContext();
  const currentUserDocs = useUserDocsContext();
  // const [showModal, setShowModal] = useState(false);

  const handleSendTask = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const collectionRef = collection(firebaseService.db, "tasks");
    try {
      if (task) {
        await addDoc(collectionRef, {
          task,
          mistake,
          uid: currentUser?.uid,
          displayName: currentUser?.displayName,
          createdDate: serverTimestamp(),
          creatorDepartment: currentUserDocs.department,
        });
      }

      setTask("");
      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-auto w-50">
      <Form onSubmit={(e) => handleSendTask(e)}>
        <Form.Group className="mb-3" controlId="task">
          <Form.Control
            className="fs-6  bg-opacity-75 fw-semibold"
            value={task}
            autoFocus
            type="text"
            placeholder="Wpisz zadanie"
            onChange={(e) => setTask(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSelect">
          <Form.Label className=" fw-semibold ">
            Wpisz rodzaj błędu (opcjonalne)
          </Form.Label>
          <Form.Control
            as="select"
            value={mistake}
            onChange={(e) => {
              console.log("e.target.value", e.target.value);
              setMistake(e.target.value);
            }}
          >
            <option value=""></option>
            <option value="Brak pozycji">Brak pozycji</option>
            <option value="Błąd ilościowy">Błąd ilościowy</option>
            <option value="Pomylony material">Pomylony material</option>
          </Form.Control>
        </Form.Group>

        <div className="m-auto w-25">
          <Button className="w-100" variant="primary" type="submit">
            Wysłać
          </Button>
        </div>
      </Form>
      {/* <Button
        className="mt-3 text-light"
        variant="success"
        type="submit"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Wysłać razem z blędem
      </Button> */}

      {/* <Modal
        show={setShowModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Form
          className="p-3"
          onSubmit={(e) => {
            handleSendTask(e);
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
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Zamknąć
            </Button>
            <Button
              onClick={() => setShowModal(false)}
              type="submit"
              variant="primary"
            >
              Zapisać
            </Button>
          </Modal.Footer>
        </Form>
      </Modal> */}
    </div>
  );
};
