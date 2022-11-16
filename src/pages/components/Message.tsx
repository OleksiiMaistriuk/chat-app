import { Button, Form } from "react-bootstrap";

export const Message = () => {
  return (
    <div className="m-auto">
      {" "}
      <Form>
        <Form.Select id="disabledSelect" className="mb-3">
          <option>department</option>
          <option>department</option>
          <option>department</option>
          <option>department</option>
          <option>department</option>
        </Form.Select>
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control type="email" placeholder="Enter message" />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">

          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
