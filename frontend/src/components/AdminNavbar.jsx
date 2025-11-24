import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.dispatchEvent(new Event("storage"));
  navigate("/");
};

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>LegalConnect Admin</div>

      <div style={styles.menu}>
        <button style={styles.link} onClick={() => navigate("/admin-dashboard")}>
          Dashboard
        </button>

        <button style={styles.link} onClick={() => navigate("/admin-lawyers")}>
          Lawyers List
        </button>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;

const styles = {
  navbar: {
    width: "100%",
    height: "60px",
    backgroundColor: "#282c34",
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    justifyContent: "space-between",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    
     color:"#61dafb",
    fontSize: "1.5rem",
  },
  menu: {
    display: "flex",
    gap: "15px",
  },
  link: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  logoutBtn: {
    padding: "8px 15px",
    backgroundColor: "#dc2626",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
  },
};
