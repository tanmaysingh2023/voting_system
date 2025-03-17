import React, { useState, useEffect } from 'react';

const CandidatesList = ({ token }) => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/voting/candidates');
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async (candidateId) => {
    try {
      const response = await fetch('http://localhost:5000/api/voting/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ candidateId }),
      });
      if (response.ok) {
        alert('Vote cast successfully');
      } else {
        console.error('Error casting vote:', response.statusText);
      }
    } catch (error) {
      console.error('Error casting vote:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl mb-4">Candidates</h2>
      <ul className="space-y-2">
        {candidates.map((candidate) => (
          <li key={candidate._id} className="flex justify-between items-center">
            <span>{candidate.name} - {candidate.votes} votes</span>
            <button
              onClick={() => handleVote(candidate._id)}
              className="bg-blue-600 text-white p-2 rounded"
            >
              Vote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidatesList;