import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeForm from './Components/EmployeeForm';
import HomePage from './Components/HomePage';
import List from './Components/List';
import AdminLogin from './Components/adminlogin/AdminLogin';
import EmployeeLogin from './Components/EmployeeLogin/EmployeeLogin';
import AssignTask from './Components/AssignTask/AssignTask';
import { useState } from 'react';
import EmployeeDashboard from './Components/EmployeeDashBoard/EmployeeDashboard';
import EmployeeProgress from './Components/EmployeeProgess/EmployeeProgess';

function App() {
  // Assuming you have a state to store the current employeeId
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/add' element={<EmployeeForm />} />
          <Route path='/list' element={<List />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/employee-login' element={<EmployeeLogin />} />
          {/* Route for AssignTaskPage with employeeId param */}
          <Route path='/assign-task/:employeeId'
            element={<AssignTask currentEmployeeId={currentEmployeeId} setCurrentEmployeeId={setCurrentEmployeeId} />}
          />
          {/* Assuming you're using React Router for navigation */}
          <Route path="/employee-dashboard/:employeeId" element={<EmployeeDashboard />} />
          <Route path="/progress/:employeeId" element={<EmployeeProgress />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
