import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { axiosInstance } from "../../axios";
import useAuth from "../../hooks/useAuth";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
import { useLocation } from "react-router-dom";
import { AxiosError } from "axios";

interface Errors {
  [key: string]: string;
}

export default function SignIn() {
  const { setAccessToken, setCSRFToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const location = useLocation();
  const { registered = false } = location?.state || {};
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    try {
      const response = await axiosInstance.post(
        "auth/login",
        JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
        })
      );
      setAccessToken(response?.data?.access);
      setCSRFToken(response?.headers?.["x-csrftoken"]);
      setLoading(false);
      // navigate(fromLocation, { replace: true });
      navigate("/");
    } catch (error: unknown) {
      console.error("Registration failed", error);
      if (error instanceof AxiosError) {
        const errMessages: Errors = error.response?.data || {
          generic: "Registration failed, please try again.",
        };
        setErrors(errMessages);
      } else {
        setErrors({ generic: "Registration failed, please try again." });
      }
    } finally {
      setLoading(false);
    }
  };
  console.log(errors.detail);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {registered && (
          <Alert sx={{ mt: 2 }} elevation={4} severity="success">
            Registered! Please log in.
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!!errors.email|| !!errors.detail}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password || !!errors.detail}
            helperText={errors.password}
          />
          {errors.detail && <Alert severity="error">{errors.detail}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            //disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
