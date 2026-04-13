import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Bookshelf from "./pages/Bookshelf.jsx";
import Book from "./pages/Book.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Create from "./pages/Create.jsx";
import Edit from "./pages/Edit.jsx";
import Login from "./pages/Login.jsx";
import Singup from "./pages/Singup.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import { bookshelfLoader } from "./components/bookshelf/bookshelfLoader.js";
import Loader from "./components/Loader/Loader.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import ProtectedRoute from "./components/Protection/ProtectedRoute.jsx";
import bookLoader from "./components/bookshelf/BookLoader.jsx";
import SingleBookLoader from "./components/Loader/SingleBookLoader.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "bookshelf",
        element: <Bookshelf />,
        loader: bookshelfLoader,
        HydrateFallback: () => <Loader />,
      },
      {
        path: "bookshelf/:id",
        element: <Book />,
        loader: bookLoader,
        HydrateFallback: () => <SingleBookLoader />,
      },
      {
        path: "create",
        element: (
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        ),
      },
      {
        path: "bookshelf/:id/edit",
        element: <Edit />,
        loader: bookLoader,
        HydrateFallback: () => <SingleBookLoader />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Singup />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
