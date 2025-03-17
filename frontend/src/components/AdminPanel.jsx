import React, { useState, useEffect } from 'react';

const AdminPanel = ({ token }) => {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

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

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/voting/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (response.ok) {
        setCandidates([...candidates, data]);
        setName('');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  const handleEditCandidate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/voting/candidates/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (response.ok) {
        setCandidates(candidates.map(candidate => candidate._id === editId ? data : candidate));
        setName('');
        setEditId(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error editing candidate:', error);
    }
  };

  const handleDeleteCandidate = async (candidateId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/voting/candidates/${candidateId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setCandidates(candidates.filter(candidate => candidate._id !== candidateId));
      } else {
        console.error('Error deleting candidate:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl mb-4">Admin Panel</h2>
      <form onSubmit={editId ? handleEditCandidate : handleAddCandidate} className="mb-4">
        <input
          type="text"
          placeholder="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          {editId ? 'Edit Candidate' : 'Add Candidate'}
        </button>
      </form>
      <ul className="space-y-2">
        {candidates.map((candidate) => (
          <li key={candidate._id} className="flex justify-between items-center">
            <span>{candidate.name} - {candidate.votes} votes</span>
            <div>
              <button
                onClick={() => { setName(candidate.name); setEditId(candidate._id); }}
                className="bg-yellow-500 text-white p-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCandidate(candidate._id)}
                className="bg-red-600 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;