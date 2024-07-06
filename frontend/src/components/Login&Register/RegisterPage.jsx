
import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState(''); // State variable for gender
  const [showPassword, setShowPassword] = useState(false); // State variable to track password visibility
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the value of showPassword
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // This converts the username, email, password, and gender variables into a JSON string and sets it as the body of the request.
      //  This means the data will be sent to the server in JSON format.
      body: JSON.stringify({ username, email, password, gender })
    });

    const data = await response.text();
    alert("Data inserted successfully!!!");
    navigate('/');
  };

  return (
    <div className='login-container'>
      <div className='wrapper'>
        <div className="form-box login">
          <form onSubmit={handleSubmit}>
            <h1>Registration</h1>
            <div className="input-box">
              <input type="text"
                placeholder='Username'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FaUser className='icon' />
            </div>

            <div className="input-box">
              <input type="email"
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaEnvelope className='icon' />
            </div>

            <div className="input-box">
              <input type={showPassword ? "text" : "password"}
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? <FaEyeSlash className='icon' onClick={togglePasswordVisibility} /> : <FaEye className='icon' onClick={togglePasswordVisibility} />}
            </div>

            <div className="input-box">
              <select value={gender} placeholder='Select Gender' onChange={(e) => setGender(e.target.value)} required>
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="remember-forget">
              <label><input type="checkbox" required />I agree to the terms & conditions</label>
            </div>
            <button type='submit'>Register</button>

            <div className="register-link">
              <p>Already have an account? <Link to='/'>Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
