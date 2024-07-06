import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AssignPage = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [taskDescription, setTaskDescription] = useState('');
  const { employeeId } = useParams();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`https://emp-backend-vl2r.onrender.com/api/employee/${employeeId}`);
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [employeeId]);

  const handleTaskAssignment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://emp-backend-vl2r.onrender.com/api/assign-task`, {
        employeeId,
        description: taskDescription,
      });
      setTaskDescription('');
      alert('Task assigned successfully!');
    } catch (error) {
      console.error('Error assigning task:', error);
      alert('Error assigning task. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Assign Task Page for Employee {employee.name}</h2>
      <p className="mb-4">Employee Name: {employee.name}</p>
      
      {/* Task assignment form */}
      <form onSubmit={handleTaskAssignment} className="space-y-4">
        <div>
          <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">Task Description:</label>
          <textarea
            id="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="4"
          />
        </div>
        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default AssignPage;
