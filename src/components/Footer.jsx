import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Footer({ footerLink }) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      paddingTop="30px"
    >
      {"Copyright © "}
      <Link color="inherit" href={footerLink}>
        Note Keep
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
