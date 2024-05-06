import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import useAuth from "../hooks/useAuth";
import { Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Logout, AccountBox } from "@mui/icons-material";
import useLogout from "../hooks/useLogout";

export default function MenuAppBar() {
  const { user } = useAuth();
  const logout = useLogout();
  // const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const [accountAnchorEl, setAccountAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [mainAnchorEl, setMainAnchorEl] = React.useState<null | HTMLElement>(
    null
  );

  const handleMainMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMainAnchorEl(event.currentTarget);
  };

  const handleAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleMainClose = () => {
    setMainAnchorEl(null);
  };

  const handleClose = () => {
    setAccountAnchorEl(null);
  };

  const goToProfile = () => {
    setAccountAnchorEl(null);
    navigate("/profile");
  };
  const handleLogout = async () => {
    // setLoading(true);
    await logout();
    //setLoading(false);
    navigate("/");
  };

  const loggedIn = user ? true : false;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleMainMenu}
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="main-menu-appbar"
            anchorEl={mainAnchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(mainAnchorEl)}
            onClose={handleMainClose}
          >
            <MenuItem onClick={handleClose}>
              <NavLink to="/runs/">Runs</NavLink>
            </MenuItem>
          </Menu>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          >
            TrackMyTrix
          </Typography>

          {loggedIn && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleAccountMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="acccount-menu-appbar"
                anchorEl={accountAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(accountAnchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={goToProfile}
                  sx={{ justifyContent: "flex-start" }}
                >
                  <AccountBox sx={{ mr: 1 }} /> Profile
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{ justifyContent: "flex-start" }}
                >
                  <Logout sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
