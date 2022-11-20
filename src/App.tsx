import { AuthPage } from "pages/AuthPage";
import { Chat } from "pages/components/Chat";
import { Complited } from "pages/components/Complited";
import { Message } from "pages/components/Message";
import { Home } from "pages/Home";
import NotFounPage from "pages/NotFounPage";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router";
// import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useGlobalContext } from "./context/AuthContext";
function App() {
  //@ts-ignore
  const { currentUser } = useGlobalContext();
  const navigate = useNavigate();
  console.log(currentUser);

  useEffect(() => {
    // !currentUser ? navigate("/auth") : navigate("/");
  }, [currentUser, navigate]);

  const ProtectedRoute = ({ children }: any) => {
    if (!currentUser) {
      return <Navigate to="/auth" replace />;
    }

    return children;
  };
  return (
    <Container className=" container-xxl pt-5">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route index element={<Chat />} />
          <Route path="complited" element={<Complited />} />
          <Route path="new-message" element={<Message />} />
          <Route path="tasks" element={<Chat />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFounPage />} />
      </Routes>
    </Container>
  );
}

export default App;
