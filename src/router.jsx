import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import App from "./pages/App";
import Error from "./pages/Error";
import AdminSignIn from "./pages/AdminSignIn";
import AdminPanel from "./pages/AdminPanel";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" element={<AdminSignIn />} />
      <Route path="/admin/panel" element={<AdminPanel />} />
      <Route path="/notes" element={<App />} />
      <Route path="/*" element={<Error />} />
    </>
  )
);
