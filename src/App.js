import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SignIn, SignUp, AdminSignIn, AdminPanel, Notes, Error } from "./pages";

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
