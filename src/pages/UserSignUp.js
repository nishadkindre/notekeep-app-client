import React, { useState } from "react";
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
import Footer from "../components/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import axios from "axios";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 900,
    letterSpacing: 1,
    color: "#333",
  },
});

function UserSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [apiError, setApiError] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const onSubmit = async (data) => {
    const { firstName, lastName, email, password } = data;
    const name = `${firstName} ${lastName}`;

    try {
      const response = await axios.post(`${apiUrl}/api/auth/register`, {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      window.location.href = "/notes";
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "* Email already exists") {
          setError("email", { type: "manual", message: errorMessage });
        } else {
          setApiError(errorMessage);
        }
      } else {
        setApiError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
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
            }}
          >
            Note Keep
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {apiError && <Typography color="error">{apiError}</Typography>}
          <SignUpFormFields
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
          />
        </Box>
      </Container>
      <Footer footerLink="/signup" />
    </ThemeProvider>
  );
}

function SignUpFormFields({ handleSubmit, register, errors }) {
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            {...register("firstName", {
              required: "First name is required",
              pattern: {
                value: /^[^\s]*$/,
                message: "First name cannot contain spaces",
              },
            })}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName ? errors.firstName.message : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            {...register("lastName", {
              required: "Last name is required",
              pattern: {
                value: /^[^\s]*$/,
                message: "Last name cannot contain spaces",
              },
            })}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName ? errors.lastName.message : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter valid email address",
              },
            })}
            error={Boolean(errors.email)}
            helperText={errors.email ? errors.email.message : ""}
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
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: `Password must:
                  - Be at least 8 characters long
                  - Contain at least one uppercase letter
                  - Contain at least one lowercase letter
                  - Contain at least one number
                  - Contain at least one special character
                  - Not contain any spaces`,
              },
            })}
            error={Boolean(errors.password)}
            helperText={errors.password ? errors.password.message : ""}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserSignUp;
