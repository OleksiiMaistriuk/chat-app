import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase";

export const NavBar = () => {
  const currentUser = useContext(AuthContext);
  return (
    <div className="d-flex align-items-center">
      <p className="me-3 h4 text-light">{currentUser?.displayName}</p>
      <Button
        onClick={() => signOut(auth)}
        variant="light"
        className="text-decoration-none d-flex align-items-center fs-6 text fw-bold text-muted"
      >
        logout{" "}
      </Button>
    </div>
  );
};
