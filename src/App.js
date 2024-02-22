import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import EmployeeForm from './Components/EmployeeForm';
import HomePage from './Components/HomePage';
import List from './Components/List';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/add' element={<EmployeeForm/>}/>
          <Route path='/list' element={<List/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
