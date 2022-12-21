import "bootstrap/dist/css/bootstrap.min.css";
import { UserDocsContextProvider } from "context/UserDocsContext.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./App.scss";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <UserContextProvider>
      <UserDocsContextProvider>
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      </UserDocsContextProvider>
    </UserContextProvider>
  </AuthContextProvider>
);
