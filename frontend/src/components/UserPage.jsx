import React from 'react';
import Login from './Login';
import Register from './Register';

const UserPage = ({ onLogin }) => {
  return (
    <div className="space-y-4">
      <Login onLogin={onLogin} />
      <Register />
    </div>
  );
};

export default UserPage;