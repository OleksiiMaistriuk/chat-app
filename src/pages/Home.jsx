import { NavLink, Outlet } from "react-router-dom";

import { Card, Nav } from "react-bootstrap";
import { NavBar } from "./components/NavBar";

export const Home = () => {
  return (
    <div className="m-auto ">
      <Card>
        <Card.Header className="bg-secondary bg-opacity-50 text-white d-flex justify-content-between ">
          <Nav variant="tabs" defaultActiveKey="/tasks" className="pb-1 gap-2">
            <Nav.Item>
              <Nav.Link
                eventKey="new-message"
                as={NavLink}
                to={"/new-message"}
                className={` text-white bg-opacity-25 rounded-start rounded-end `}
                style={{ border: "none" }}
              >
                Nowe zadanie
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="tasks"
                as={NavLink}
                to={"/tasks"}
                className={` text-white bg-opacity-25 rounded-start rounded-end `}
                style={{ border: "none" }}
              >
                Zadania do wykonania
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                eventKey="completed"
                to={"/completed"}
                className={` text-white bg-opacity-25 rounded-start rounded-end `}
                style={{ border: "none" }}
              >
                Zakończone
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <NavBar></NavBar>
        </Card.Header>
        <Card.Body className="bg-dark text-white bg-opacity-50 rounded-bottom">
          <Outlet />
        </Card.Body>
      </Card>
    </div>
  );
};
