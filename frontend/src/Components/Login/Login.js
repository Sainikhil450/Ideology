import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Import the useAuth hook
import './Login.css'; // For styling
import bufferingGif from '../../Images/idea-lightbulb.jpeg'; // Add buffering GIF

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading
  const { login } = useAuth(); // Use login function from AuthContext
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const success = await login(email, password); // Use login function
      setLoading(false); // Stop loading

      if (success) {
        navigate('/home'); // Redirect to home page on successful login
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      setLoading(false); // Stop loading
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      {loading ? (
        <div className="loading-animation">
          <img src={bufferingGif} alt="Buffering..." /> {/* Use buffering GIF */}
          <p>Loading, please wait...</p>
        </div>
      ) : (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <button type="submit" disabled={loading}>Login</button>
          </form>
          <p>
            Don't have an account? 
            <span onClick={() => navigate('/signup')} className="link">Signup</span>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
