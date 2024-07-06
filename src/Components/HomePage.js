import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
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
        <Link to="/admin-login" className="btn btn-primary">Admin Login</Link>
        <Link to="/employee-login" className="btn btn-secondary">Employee Login</Link>
      </div>
    </div>
  );
}

export default HomePage;
