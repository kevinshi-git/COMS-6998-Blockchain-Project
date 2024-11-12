import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sha512 from 'js-sha512';
import './Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const hashedPassword = sha512(password);
    
    try {
      const response = await fetch('/verify_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password: hashedPassword,
        }),
      });

      const data = await response.json();
      
      if (data.data) {
        navigate(`/user/${username}`);
      } else {
        setError('Wrong username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-text">{error}</div>}
        <div className="button-group">
          <button onClick={handleLogin}>Login</button>
          <button onClick={() => navigate('/signup')}>Create New Account</button>
        </div>
      </div>
    </div>
  );
};

export default Login; 