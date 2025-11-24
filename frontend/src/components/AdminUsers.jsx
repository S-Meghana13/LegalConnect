import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.log("Error loading users:", err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      alert("User deleted successfully!");
      fetchUsers(); // reload list
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Registered Users</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((u) => (
          <div
            key={u._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          >
            <h3>{u.fullName}</h3>
            <p>Email: {u.email}</p>
            <p>Username: {u.username}</p>

            <button
              style={{
                background: "red",
                padding: "8px 12px",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={() => deleteUser(u._id)}
            >
              Delete User
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminUsers;
