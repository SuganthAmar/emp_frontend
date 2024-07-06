import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { employeeId } = useParams();

  useEffect(() => {
    const fetchAssignedTasks = async () => {
      try {
        const response = await axios.get(`https://emp-backend-vl2r.onrender.com/api/assigned-tasks/${employeeId}`);
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assigned tasks:', error);
      }
    };

    fetchAssignedTasks();
  }, [employeeId]);

  const handleTaskCompletion = async (taskId) => {
    try {
      await axios.put(`https://emp-backend-vl2r.onrender.com/api/complete-task/${taskId}`);
      // Update the tasks array to reflect the completion
      setTasks(tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, completed: true };
        }
        return task;
      }));
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold mb-4">Assigned Tasks for Employee {employeeId}</h2>
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center">
            <span className="mr-2">{task.description}</span>
            {/* Checkbox to mark task as completed */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleTaskCompletion(task.id)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDashboard;
