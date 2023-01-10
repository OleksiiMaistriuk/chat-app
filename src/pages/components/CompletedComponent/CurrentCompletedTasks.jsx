import { doc, updateDoc } from "firebase/firestore";
import firebaseService from "firebaseService/index";
import moment from "moment";
import { Button, Card } from "react-bootstrap";
import { useUserDocsContext } from "./../../../context/UserDocsContext";

export const CurrentCompletedTasks = ({ currentCompletedTasks }) => {
  const hideButton = async (id) => {
    const docRef = doc(firebaseService.db, "completed-tasks", `${id}`);
    await updateDoc(docRef, {
      showButton: false,
    });
  };
  const currentUserDocs = useUserDocsContext();
  return (
    <>
      {" "}
      {currentCompletedTasks.map(
        ({
          showButton,
          date,
          mistake,
          createdDate,
          task,
          displayName,
          id,
          explanation,
          isDone,
          currentUserName,
          department,
          creatorDepartment,
        }) => (
          <div className="m-auto mb-3" key={id}>
            <Card
              className={`rounded-start ${
                isDone ? "bg-success" : "bg-warning"
              } rounded-end  overflow-hidden  shadow`}
            >
              <Card.Body
                className={`p-1 bg-opacity-10 ${
                  isDone ? "bg-success" : "bg-warning"
                }   d-flex gap-2 align-items-center d-flex justify-content-between tasks-card`}
              >
                <div className="  d-flex gap-4">
                  <div className="d-flex gap-2">
                    <Card.Text className="fw-semibold ">
                      {creatorDepartment}
                    </Card.Text>
                    <Card.Text className="fw-semibold">{displayName}</Card.Text>
                  </div>

                  <Card.Text className="fst-italic">
                    {new Date(createdDate.seconds * 1000)
                      .toLocaleString()
                      .slice(0, 10)}
                    {moment(createdDate.toDate()).toString().slice(15, 21)}
                  </Card.Text>

                  <div className="d-flex gap-2">
                    {" "}
                    <Card.Text className="fw-semibold">{department}</Card.Text>
                    <Card.Text className="fw-semibold">
                      {currentUserName}
                    </Card.Text>
                  </div>

                  <Card.Text className="fst-italic">
                    {new Date(date.seconds * 1000)
                      .toLocaleString()
                      .slice(0, 10)}
                    {moment(date.toDate()).toString().slice(15, 21)}
                  </Card.Text>
                </div>
                {explanation ? (
                  <div className=" w-50  d-flex justify-content-between me-5">
                    <Card.Text className="fw-semibold w-50 text-center">
                      {task}
                    </Card.Text>
                    <Card.Text className="fw-semibold w-50 text-center">
                      {explanation}
                    </Card.Text>
                  </div>
                ) : (
                  <div className=" w-50  d-flex justify-content-between me-5">
                    <Card.Text className="fw-semibold w-100 text-center">
                      {task}
                      {mistake && (
                        <span className="m-1 text-light">
                          {mistake}{" "}
                          {showButton &&
                            currentUserDocs.department !== "magazyn" && (
                              <Button
                                // @ts-ignore
                                target="_blank"
                                href="https://docs.google.com/forms/d/e/1FAIpQLSdQqagsTCDw_e4S5D5DP1GUHhc39uLaeq0Y4vFQg7grTRk66A/viewform?fbzx=4352688829130287798"
                                className="ms-2 fw-semibold "
                                variant="outline-info"
                                onClick={(e) => hideButton(id)}
                              >
                                Wpisz błąd
                              </Button>
                            )}
                        </span>
                      )}
                    </Card.Text>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        )
      )}
    </>
  );
};
