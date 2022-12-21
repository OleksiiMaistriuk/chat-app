import { useAuthContext } from "context/AuthContext";
import { signOut } from "firebase/auth";
import firebaseService from "firebaseService";
import { Button } from "react-bootstrap";

export const NavBar = () => {
  const currentUser = useAuthContext();

  return (
    <div className="d-flex align-items-center">
      <p className="me-3 h4 text-light">{currentUser?.displayName}</p>
      <Button
        onClick={() => signOut(firebaseService.auth)}
        variant="light"
        className="text-decoration-none d-flex align-items-center fs-6 text fw-bold text-muted"
      >
        Wyloguj
      </Button>
    </div>
  );
};
