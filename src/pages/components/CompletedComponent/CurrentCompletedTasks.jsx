import moment from "moment";
import { Card } from "react-bootstrap";

export const CurrentCompletedTasks = ({ currentCompletedTasks }) => {
  return (
    <>
      {" "}
      {currentCompletedTasks.map(
        ({ date, createdDate, task, displayName, id, explanation, isDone }) => (
          <div className="m-auto mb-3" key={id}>
            <Card
              className={`rounded-start ${
                isDone ? "bg-success" : "bg-warning"
              } rounded-end  overflow-hidden  shadow`}
            >
              <Card.Body
                className={`p-1 bg-opacity-10 ${
                  isDone ? "bg-success" : "bg-warning"
                } d-flex gap-2 align-items-center d-flex justify-content-between`}
              >
                <div className="d-flex gap-4">
                  <Card.Title>{displayName}</Card.Title>
                  <Card.Text className="fst-italic">
                    {new Date(createdDate.seconds * 1000)
                      .toLocaleString()
                      .slice(0, 10)}
                    {moment(createdDate.toDate()).toString().slice(15, 21)}
                  </Card.Text>

                  <Card.Text className="fst-italic">
                    {new Date(date.seconds * 1000)
                      .toLocaleString()
                      .slice(0, 10)}
                    {moment(date.toDate()).toString().slice(15, 21)}
                  </Card.Text>
                </div>
                <div className=" w-50  d-flex justify-content-between me-5">
                  <Card.Text className="fw-semibold">{task}</Card.Text>
                  <Card.Text className="fw-semibold">{explanation}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </div>
        )
      )}
    </>
  );
};
