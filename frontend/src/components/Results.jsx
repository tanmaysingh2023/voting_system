import React, { useState, useEffect } from 'react';

const Results = () => {
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

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl mb-4">Results</h2>
      <ul className="space-y-2">
        {candidates.map((candidate) => (
          <li key={candidate._id} className="flex justify-between items-center">
            <span>{candidate.name} - {candidate.votes} votes</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;