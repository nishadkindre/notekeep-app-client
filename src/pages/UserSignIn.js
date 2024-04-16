import React from "react";
import SignIn from "../components/SignIn";

const UserSignIn = () => {
  const apiUrl = process.env.REACT_APP_API_URL; // Accessing REACT_APP_API_URL from .env

  return (
    <SignIn
      apiUrl={`${apiUrl}/api/auth/login`}
      tokenName="token"
      redirectToPage="/notes"
      userAction="Sign In"
      link="/signup"
      linkMessage="Don't have an account? Sign Up"
      footerLink="/"
      failureMessage="* User not found"
    />
  );
};

export default UserSignIn;
