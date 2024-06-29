import React from 'react';
import LoginPage from './components/Login&Register/LoginPage';
import RegisterPage from './components/Login&Register/RegisterPage';
import Dashboard from './components/Dashboard/Dashboard';
import Friends from './components/Friends/Friends';
import UserPosts from './components/Posts/UserPosts';
import UserProfile from './components/Posts/UserProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LoginRegister from './components/Login&Register/LoginPage';

function App() {
  return (
    <Router>
    <div>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/userPosts" element={<UserPosts />} />
      <Route path="/profile" element={<UserProfile />} />


    </Routes>
    </div>
    </Router>
  );
}

export default App;
