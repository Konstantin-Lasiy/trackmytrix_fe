import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css"; // Import the CSS file
import SignIn from "../components/auth/LoginForm";
import useUser from "../hooks/useUser";

const HomePage = () => {
  const getUser = useUser();
  const [loginState, setLoginState] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUser(); // Call your async function
        setLoginState(true); // Set login state to true upon successful fetch
      } catch (error) {
        setLoginState(false); // Handle errors or unsuccessful fetch scenarios
        console.error("Failed to fetch user:", error);
      }
    };
    console.log("fetching..");
    fetchUser();
  }, [getUser]);

  if (loginState === undefined) {
    return <div></div>;
  }

  if (loginState == false) {
    return <SignIn />;
  }
  return (
    <div id="home">
      <li> Click on Create Run </li>
      <li> Toggle options for a trick </li>
      <li> Click on Trick name to add it to the timeline </li>
      {loginState ? (
        <Button component={Link} to="/createrun">
          Create Run
        </Button>
      ) : <SignIn></SignIn>}{" "}
    </div>
  );
};

export default HomePage;
