import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        window.location.href = "/Home"
      }

      return null

    },
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
