import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './AdminLogin.css'; // Import your CSS file for styling

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAdminLogin = () => {
    // Replace 'password123' with your actual admin password
    if (password === 'password123') {
      // Set loggedIn to true upon successful login
      setLoggedIn(true);
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (loggedIn) {
    // Redirect to the "add" page if loggedIn is true
    return <Navigate to="/add" />;
  }

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
        <input type="password" className="grow"  onChange={handlePasswordChange}/>
</label>
      <button className=" btn btn-primary" onClick={handleAdminLogin}>Login</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AdminLogin;
