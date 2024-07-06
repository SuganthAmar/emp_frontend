// Import Tailwind CSS classes
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css';
import { Link } from 'react-router-dom';

const List = () => {
  const [emps, setEmps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    name: '',
    employeeId: '',
    department: '',
    gender: '',
    designation: '',
    minSalary: '',
    maxSalary: ''
  });

  const pageSize = 10; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://emp-backend-vl2r.onrender.com/api/select?page=${currentPage}&pageSize=${pageSize}`, { params: filters });
        setEmps(response.data.employees);
        setTotalPages(Math.ceil(response.data.totalCount / pageSize));
      } catch (err) {
        console.log(`${err}`);
      }
    }
    fetchData();
  }, [currentPage, filters]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="list-container">
      <h2 className="text-xl font-bold mb-4">Employee List</h2>
      <div className="flex mb-4">
        <input type="text" name="name" value={filters.name} onChange={handleFilterChange} placeholder="Name" className="border border-gray-300 rounded px-4 py-2 mr-2" />
        <input type="text" name="employeeId" value={filters.employeeId} onChange={handleFilterChange} placeholder="Employee ID" className="border border-gray-300 rounded px-4 py-2 mr-2" />
        <input type="text" name="department" value={filters.department} onChange={handleFilterChange} placeholder="Department" className="border border-gray-300 rounded px-4 py-2 mr-2" />
        <input type="text" name="gender" value={filters.gender} onChange={handleFilterChange} placeholder="Gender" className="border border-gray-300 rounded px-4 py-2 mr-2" />
        <input type="text" name="designation" value={filters.designation} onChange={handleFilterChange} placeholder="Designation" className="border border-gray-300 rounded px-4 py-2 mr-2" />
        <input type="number" name="minSalary" value={filters.minSalary} onChange={handleFilterChange} placeholder="Min Salary" className="border border-gray-300 rounded px-4 py-2 mr-2" />
        <input type="number" name="maxSalary" value={filters.maxSalary} onChange={handleFilterChange} placeholder="Max Salary" className="border border-gray-300 rounded px-4 py-2" />
      </div>
      <table className="employee-table w-full mb-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Department</th>
            <th>Gender</th>
            <th>Designation</th>
            <th>DOB</th>
            <th>Salary</th>
            <th>Assign Task</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {emps.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.employeeId}</td>
              <td>{employee.department}</td>
              <td>{employee.gender}</td>
              <td>{employee.designation}</td>
              <td>{new Date(employee.dob).toLocaleDateString()}</td>
              <td>{employee.salary}</td>
              <td>
                <Link to={`/assign-task/${employee.employeeId}`} className="btn btn-primary">Assign</Link>
              </td>
              <td>
                <Link to={`/progress/${employee.employeeId}`} className="btn btn-secondary">Progress</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className='btn btn-primary'>Previous</button>
        <span>Page  {currentPage}  of  {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className='btn btn-primary'>Next</button>
      </div>
      <Link to="/add" className="btn">Back to Form</Link>
    </div>
  );
}

export default List;
