import { Card, CloseButton } from "react-bootstrap";

export const Chat = () => {
  return (
    <div className="m-auto ">
      {" "}
      <Card
        role="button"
        className="rounded-start rounded-end  overflow-hidden bg-success shadow  "
      >
        {/* <Card.Header className="bg-info" as="h5">
          Name
        </Card.Header> */}
        <Card.Body className="p-1 bg-opacity-10 bg-success d-flex gap-2 align-items-center d-flex justify-content-between">
          <div className="d-flex gap-4">
            <Card.Title>Time</Card.Title>
            <Card.Title>Name</Card.Title>
          </div>
          <Card.Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
          </Card.Text>
          <div style={{ height: "50px" }}>
            {/* <Button
              className="mb-2 h-50 d-flex align-items-center "
              variant="primary"
            >
              Accept
            </Button>
            <Button
              className="h-50 d-flex align-items-center "
              variant="primary"
            >
              Cancel
            </Button> */}
            <CloseButton />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
