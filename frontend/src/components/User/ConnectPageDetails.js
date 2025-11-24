import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios  from 'axios';

const ConnectPageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState(null);

  useEffect(() => {

    const fetchLawyerDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/lawyer/${id}`);
        setLawyer(res.data);
      } catch (err) {
        console.error("Failed to fetch lawyer details:", err);
      }
    };

    fetchLawyerDetails();

  }, [id]);

  const handleBack = () => {
    navigate('/main');
  };

  if (!lawyer) return <div className="p-8 text-xl italic text-center">Loading...</div>;

  const sampleCases = [
    //"State vs John Doe - Criminal Defense - 2023",
    //"Jane vs Company XYZ - Corporate Dispute - 2022"
  ];

  const sampleDocuments = [
    //{ //name: "Case Summary.pdf", url: "/docs/sample-case-summary.pdf" },
    //{ //name: "Client Review.pdf", url: "/docs/sample-review.pdf" }
  ];

  return (
    <div
      className="min-h-screen p-6 sm:p-10"
      style={{
        background: 'linear-gradient(to bottom right, #BDDDE4, #FFF1D5)',
        fontStyle: 'italic',
      }}
    >
      <div className="flex justify-center mb-6">
        <button
          onClick={handleBack}
          className="px-6 py-3 text-white font-semibold rounded shadow"
          style={{ backgroundColor: '#2563eb', fontStyle: 'normal' }}
        >
          Go Back
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        <div className="md:w-1/2 bg-white shadow-xl rounded-xl p-8">
          <div className="text-center">
            <img
              src={lawyer.image}
              alt={lawyer.fullName}
              className="mx-auto w-50 h-50 rounded-full object-cover shadow-lg mb-4"
            />
            <h2 className="text-3xl font-bold mb-2" style={{ fontStyle: 'normal' }}>{lawyer.fullName}</h2>
            <p className="text-xl text-gray-700 mb-1">{lawyer.qualification}</p>
            <p className="text-xl text-gray-700 mb-1">
              <strong style={{ fontStyle: 'normal' }}>Specialization:</strong> {lawyer.qualification}
            </p>
            <p className="text-xl text-gray-700 mb-1">
              <strong style={{ fontStyle: 'normal' }}>Cases:</strong> {lawyer.winningCases} | <strong style={{ fontStyle: 'normal' }}>Wins:</strong> {lawyer.winningCases}
            </p>
            <p className="text-xl text-gray-700 mb-1">
              <strong style={{ fontStyle: 'normal' }}>Fees:</strong> {lawyer.fees}
            </p>
            <p className="mt-4 text-lg text-gray-800">{lawyer.bio}</p>
          </div>
          
          
        </div>

       
      </div>
    </div>
  );
};

export default ConnectPageDetails;
