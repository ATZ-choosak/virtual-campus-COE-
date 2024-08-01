import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/ReactToastify.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      loader: () => {
        if (localStorage.getItem("access_token")) {
          window.location.href = "/Home";
        }

        return null;
      },
    },
    {
      path: "/home",
      element: <Home />,
    },
  ],
  { basename: "/admin" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  </React.StrictMode>
);
