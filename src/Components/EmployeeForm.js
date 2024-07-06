import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeForm.css'; 
import { Link } from 'react-router-dom';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    department: '',
    dob: '',
    gender: '',
    designation: '',
    salary: ''
  });

  const [designationOptions, setDesignationOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For DOB validation
    if (name === 'dob') {
      const currentDate = new Date();
      const selectedDate = new Date(value);
      const age = currentDate.getFullYear() - selectedDate.getFullYear();

      if (isNaN(age) || age < 18 || age > 100 || selectedDate > currentDate) {
        // Invalid date format or age out of range
        alert('Invalid date format or age out of range');
        return;
      }
    }

    // For salary validation
    if (name === 'salary' && parseFloat(value) < 0) {
      alert('Salary cannot be negative');
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Define designation options based on department
    const optionsByDepartment = {
      IT: ['Developer', 'System Analyst', 'QA Engineer'],
      HR: ['HR Manager', 'Recruiter', 'Trainer'],
      Finance: ['Accountant', 'Financial Analyst', 'Controller'],
      Logistics: ['Warehouse Manager', 'Supply Chain Coordinator'],
      Designing: ['Graphic Designer', 'UI/UX Designer', 'Web Designer']
    };

    // Update designation options when department changes
    if (formData.department && optionsByDepartment[formData.department]) {
      setDesignationOptions(optionsByDepartment[formData.department]);
    } else {
      setDesignationOptions([]);
    }
  }, [formData.department]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/employees', formData);
      alert('Employee added successfully!');
    } catch (error) {
      alert('Failed to add employee. Please try again.');
    }
  };

  return (
    <div className='cont'>
      <div className="form-container">
        <h2>Add New Employee</h2>
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Employee Name"
              maxLength={30}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Employee ID"
              required
            />
          </div>
          <div className="form-group">
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Logistics">Logistics</option>
              <option value="Designing">Designing</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  required
                />{' '}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  required
                />{' '}
                Female
              </label>
            </div>
          </div>
          <div className="form-group">
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
            >
              <option value="">Select Designation</option>
              {designationOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Salary"
              maxLength={8}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
        <Link to="/list" className="btn">View Employee List</Link>
      </div>
    </div>
  );
};

export default EmployeeForm;
