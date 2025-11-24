// import LawyerCard from './LawyerCard';
// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import '../../css/MainPage.css';

// const MainPage = () => {

//   const [lawyers, setLawyers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLawyers = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/all-lawyers");
//         setLawyers(response.data); // Set the lawyers data in the state
//         setLoading(false); // Stop loading

//       } catch (err) {
//         setError("Failed to fetch lawyers");
//         setLoading(false); // Stop loading even if there is an error
//       }
//     };

//     fetchLawyers();
//   }, []);

//   if (loading) return <p>Loading lawyers...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="main-container">
//       <h1 className="title">Available Lawyers</h1>
//       <div className="lawyer-grid">
//         {lawyers.map((lawyer, index) => (
//           <LawyerCard key={index} lawyer={lawyer} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MainPage;



import LawyerCard from './LawyerCard';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../../css/MainPage.css';

const MainPage = () => {

  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLawyers = async () => {
      console.log("Fetching lawyers...");  // DEBUG 1

      try {
        const response = await axios.get("http://localhost:5000/api/all-lawyers");

        console.log("API Response:", response.data);  // DEBUG 2

        // Only approved lawyers
        const approvedLawyers = response.data.filter(
          lawyer => lawyer.status === "approved"
        );

        console.log("Approved Lawyers:", approvedLawyers); // DEBUG 3

        setLawyers(approvedLawyers);
        setLoading(false);

      } catch (err) {
        console.error("Error fetching lawyers:", err);  // DEBUG 4
        setError("Failed to fetch lawyers");
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  console.log("Final lawyers state:", lawyers); // DEBUG 5

  if (loading) return <p>Loading lawyers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="main-container">
      <h1 className="title">Available Lawyers</h1>

      <div className="lawyer-grid">
        {lawyers.map((lawyer) => (
          <LawyerCard key={lawyer._id} lawyer={lawyer} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;

