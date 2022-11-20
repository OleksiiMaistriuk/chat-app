import { signOut } from "firebase/auth";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
export const NavBar = () => {
  return (
    <div className="d-flex align-items-center">
      <p className="me-3 h4 text-light">user name</p>

      <Link to="/auth " className="text-decoration-none">
        {" "}
        <Button
          onClick={() => signOut(auth)}
          variant="light"
          className="text-decoration-none d-flex align-items-center fs-6 text fw-bold text-muted"
        >
          logout{" "}
        </Button>
      </Link>
    </div>
  );
};
