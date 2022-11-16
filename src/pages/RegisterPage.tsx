import { Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";

type Props = {
  onSetIsLogin: () => void;
};

//    <ToastContainer className="p-3" position={position}></ToastContainer>
export const RegisterPage = ({ onSetIsLogin }: Props) => {
  const handleClick = (e: React.SyntheticEvent): void => {
    console.log(e);
    e.preventDefault();
    onSetIsLogin();
  };
  return (
    <>
      <Card className="flex">
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form>
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
        </Card.Body>
        <Card.Footer className="text-muted">
          You don't have account?{" "}
          <a href="" className="" onClick={handleClick}>
            Register
          </a>
        </Card.Footer>
      </Card>
    </>
  );
};
