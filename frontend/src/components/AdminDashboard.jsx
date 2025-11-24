// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function AdminDashboard() {
//   const [lawyers, setLawyers] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/admin/lawyers")
//       .then(res => setLawyers(res.data))
//       .catch(err => console.log(err));
//   }, []);
  

//   const approveLawyer = (id) => {
//     axios.put(`http://localhost:5000/api/admin/approve/${id}`)
//       .then(() => alert("Lawyer Approved"))
//       .then(() => window.location.reload());
//   };

//   const rejectLawyer = (id) => {
//     axios.put(`http://localhost:5000/api/admin/reject/${id}`)
//       .then(() => alert("Lawyer Rejected"))
//       .then(() => window.location.reload());
//   };

//   return (
//     <div>
//       <h2>Admin – Lawyer Verification Panel</h2>
//       <button onClick={() => {
//   localStorage.removeItem("adminToken");
//   window.location.href = "/admin-login";
// }}>
//   Logout
// </button>

      
//       {lawyers.map(lawyer => (
//         <div key={lawyer._id} style={{border:"1px solid gray", padding:"10px", marginBottom:"10px"}}>
//           <h3>{lawyer.fullName}</h3>
//           <p>Email: {lawyer.email}</p>
//           <p>Specialization: {lawyer.specialization}</p>
//           <p>Status: <b>{lawyer.status}</b></p>

//           {lawyer.status === "pending" && (
//             <>
//               <button onClick={() => approveLawyer(lawyer._id)}>Approve</button>
//               <button onClick={() => rejectLawyer(lawyer._id)}>Reject</button>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AdminDashboard;



// import React, { useEffect, useState } from "react";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     users: 0,
//     lawyers: 0,
//     requests: 0
//   });

//   useEffect(() => {
//   const fetchStats = async () => {
//     try {
//       const u = await fetch("/api/admin/users-count").then(res => res.json());
//       const l = await fetch("/api/admin/lawyers-count").then(res => res.json());
//     //   const r = await fetch("/api/admin/requests-count").then(res => res.json());

//       setStats({
//         users: u.count,
//         lawyers: l.count,
//         // requests: r.count
//       });
//     } catch (err) {
//       console.log("Error loading stats:", err);
//     }
//   };

//   fetchStats();
// }, []);


//   return (
//     <div>
      

//       <div style={styles.container}>
//         <h1 style={styles.welcome}>👋 Welcome, Admin!</h1>

//         <div style={styles.cardContainer}>
//           <div style={styles.card}>
//             <h2>{stats.users}</h2>
//             <p>Total Users</p>
//           </div>

//           <div style={styles.card}>
//             <h2>{stats.lawyers}</h2>
//             <p>Total Lawyers</p>
//           </div>

//           {/* <div style={styles.card}>
//             <h2>{stats.requests}</h2>
//             <p>Total Requests</p>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// const styles = {
//   container: {
//     padding: "30px",
//   },
//   welcome: {
//     fontSize: "32px",
//     fontWeight: "bold",
//     marginBottom: "20px",
//   },
//   cardContainer: {
//     display: "flex",
//     gap: "20px",
//   },
//   card: {
//     width: "230px",
//     height: "120px",
//     backgroundColor: "#1e3a8a",
//     color: "white",
//     borderRadius: "12px",
//     padding: "20px",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: "20px",
//   },
// };

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    lawyers: 0,
    approvedLawyers: 0,
    pendingConsultations: 0,
    specializationData: [],
    monthlyUsers: []
  });

  useEffect(() => {
    const loadStats = async () => {
      const users = await fetch("/api/admin/users-count").then(r => r.json());
      const lawyers = await fetch("/api/admin/lawyers-count").then(r => r.json());
      const approved = await fetch("/api/admin/approved-lawyers-count").then(r => r.json());
      const pending = await fetch("/api/admin/pending-consultations").then(r => r.json());
      const specialization = await fetch("/api/admin/specialization-stats").then(r => r.json());
      const monthlyUsers = await fetch("/api/admin/monthly-users").then(r => r.json());

      setStats({
        users: users.count,
        lawyers: lawyers.count,
        approvedLawyers: approved.count,
        pendingConsultations: pending.count,
        specializationData: specialization,
        monthlyUsers
      });
    };

    loadStats();
  }, []);
  const navigate = useNavigate();

  const COLORS = ["#1e3a8a", "#3b82f6", "#60a5fa", "#93c5fd"];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📊 Admin Dashboard</h1>

      {/* CARDS */}
      <div style={styles.cardRow}>
        {/* <div style={styles.card}><h2>{stats.users}</h2><p>Total Users</p></div> */}
          <div style={styles.card} onClick={() => navigate("/admin-users")}>
           <h2>{stats.users}</h2>
          <p>Total Users</p>
          </div>
        <div style={styles.card} onClick={() => navigate("/admin-lawyers")}><h2>{stats.lawyers}</h2><p>Total Lawyers</p></div>
        <div style={styles.card}  onClick={() => navigate("/admin-lawyers")}><h2>{stats.approvedLawyers}</h2><p>Approved Lawyers</p></div>
        <div style={styles.card}><h2>{stats.pendingConsultations}</h2><p>Pending Consultations</p></div>
      </div>

      {/* ROW: PIE & BAR */}
      <div style={styles.chartRow}>
        <div style={styles.chartBox}>
          <h3>Most Demanded Specializations</h3>
          <PieChart width={300} height={300}>
            <Pie data={stats.specializationData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
              {stats.specializationData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip /><Legend />
          </PieChart>
        </div>

        {/* BAR */}
        <div style={styles.chartBox}>
          <h3>Monthly New Users</h3>
          <BarChart width={400} height={300} data={stats.monthlyUsers}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" /><YAxis /><Tooltip />
            <Bar dataKey="count" fill="#1e3a8a" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

// ---------- Styles ----------
const styles = {
  container: { padding: "30px" },
  heading: { fontSize: "30px", fontWeight: "bold", marginBottom: "20px" },
  cardRow: { display: "flex", gap: "20px", marginBottom: "30px" },
  card: {
    width: "230px",
    height: "120px",
    backgroundColor: "#1e3a8a",
    color: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  chartRow: { display: "flex", gap: "30px", marginBottom: "40px" },
  chartBox: {
    background: "#f1f5f9",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  }
};
