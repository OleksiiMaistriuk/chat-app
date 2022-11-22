import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
// type Props = {
//   onSetIsLogin: () => void;
// };
export const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  // const handleClick = (e: React.SyntheticEvent): void => {
  //   e.preventDefault();
  //   onSetIsLogin();
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value + "@mail.com";
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
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
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          {err && <p className="text-danger">Invalid name or password</p>}
        </Card.Body>

        <Card.Footer className="text-muted">
          You don't have account? <Link to="/register"> Register</Link>
          {/* <a href="" className="" onClick={handleClick}>
            Register
          </a> */}
        </Card.Footer>
      </Card>
    </div>
  );
};
