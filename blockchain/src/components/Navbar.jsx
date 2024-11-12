import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !['/', '/signup'].includes(location.pathname);

  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc.)
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Blockchain Receipt System
      </div>
      <div className="navbar-menu">
        <button 
          onClick={() => navigate('/')} 
          className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          Home
        </button>
        <button 
          onClick={() => navigate('/about')} 
          className={`navbar-item ${location.pathname === '/about' ? 'active' : ''}`}
        >
          About
        </button>
        <button 
          onClick={() => navigate('/contact')} 
          className={`navbar-item ${location.pathname === '/contact' ? 'active' : ''}`}
        >
          Contact
        </button>
        {isLoggedIn && (
          <button 
            onClick={handleLogout} 
            className="navbar-item logout-btn"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 