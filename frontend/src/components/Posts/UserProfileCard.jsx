import React from 'react';
import MaleImg from '../Assets/3135715.jpg';
import LadyImg from '../Assets/lady1.jpg';
import '../Styles/UserProfileCard.css';

const UserProfileCard = ({ userDetails }) => {
  if (!userDetails || userDetails.length === 0) {
    return <div>No user details available.</div>;
  }

  const user = userDetails[0];
  const profileImage = user.user_gender === 'male' ? MaleImg : LadyImg;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="user-profile-card">
      <img src={profileImage} alt="Profile" className="profile-image" />
      <h1>{user.user_name}</h1>
      <p>Email: {user.user_email}</p>
      <p>Gender: {user.user_gender}</p>
      <p>Date of Joining: {formatDate(user.date)}</p>
    </div>
  );
};

export default UserProfileCard;
