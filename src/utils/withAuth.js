import React from "react";
import Error from "../pages/Error";

const withAuth = (Component) => {
  return function AuthComponent() {
    const token = localStorage.getItem("token");
    return token ? <Component /> : <Error />;
  };
};

export default withAuth;
