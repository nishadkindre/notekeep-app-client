import React from "react";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import ExportToPDFButton from "./ExportToPdf";
import styles from "../styles/Header.module.css";

const Header = ({ isDark, setIsDark, userName, notes }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to notes page
  };
  return (
    <header>
      <h1>
        <SpeakerNotesIcon />
        Note Keep
      </h1>
      <div className={styles["header-icons"]}>
        <div
          className={styles["mode-icon"]}
          onClick={() => setIsDark(!isDark)}
          title="mode"
        >
          {isDark ? (
            <DarkModeIcon fontSize="medium" style={{ color: "black" }} />
          ) : (
            <LightModeIcon fontSize="medium" style={{ color: "white" }} />
          )}
        </div>
        <ExportToPDFButton
          notes={notes}
          userName={userName}
          styleClass={styles["logout-icon"]}
        />
        <div className={styles["user-icon"]} title={userName}>
          {userName[0]}
        </div>
        <div
          className={styles["logout-icon"]}
          onClick={handleLogout}
          title="logout"
        >
          <LogoutIcon fontSize="medium" style={{ color: "blue" }} />
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
