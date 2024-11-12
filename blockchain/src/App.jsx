import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UserDashboard from './components/UserDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user/:username" element={<UserDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 