import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

import { db } from "./../firebase/firebase";
type Props = {
  onSetIsLogin: () => void;
};

//    <ToastContainer className="p-3" position={position}></ToastContainer>
export const RegisterPage = ({ onSetIsLogin }: Props) => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    onSetIsLogin();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value + "@mail.com";
    const displayName = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName,
      });
      await setDoc(doc(db, "magazyn", res.user.uid), {
        uid: res.user.uid,
        name: res.user.displayName,
      });
      navigate("/");
      // const storageRef = ref(storage, "images/rivers.jpj");

      // const uploadTask = uploadBytesResumable(storageRef, displayName);

      // uploadTask.on(
      //   "state_changed",

      //   (error) => {
      //     console.log(error);
      //   },

      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      //       await updateProfile(res.user, {
      //         displayName,
      //         photoURL: downloadURL,
      //       });
      //       await setDoc(doc(db, "users", res.user.uid), {
      //         uid: res.user.uid,
      //         displayName,
      //       });
      //     });
      //   }
      // );
      console.log(res.user);
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <>
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
          You have account?
          <a href="" className="" onClick={handleClick}>
            Login
          </a>
        </Card.Footer>
      </Card>
    </>
  );
};
