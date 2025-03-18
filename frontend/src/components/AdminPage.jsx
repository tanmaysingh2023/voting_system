import React from 'react';
import Login from './Login';

const AdminPage = ({ onLogin }) => {
  return (
    <div className="space-y-4">
      <Login onLogin={onLogin} />
    </div>
  );
};

export default AdminPage;