// import React from "react";
// import { Navigate } from "react-router-dom";

// const AdminProtectedRoute = ({ children }) => {
//   const adminToken = localStorage.getItem("adminToken");

//   console.log("Admin Token Check:", adminToken); // DEBUG

//   if (!adminToken) {
//     return <Navigate to="/admin-login" replace />;
//   }

//   return children;
// };

// export default AdminProtectedRoute;


import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log("Admin Token:", token);
  console.log("Admin Role:", role);

  // If missing token or role is not admin → redirect
  if (!token || role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
