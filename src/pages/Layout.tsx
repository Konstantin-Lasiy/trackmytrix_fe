// In Layout.js
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <CssBaseline></CssBaseline>
      <Outlet />
    </>
  );
};

export default Layout;
