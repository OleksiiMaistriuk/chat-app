import { LoginPage } from "pages/LoginPage/LoginPage";
import { RegisterPage } from "pages/RegisterPage/RegisterPage";
import { Container } from "react-bootstrap";

export const MainContainer = () => {
  return (
    <Container className="w-75">
      <RegisterPage />
      <LoginPage />
    </Container>
  );
};
