import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import LandingPage from './components/LandingPage';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';
import CandidatesList from './components/CandidatesList';
import AdminPanel from './components/AdminPanel';
import Results from './components/Results';

function App() {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (token, isAdmin) => {
    setToken(token);
    setIsAdmin(isAdmin);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl">Voting System</h1>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/user" element={<UserPage onLogin={handleLogin} />} />
            <Route path="/admin" element={<AdminPage onLogin={handleLogin} />} />
            <Route path="/candidates" element={token && !isAdmin ? <CandidatesList token={token} /> : <Navigate to="/user" />} />
            <Route path="/results" element={token && !isAdmin ? <Results /> : <Navigate to="/user" />} />
            <Route path="/admin-panel" element={isAdmin ? <AdminPanel token={token} /> : <Navigate to="/admin" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;