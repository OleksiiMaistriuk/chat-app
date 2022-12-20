import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebaseService from "../firebaseService";

import { Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";

export const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value + "@mail.com";
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(firebaseService.auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="m-auto " style={{ maxWidth: "500px" }}>
      <Card className="flex">
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nazwa użytkownika</Form.Label>
              <Form.Control type="name" placeholder="Wpisz nazwę użytkownika" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Hasło</Form.Label>
              <Form.Control type="password" placeholder="Wpisz hasło" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Zaloguj sie
            </Button>
          </Form>
          {err && (
            <p className="text-danger mt-2 text-center">
              Nieprawidłowa Nazwa użytkownika lub Hasło
            </p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
