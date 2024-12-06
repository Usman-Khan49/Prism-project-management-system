import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import './styles/auth.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/Dashboard" /> : <Signin />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/Dashboard" /> : <Signup />} 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;