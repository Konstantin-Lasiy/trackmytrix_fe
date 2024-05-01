// In Layout.js
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import "./Layout.css";
//import CssBaseline from "@mui/material/CssBaseline";
const Layout = () => {
  return (
    <>
      <header className="navbar">
        <Navbar />
      </header>

      <div className="main-container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
