



import React, { useCallback, useEffect, useState } from 'react';
import '../Styles/Dashboard.css';
import SideBar from '../Dashboard/SideBar';
import Header from '../Dashboard/Header';
import Footer from '../Dashboard/Footer';
import UserProfileCard from './UserProfileCard';
import ls from 'local-storage';

const App = () => {
  const [userProfileDetails, setUserProfileDetails] = useState([]);
  const userDetailsString = ls.get('userDetails');
  var userToken=ls.get('JWTToken');
  const userDetails = JSON.parse(userDetailsString);
  const userId = userDetails.userid;

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/getUserDetails`, {
        method: 'POST',
        headers: {
          'token':userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      });

      const userDetails = await response.json();
      if (userDetails.message === "Details Fetched Successfully") {
        setUserProfileDetails(userDetails.data);
      } else {
        alert(userDetails.message);
      }
    } catch (error) {
      console.error('UserDetails :', error.message);
    }
  }, [userId,userToken]);

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId, fetchUserDetails]);

  useEffect(() => {
    if (userProfileDetails.length > 0) {
      // console.log("UserDetails", userProfileDetails, userProfileDetails[0].user_name, userProfileDetails[0].user_gender);
    }
  }, [userProfileDetails]);

  return (
    <div>
      <Header />
      <div className="container text-center app-container" style={{ marginTop: '5%' }}>
        <div className="row align-items-start">
          <SideBar />
          <div className="col col-md-10">
            <UserProfileCard userDetails={userProfileDetails} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;












