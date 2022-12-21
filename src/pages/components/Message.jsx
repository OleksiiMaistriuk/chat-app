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

  const currentUser = useAuthContext();
  const currentUserDocs = useUserDocsContext();

  const handleSendTask = async (e) => {
    e.preventDefault();
    const collectionRef = collection(firebaseService.db, "tasks");
    try {
      if (task) {
        await addDoc(collectionRef, {
          task,
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
    <div className="m-auto">
      <Form onSubmit={(e) => handleSendTask(e)}>
        <Form.Group className="mb-3" controlId="task">
          <Form.Control
            value={task}
            autoFocus
            type="text"
            placeholder="Wpisz zadanie"
            onChange={(e) => setTask(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Wysłać
        </Button>
      </Form>
    </div>
  );
};
