import React, { useState } from 'react';
import './App.css';
import './index.css';
import CandidatesList from './components/CandidatesList';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import Results from './components/Results';

function App() {
  const [token, setToken] = useState(null);

  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Voting System</h1>
      </header>
      {!token ? (
        <>
          <Login onLogin={handleLogin} />
          <Register />
        </>
      ) : (
        <>
          <CandidatesList token={token} />
          <AdminPanel token={token} />
          <Results />
        </>
      )}
    </div>
  );
}

export default App;