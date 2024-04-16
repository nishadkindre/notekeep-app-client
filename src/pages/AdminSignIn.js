import React from "react";
import SignIn from "../components/SignIn";

const AdminSignIn = () => {
  const apiUrl = process.env.REACT_APP_API_URL; // Accessing REACT_APP_API_URL from .env

  return (
    <SignIn
      apiUrl={`${apiUrl}/api/admin/login`}
      tokenName="admin_token"
      redirectToPage="/admin/panel"
      userAction="Admin"
      link="/"
      linkMessage="Sign in as User"
      footerLink="/admin"
      failureMessage="* Invalid Admin"
    />
  );
};

export default AdminSignIn;
