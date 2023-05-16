import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./components/Shop/Shop";
import Home from "./components/Layout/Home";
import Orders from "./components/Orders/Orders";
import Inventory from "./components/Inventory/Inventory";
import Login from "./components/Login/Login";
import cardProductsLoader from "./CustomLoaders/cardProductsLoader";
import Checkout from "./components/CheckOut/Checkout";
import SignUp from "./components/Signup/Signup";
import AuthProvider from "./components/providers/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Shop></Shop>,
        loader: () => fetch("http://localhost:5000/totalProducts"),
      },
      {
        path: "orders",
        element: <Orders></Orders>,
        // loader: () => fetch("http://localhost:5000/products"),
        loader: cardProductsLoader,
      },
      {
        path: "inventory",
        element: (
          <PrivateRoute>
            <Inventory></Inventory>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            {" "}
            <Checkout></Checkout>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
