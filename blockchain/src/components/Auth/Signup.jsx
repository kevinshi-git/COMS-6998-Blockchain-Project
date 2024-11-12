import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sha512 from 'js-sha512';
import './Auth.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !password) {
      setError('Username and password must be at least 1 character');
      return;
    }

    const hashedPassword = sha512(password);
    
    try {
      const response = await fetch('/create_new_user', {
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
        setSuccess('Account Successfully Created');
        setUsername('');
        setPassword('');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError('Username already exists');
      }
    } catch (err) {
      setError('An error occurred during signup');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
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
        {success && <div className="success-text">{success}</div>}
        <div className="button-group">
          <button onClick={handleSignup}>Sign Up</button>
          <button onClick={() => navigate('/')}>Return to Login</button>
        </div>
      </div>
    </div>
  );
};

export default Signup; 