import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployeeProgress = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { employeeId } = useParams();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/assigned-tasks/${employeeId}`);
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [employeeId]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  // Calculate progress
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Employee Progress for Employee {employeeId}</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-coffee-700">Task Overview</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Here's a summary of tasks assigned to the employee.</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-coffee-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-coffee-500">Total Tasks</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{totalTasks}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-coffee-500">Completed Tasks</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{completedTasks}</dd>
            </div>
            <div className="bg-coffee-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-coffee-500">Progress</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{progress.toFixed(2)}%</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProgress;
