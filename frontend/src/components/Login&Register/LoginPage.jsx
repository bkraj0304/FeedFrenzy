import React,{useState} from 'react'
import './LoginRegister.css';
import { FaUser,FaLock, FaEye, FaEyeSlash  } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ls from 'local-storage';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State variable to track password visibility
  const navigate = useNavigate();


  const handleSubmit =async (e)=>{
    e.preventDefault(); // Prevent the form from submitting and causing a page reload

    let loginData =null;
    const data = await axios.post('http://localhost:3001/login', {username,password}, 
      {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(function (response) {
      // console.log('Login Response',response.data);
      loginData = response.data;
      alert(loginData.message);
      
      if(loginData.message === "Login successful"){
  
        // console.log("Dataa",response.data.jwtToken,response.data.userDetails);
        ls.set('JWTToken', response.data.jwtToken);
        ls.set('userDetails', JSON.stringify(response.data.userDetails));
        navigate('/dashboard');
        // console.log("Successfully Login");
      }
    })
    .catch(function (error) {
      // console.log('Login Error: ',error);
      loginData.error_message = "Error Occurred";
      return (loginData);
    });
    
     

    // const response = await fetch('http://localhost:3001/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ username, password })
    // });

    // console.log(response);
    // if (response.ok) {
    //   alert('Login successful');
    //   navigate('/'); // Navigate to home page
    // } else {
    //   alert('Invalid credentials');
    // }

  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the value of showPassword
  }


  return (
    <div className='login-container'>
    <div className='wrapper'>
      <div className="form-box login">
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
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
                <input type={showPassword ? "text" : "password"}
                placeholder='Password' 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} 

                />
                {/* <FaEye className='icon' /> */}
                {showPassword ? <FaEyeSlash className='icon' onClick={togglePasswordVisibility} /> : <FaEye className='icon' onClick={togglePasswordVisibility} />}

            </div>
            <div className="remember-forget">
                <label><input type="checkbox"
                  required
                />Remember Me</label>
                <a href='#'>Forget password?</a>
            </div>
            <button type='submit'>Login</button>

            <div className="register-link">
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
            </div>
        </form>
      </div>


 
    </div>
    </div>
  )
}

export default LoginPage
