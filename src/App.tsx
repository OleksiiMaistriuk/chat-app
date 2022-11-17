// import { AuthContainer } from "pages/AuthContainer";
import { AuthPage } from "pages/AuthPage";
import { Chat } from "pages/components/Chat";
import { Complited } from "pages/components/Complited";
import { Message } from "pages/components/Message";
import { Home } from "pages/Home";
import NotFounPage from "pages/NotFounPage";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router";
// import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

function App() {
  return (
    <Container className=" container-xxl pt-5">
      <Routes>
        {" "}
        <Route path="/" element={<Home />}>
          {/* <Route index element={<Home />} /> */}
          <Route index element={<Chat />} />
          <Route path="complited" element={<Complited />} />
          <Route path="new-message" element={<Message />} />
          <Route path="tasks" element={<Chat />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFounPage />} />
      </Routes>
      {/* <AuthContainer></AuthContainer> */}
    </Container>
  );
}

export default App;
