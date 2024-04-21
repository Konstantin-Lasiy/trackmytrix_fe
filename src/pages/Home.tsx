import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file

const HomePage = () => {
  return (
    <div id="home">
      <li> Click on Create Run </li>
      <li> Toggle options for a trick </li>
      <li> Click on Trick name to add it to the timeline </li>
      <Link to="/createrun">
        <Button variant="contained">Create Run</Button>
      </Link>
    </div>
  );
};

export default HomePage;
