import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

import { Message } from "pages/components/Message";
import TasksComponent from "pages/components/TasksComponent";
import NotFoundPage from "pages/NotFoundPage";
import { Register } from "pages/Register";
import { Tabs } from "pages/Tabs";
import { Container } from "react-bootstrap";
import CompletedComponent from "./pages/components/CompletedComponent";
import { Login } from "./pages/Login";

function App() {
  const currentUser = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {}, [currentUser, navigate]);

  const ProtectedRoute = ({ children }) => {
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
              <Tabs />
            </ProtectedRoute>
          }
        >
          <Route index element={<TasksComponent />} />
          <Route path="completed" element={<CompletedComponent />} />
          <Route path="new-message" element={<Message />} />
          <Route path="tasks" element={<TasksComponent />} />
        </Route>
        {/* <Route path="/auth" element={<AuthPage />}> */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {/* </Route> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Container>
  );
}

export default App;
