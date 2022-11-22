import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "./../../context/AuthContext";

export const NavBar = () => {
  // @ts-ignore
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="d-flex align-items-center">
      <p className="me-3 h4 text-light">{currentUser.displayName}</p>
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
