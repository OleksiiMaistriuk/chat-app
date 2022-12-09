import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import firebaseService from "firebaseService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
export const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value + "@mail.com";
    const displayName = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await createUserWithEmailAndPassword(
        firebaseService.auth,
        email,
        password
      );
      await updateProfile(res.user, {
        displayName,
      });

      await setDoc(doc(firebaseService.db, "users", res.user.uid), {
        uid: res.user.uid,
        name: res.user.displayName,
      });

      await setDoc(doc(firebaseService.db, "usersChats", res.user.uid), {});

      await signInWithEmailAndPassword(firebaseService.auth, email, password);

      navigate("/");

      console.log(res.user);
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <div className="m-auto " style={{ maxWidth: "500px" }}>
      <Card className="flex">
        <Card.Header as="h5">Register</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
          {err && <p className="text-danger">Invalid name or password</p>}
        </Card.Body>
        <Card.Footer className="text-muted">
          {" "}
          You have account?<Link to="/login"> Login</Link>
          {/* <a href="" className="" onClick={handleClick}> */}
          {/* Login
          </a> */}
        </Card.Footer>
      </Card>
    </div>
  );
};
