import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Notes from "./pages/Notes";
import Error from "./pages/Error";
import AdminSignIn from "./pages/AdminSignIn";
import AdminPanel from "./pages/AdminPanel";

const RouterWithStore = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" element={<AdminSignIn />} />
      <Route path="/admin/panel" element={<AdminPanel />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  </Router>
);

export default RouterWithStore;
