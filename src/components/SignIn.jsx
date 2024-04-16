import React from "react";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./Footer";
import axios from "axios";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
    mb: 3,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#333",
  },
});

const SignIn = ({
  apiUrl,
  tokenName,
  redirectToPage,
  failureMessage,
  userAction,
  link,
  linkMessage,
  footerLink,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(apiUrl, {
        email: data.email,
        password: data.password,
      });
      if (response.status === 200) {
        const newToken = response.data?.token || response.data?.admin_token;
        localStorage.setItem(tokenName, newToken);
        window.location.href = redirectToPage; // Redirect to respective page
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.status === 401
      ) {
        const errorMessage = error.response?.data.message;
        if (errorMessage === failureMessage) {
          setError("email", {
            type: "manual",
            message: failureMessage,
          });
        } else if (errorMessage === "* Invalid credentials") {
          setError("password", {
            type: "manual",
            message: "* Invalid credentials",
          });
        }
      } else {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: { xs: "none", sm: "block" },
            backgroundImage: "url(/login-bg.webp)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              sx={{
                mb: 3,
                fontWeight: "bold",
                background:
                  "radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,209,67,1) 0%, rgba(255,145,83,1) 90% )",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                "@media (max-width: 340px)": {
                  fontSize: "2.5rem",
                },
              }}
            >
              Note Keep
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h2" variant="h6">
              {userAction}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", { required: true })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
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
                {...register("password", { required: true })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href={link} variant="body2">
                    {linkMessage}
                  </Link>
                </Grid>
              </Grid>
              <Footer footerLink={footerLink} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
