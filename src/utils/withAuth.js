import React from "react";
import Error from "../pages/Error";

const withAuth = (Component) => {
  const AuthComponent = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return <Component />;
    } else {
      return <Error />;
    }
  };

  return AuthComponent;
};

export default withAuth;
