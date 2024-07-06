import { React, useCallback, useEffect, useState } from 'react';
import '../Styles/Dashboard.css';
import SideBar from '../Dashboard/SideBar';
import Header from '../Dashboard/Header';
import Footer from '../Dashboard/Footer';
import FriendContainer from './FriendCont';
import ls from 'local-storage';



const App = () => {
  const [friends, setFriends] = useState([]);
  var userDetailsString = ls.get('userDetails');
  var userToken=ls.get('JWTToken');
  var userDetails = JSON.parse(userDetailsString);
  var userId = userDetails.userid;

  const fetchPosts =useCallback( async () => {
    try {
      const response = await fetch(`http://localhost:3001/getFriends?userId=${userId}`, {
        method: 'GET',
        headers: {
          'token':userToken,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const availableFriendList = await response.json();
      // console.log("Raj31", availableFriendList);
      setFriends(availableFriendList.data);

    } catch (error) {
      // console.error('fetchPosts:', error);
    }
  },[userId,userToken]);

  useEffect(() => {
    if (userId) {
      fetchPosts();
    }
  }, [userId,fetchPosts]);
  return (

    <div>
      <Header />
      <div className="container text-center app-container" style={{marginTop: '5%'}}>
        <div className="row align-items-start">
          <SideBar />
          <div className="col col-md-10">
            
            <FriendContainer data={friends} />
          
          
          </div>
        </div>
      </div>
      <Footer />
      </div>
  );
};

export default App;















