import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file
import SignIn from "../components/auth/LoginForm";
import useAuth from "../hooks/useAuth";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";

const HomePage = () => {
  const { accessToken } = useAuth();
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        "&:before": {
          content: '""',
          background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: "0.3",
        },
      }}
    >
      <Grid
        container
        spacing={0}
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%", flex: 1 }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: "95%", maxWidth: "500px" }}
          >
            {accessToken ? (
              <Button
                variant="contained"
                sx={{
                  display: "block",
                  mx: "auto",
                  textAlign: "center",
                }}
                component={Link}
                to="/createrun"
                //elevation= {9}
              >
                Log Run
              </Button>
            ) : (
              <SignIn></SignIn>
            )}{" "}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
