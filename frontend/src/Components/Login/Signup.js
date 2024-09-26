import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css'; // For styling

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Get the selected file
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('image', image); // Append the image to formData

    try {
      const response = await fetch('http://localhost:8081/signup', {
        method: 'POST',
        body: formData, // Send formData, not JSON
      });

      const result = await response.json();
      if (response.ok) {
        alert('Account created successfully');
        navigate('/login');
      } else {
        alert('Error creating account: ' + result.error);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred, please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup} encType="multipart/form-data">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange}
          required
        />
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required
        />
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
        <input 
          type="password" 
          placeholder="Re-enter Password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required
        />
        <input 
          type="tel" 
          placeholder="Phone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
            Already have an account? 
            <span onClick={() => navigate('/login')} className="login-link">Login</span>
          </p>
    </div>
  );
};

export default Signup;
