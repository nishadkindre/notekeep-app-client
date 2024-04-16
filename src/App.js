import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  UserSignIn,
  UserSignUp,
  UserNotes,
  AdminSignIn,
  AdminPanel,
  Error,
} from "./pages";

const RouterWithStore = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UserSignIn />} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path="/admin" element={<AdminSignIn />} />
      <Route path="/admin/panel" element={<AdminPanel />} />
      <Route path="/notes" element={<UserNotes />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  </Router>
);

export default RouterWithStore;
