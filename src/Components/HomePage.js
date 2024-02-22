// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling
import Image1 from './worker.jpg';

const HomePage = () => {
  return (
    <div className="container">
      <h1 className="title">Employee Management System</h1>
      <div className="image-container">
        <img src={Image1} alt="Employee" className="image" />
        <div className="overlay"></div>
        <div className="caption">Manage Your Workforce Efficiently</div>
      </div>
      <div className="button-container">
        <Link to="/add" className="btn btn-primary">Add Employee</Link>
        <Link to="/list" className="btn btn-secondary">List Employees</Link>
      </div>
    </div>
  );
}

export default HomePage;
