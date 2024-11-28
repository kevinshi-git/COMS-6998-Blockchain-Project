import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sha512 from 'js-sha512';
import './Auth.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [returnWindow,setReturnWindow]=useState(0)
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !password) {
      setError('Username and password must be at least 1 character');
      return;
    }

    try {
      const response = await fetch('https://w6998-backend-2-745799261495.us-east4.run.app/create_new_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          returnWindow,
        }),
      });

      const data = await response.json();
      console.log(data)
      
      if (data.success) {
        setSuccess('Account Successfully Created');
        setUsername('');
        setPassword('');
        setReturnWindow(0);
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(data.message);
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
        <div className="input-group">
          <input
            type="number"
            placeholder="Return Window (days)"
            step='1'
            min='0'
            max='20' 
            onChange={(e) => setReturnWindow(Number(e.target.value))}
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