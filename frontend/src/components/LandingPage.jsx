import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl mb-8">Welcome to the Voting System</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate('/user')}
          className="bg-blue-600 text-white p-4 rounded"
        >
          User
        </button>
        <button
          onClick={() => navigate('/admin')}
          className="bg-green-600 text-white p-4 rounded"
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default LandingPage;