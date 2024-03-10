import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../utils/adminApi";
import styles from "../styles/Admin.module.css";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await getUsers(setUsers);
    }
    fetchData();
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("admin_token");
    window.location.href = "/admin"; // Redirect to notes page
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId, setUsers);
    toast.success("Deleted User Successfully", {
      autoClose: 1000,
    });
  };

  return (
    <div>
      <header>
        <h2>
          <SpeakerNotesIcon />
          {`Note Keep Admin`}
        </h2>
        <div
          className={styles["logout-icon"]}
          onClick={handleLogout}
          title="logout"
        >
          <LogoutIcon fontSize="medium" style={{ color: "blue" }} />
        </div>
      </header>
      <ToastContainer />
      <div className={styles["table-wrapper"]}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td style={{ textAlign: "center" }}>
                  <DeleteIcon
                    className={styles["delete-btn"]}
                    onClick={() => handleDeleteUser(user._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
