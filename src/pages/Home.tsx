import { useState } from "react";
import { Card, Nav } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";
export const Home = () => {
  const [active, setActive] = useState<any>("default");

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
                eventKey="tasks"
                as={Link}
                to={"/tasks"}
                className={`${
                  active === "tasks" ? "bg-dark" : ""
                } text-white bg-opacity-25 rounded-start rounded-end `}
                style={{ border: "none" }}
              >
                Tasks
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                eventKey="complited"
                to={"/complited"}
                className={`${
                  active === "complited" ? "bg-dark" : ""
                } text-white bg-opacity-25 rounded-start rounded-end `}
                style={{ border: "none" }}
              >
                Complited
              </Nav.Link>
            </Nav.Item>
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
                New message
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
