import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EmployeeLogin.css';

const EmployeeLogin = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleEmployeeLogin = () => {
    axios.post('http://localhost:5001/api/employee/login', {
      employeeId: employeeId,
      dob: dob,
    })
    .then(response => {
      if (response.status === 200) {
        console.log('Login successful');
        // Redirect user to the employee dashboard page with the employee ID
        navigate(`/employee-dashboard/${employeeId}`);
      } else {
        setError('Invalid employee ID or date of birth. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in. Please try again.');
    });
  };

  return (
    <div className="employee-login-container">
      <h2>Employee Login</h2>
      <input
        type="text"
        placeholder="Employee ID"
        value={employeeId}
        onChange={handleEmployeeIdChange}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={handleDobChange}
      />
      <button onClick={handleEmployeeLogin} className='btn btn-primary'>Login</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default EmployeeLogin;
