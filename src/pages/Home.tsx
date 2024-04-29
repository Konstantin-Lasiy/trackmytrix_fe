import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file
import SignIn from "../components/auth/LoginForm";
import useAuth from "../hooks/useAuth";

const BACKEND_URL = import.meta.env.VITE_API_BACKEND;
const HomePage = () => {
  const { accessToken } = useAuth();
  return (
    <div id="home">
      <li> {BACKEND_URL} </li>
      <li> Click on Create Run </li>
      <li> Toggle options for a trick </li>
      <li> Click on Trick name to add it to the timeline </li>
      {accessToken ? (
        <Button component={Link} to="/createrun">
          Create Run
        </Button>
      ) : (
        <SignIn></SignIn>
      )}{" "}
    </div>
  );
};

export default HomePage;
