import { Button, Card, Form, InputGroup } from "react-bootstrap";

export const Complited = () => {
  return (
    <div className="m-auto ">
      {" "}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button variant="primary" id="button-addon2">
          Find
        </Button>
      </InputGroup>
      <Card className="rounded-start rounded-end overflow-hidden bg-success shadow ">
        <Card.Body className="p-1 bg-success d-flex gap-2 align-items-center d-flex justify-content-between">
          <div className="d-flex gap-4">
            <Card.Title>time</Card.Title>
            <Card.Title>name</Card.Title>
          </div>
          <Card.Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
          </Card.Text>
          {/*<div style={{ height: "50px" }}>
            <Button
              className="h-50 d-flex align-items-center "
              variant="primary"
            >
              Delete
            </Button> 
          </div>*/}
        </Card.Body>
      </Card>
    </div>
  );
};
