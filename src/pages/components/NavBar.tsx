import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <div className="d-flex align-items-center">
      <p className="me-3 h4 text-light">user name</p>

      <Link to="/auth " className="text-decoration-none">
        {" "}
        <Button
          variant="light"
          className="text-decoration-none d-flex align-items-center fs-6 text fw-bold text-muted"
        >
          logout{" "}
        </Button>
      </Link>
    </div>
  );
};
