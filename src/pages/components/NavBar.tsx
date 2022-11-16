import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <div className="d-flex align-items-center">
      <p className="me-3">user name</p>

      <Link to="/auth">
        {" "}
        <Button
          variant="light"
          className=" h-1 d-flex align-items-center"
          style={{ height: "40px" }}
        >
          logout{" "}
        </Button>
      </Link>
    </div>
  );
};
