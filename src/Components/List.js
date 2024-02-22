import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const List = () => {
  const [emps, setEmps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await axios.get("https://emp-backend-eq6h.onrender.com/api/select");
        setEmps(employees.data.employees);
      } catch (err) {
        console.log(`${err}`);
      }
    }
    fetchData();
  }, [])

  return (
    <div className="list-container">
      <h2>Employee List</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Department</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>
          {emps.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.employeeId}</td>
              <td>{employee.department}</td>
              <td>{new Date(employee.dob).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add" className="btn">Back to Form</Link>
    </div>
  );
}

export default List;
