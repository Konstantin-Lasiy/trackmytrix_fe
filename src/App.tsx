import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dash from "./pages/Dash";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import User from "./pages/User";
import Layout from "./pages/Layout";
import AuthMiddleware from "./middleware/Auth";
import PersistLogin from "./components/auth/PersistLogin";
import { AuthContextProvider } from "./store/auth-context";
import CreateRun from "./pages/CreateRunPage";
import TestPage from './pages/TestPage';
// Define your routes
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PersistLogin />, // Wrap all routes with PersistLogin to maintain session
        children: [
          { path: "/", element: <Home />, index: true },
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
          { path: "/test", element: <TestPage /> },
          {
            element: <AuthMiddleware />, // Additional security layer for specific routes
            children: [
              { path: "/dashboard", element: <Dash /> },
              { path: "/user", element: <User /> },
              { path: "/createrun", element: <CreateRun /> },
            ],
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
};

export default App;
