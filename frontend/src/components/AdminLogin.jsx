
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", formData);
      // localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "admin");

      window.dispatchEvent(new Event("storage"));

      setMessage({ text: "Admin login successful!", type: "success" });

      // Redirect after short delay
      setTimeout(() => navigate("/admin-dashboard"), 1500);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setMessage({ text: "❌ Invalid credentials. Please try again.", type: "error" });
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-box">
          <h2>Admin Login</h2>

          {message.text && (
            <div
              className={`message-box ${
                message.type === "success" ? "message-success" : "message-error"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-form">
            <input
              type="email"
              name="email"
              placeholder="Enter admin email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Login</button>
          </form>

         
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
