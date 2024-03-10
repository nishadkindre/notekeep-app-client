import React from "react";
import { Link as MuiLink, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Error = () => {
  localStorage.removeItem("token");
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      // spacing={2}
      style={{
        height: "100vh", // Ensure container covers the full height of the viewport
        background: `url("/bg-dark-webp.webp")`,
        overflow: "auto", // Hide any overflowing content
      }}
    >
      <Grid item>
        <Typography
          variant="h3"
          style={{
            fontFamily: "Montserrat",
            color: "white",
            marginBottom: "30px",
          }}
        >
          404 Error
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="h6"
          style={{
            fontFamily: "Montserrat",
            color: "white",
            marginBottom: "20px",
          }}
        >
          The page you requested could not be found...
        </Typography>
      </Grid>
      <Grid item>
        <Button
          component={MuiLink}
          href="/"
          variant="contained"
          color="primary"
          style={{ fontFamily: "Montserrat", marginBottom: "10px" }}
        >
          Log in
        </Button>
      </Grid>
      <Grid item>
        <Button
          component={MuiLink}
          href="/signup"
          variant="contained"
          color="primary"
          style={{ fontFamily: "Montserrat" }}
        >
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};

export default Error;
