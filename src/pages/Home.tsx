import { Card, Nav } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";
export const Home = () => {
  return (
    <div className="m-auto ">
      <Card>
        <Card.Header className="bg-secondary bg-opacity-50 text-white d-flex justify-content-between ">
          <Nav variant="tabs" defaultActiveKey="#first" className="pb-1 gap-2">
            <Nav.Item>
              <Nav.Link
                as={Link}
                to={"/active"}
                className="bg-dark text-white bg-opacity-25 rounded-start rounded-end "
                style={{ border: "none" }}
              >
                Active
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to={"/complited"}
                className="bg-dark text-white bg-opacity-25 rounded-start rounded-end"
                style={{ border: "none" }}
              >
                Complited
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to={"/new-message"}
                className="bg-dark text-white bg-opacity-25 rounded-start rounded-end"
                style={{ border: "none" }}
              >
                New message
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <NavBar></NavBar>
        </Card.Header>
        <Card.Body className="bg-dark text-white bg-opacity-50 rounded-bottom">
          {/* <Card.Title>title</Card.Title> */}

          <Card.Text>
            <Outlet />
          </Card.Text>
          {/* <Button variant="primary">button</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
};
