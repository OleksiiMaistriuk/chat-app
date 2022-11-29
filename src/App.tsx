import { Complited } from "pages/components/Complited";
import { Message } from "pages/components/Message";
import { Tasks } from "pages/components/Tasks";
import { Home } from "pages/Home";
import NotFounPage from "pages/NotFounPage";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router";
// import { Navigate } from "react-router-dom";
import { Register } from "pages/Register";

import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { Login } from "./pages/Login";
function App() {
  //@ts-ignore
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // !currentUser ? navigate("/auth") : navigate("/");
  }, [currentUser, navigate]);

  const ProtectedRoute = ({ children }: any) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };
  return (
    <Container className=" container-xxl pt-5">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route index element={<Tasks />} />
          <Route path="complited" element={<Complited />} />
          <Route path="new-message" element={<Message />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
        {/* <Route path="/auth" element={<AuthPage />}> */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {/* </Route> */}
        <Route path="*" element={<NotFounPage />} />
      </Routes>
    </Container>
  );
}

export default App;
