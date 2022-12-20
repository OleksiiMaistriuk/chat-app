import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { Card, Nav } from "react-bootstrap";
import { NavBar } from "./components/NavBar";

export const Home = () => {
  const [active, setActive] = useState("default");

  return (
    <div className="m-auto ">
      <Card>
        <Card.Header className="bg-secondary bg-opacity-50 text-white d-flex justify-content-between ">
          <Nav
            activeKey={active}
            variant="tabs"
            defaultActiveKey="/tasks"
            className="pb-1 gap-2"
            onSelect={(selectedKey) => setActive(selectedKey)}
          >
            <Nav.Item>
              <Nav.Link
                eventKey="new-message"
                as={Link}
                to={"/new-message"}
                className={`${
                  active === "new-message" ? "bg-dark" : ""
                } text-white bg-opacity-25 rounded-start rounded-end `}
                style={{ border: "none" }}
              >
                Nowe zadanie
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="tasks"
                as={Link}
                to={"/tasks"}
                className={`${
                  active === "tasks" ? "bg-dark" : ""
                } text-white bg-opacity-25 rounded-start rounded-end `}
                style={{ border: "none" }}
              >
                Zadania do wykonania
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                eventKey="completed"
                to={"/completed"}
                className={`${
                  active === "completed" ? "bg-dark" : ""
                } text-white bg-opacity-25 rounded-start rounded-end `}
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
