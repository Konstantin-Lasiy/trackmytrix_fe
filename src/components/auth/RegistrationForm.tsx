import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import { Link, Alert } from "@mui/material";
import { AxiosError } from "axios";

interface Errors {
  [key: string]: string;
}

interface RegistrationResponse {
  key: string;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRegistrationSuccess = (responseData: RegistrationResponse) => {
    console.log(responseData);
    navigate('/login', { state: { registered: true } });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    const request = JSON.stringify({
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      password2: data.get("password2"),
    });
    try {
      const response = await axiosInstance.post("auth/register", request);
      handleRegistrationSuccess(response.data);
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

  return (
    <>
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  error={!!errors.password2}
                  helperText={errors.password2}
                />
              </Grid>
            </Grid>
            {Object.keys(errors).length > 0 && (
              <Box sx={{ width: "100%", mt: 2 }}>
                {Object.entries(errors)
                  .filter(
                    ([key]) =>
                      !["username", "email", "password", "password2"].includes(
                        key
                      )
                  )
                  .map(([key, value]) => (
                    <Alert severity="error" key={key}>
                      {key} : {value}
                    </Alert>
                  ))}
              </Box>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RegistrationForm;
