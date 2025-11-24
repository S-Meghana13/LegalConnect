// import React, { useEffect, useState } from "react";


// const AdminLawyers = () => {
//   const [lawyers, setLawyers] = useState([]);
//   const [tab, setTab] = useState("pending");

//   // Fetch all lawyers from backend
//   const fetchLawyers = async () => {
//     try {
//       const res = await fetch("/api/admin/lawyers");
//       const data = await res.json();
//       setLawyers(data);
//     } catch (error) {
//       console.log("Error fetching lawyers:", error);
//     }
//   };

//   useEffect(() => {
//     fetchLawyers();
//   }, []);

//   // Approve lawyer
//   const approveLawyer = async (id) => {
//     try {
//       await fetch(`/api/admin/approve/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//       });
//       fetchLawyers(); // Refresh list
//     } catch (error) {
//       console.log("Error approving:", error);
//     }
//   };

//   // Reject lawyer
//   const rejectLawyer = async (id) => {
//     try {
//       await fetch(`/api/admin/reject/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//       });
//       fetchLawyers(); // Refresh list
//     } catch (error) {
//       console.log("Error rejecting:", error);
//     }
//   };

//   // Filter based on tab
//   const filteredLawyers = lawyers.filter((l) => l.status === tab);

//   return (
//     <div>
    

//       <div style={styles.container}>
//         <h1>Lawyers List</h1>

//         {/* Tabs */}
//         <div style={styles.tabs}>
//           <button
//             style={tab === "pending" ? styles.activeTab : styles.tab}
//             onClick={() => setTab("pending")}
//           >
//             Pending
//           </button>

//           <button
//             style={tab === "approved" ? styles.activeTab : styles.tab}
//             onClick={() => setTab("approved")}
//           >
//             Approved
//           </button>

//           <button
//             style={tab === "rejected" ? styles.activeTab : styles.tab}
//             onClick={() => setTab("rejected")}
//           >
//             Rejected
//           </button>
//         </div>

//         {/* List */}
//         <div style={styles.list}>
//           {filteredLawyers.length === 0 ? (
//             <p>No {tab} lawyers found.</p>
//           ) : (
//             filteredLawyers.map((lawyer) => (
//               <div key={lawyer._id} style={styles.card}>
//                 <h3>{lawyer.name}</h3>
//                 <p>Email: {lawyer.email}</p>
//                 <p>Specialization: {lawyer.specialization}</p>
//                 <p>Fee: {lawyer.fee}</p>

//                 {tab === "pending" && (
//                   <div style={styles.actions}>
//                     <button
//                       style={styles.approve}
//                       onClick={() => approveLawyer(lawyer._id)}
//                     >
//                       Approve
//                     </button>

//                     <button
//                       style={styles.reject}
//                       onClick={() => rejectLawyer(lawyer._id)}
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLawyers;

// const styles = {
//   container: { padding: "20px" },
//   tabs: { display: "flex", gap: "10px", marginBottom: "20px" },
//   tab: {
//     padding: "10px 14px",
//     background: "white",
//     cursor: "pointer",
//     border: "1px solid #ddd",
//     borderRadius: "6px",
//   },
//   activeTab: {
//     padding: "10px 14px",
//     background: "#1e3a8a",
//     color: "white",
//     cursor: "pointer",
//     borderRadius: "6px",
//   },
//   list: { display: "flex", flexDirection: "column", gap: "15px" },
//   card: {
//     padding: "15px",
//     borderRadius: "10px",
//     background: "#173f8fff",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//   },
//   actions: { marginTop: "10px", display: "flex", gap: "10px" },
//   approve: {
//     padding: "8px 12px",
//     background: "green",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   reject: {
//     padding: "8px 12px",
//     background: "red",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// };


import React, { useEffect, useState } from "react";
import axios from "axios";


function AdminLawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [tab, setTab] = useState("pending"); // pending | approved | rejected

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/lawyers")
      .then((res) => setLawyers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const approveLawyer = (id) => {
    axios
      .put(`http://localhost:5000/api/admin/approve/${id}`)
      .then(() => alert("Lawyer Approved"))
      .then(() => window.location.reload());
  };

  const rejectLawyer = (id) => {
    axios
      .put(`http://localhost:5000/api/admin/reject/${id}`)
      .then(() => alert("Lawyer Rejected"))
      .then(() => window.location.reload());
  };

  // Filter based on tab
  const filteredLawyers = lawyers.filter((l) => l.status === tab);

  return (
    <div>
      

      <div style={styles.container}>
        <h2>Lawyers List</h2>

        {/* TAB BUTTONS */}
        <div style={styles.tabs}>
          <button
            onClick={() => setTab("pending")}
            style={tab === "pending" ? styles.activeTab : styles.tab}
          >
            Pending
          </button>

          <button
            onClick={() => setTab("approved")}
            style={tab === "approved" ? styles.activeTab : styles.tab}
          >
            Approved
          </button>

          <button
            onClick={() => setTab("rejected")}
            style={tab === "rejected" ? styles.activeTab : styles.tab}
          >
            Rejected
          </button>
        </div>

        {/* LIST OF LAWYERS */}
        {filteredLawyers.length === 0 ? (
          <p>No {tab} lawyers found.</p>
        ) : (
          filteredLawyers.map((lawyer) => (
            <div key={lawyer._id} style={styles.card}>
              <h3>{lawyer.fullName}</h3>
              <p>Email: {lawyer.email}</p>
              <p>Specialization: {lawyer.specialization}</p>
              <p>Status: <b>{lawyer.status}</b></p>

              {lawyer.status === "pending" && (
                <div style={{ marginTop: "10px" }}>
                  <button
                    style={styles.approve}
                    onClick={() => approveLawyer(lawyer._id)}
                  >
                    Approve
                  </button>

                  <button
                    style={styles.reject}
                    onClick={() => rejectLawyer(lawyer._id)}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminLawyers;


// STYLES
const styles = {
  container: {
    padding: "20px",
  },
  tabs: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 14px",
    background: "#fff",
    border: "1px solid #ccc",
    cursor: "pointer",
    borderRadius: "6px",
    color: "#1e3a8a", 
  },
  activeTab: {
    padding: "10px 14px",
    background: "#1e3a8a",
    color: "white",
    cursor: "pointer",
    borderRadius: "6px",
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px",
    background: "#f9fafb",
   
  },
  approve: {
    padding: "8px 12px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginRight: "10px",
    cursor: "pointer",
  },
  reject: {
    padding: "8px 12px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
