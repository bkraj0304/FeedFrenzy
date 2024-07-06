import React from 'react';
import '../Styles/PostForm.css';
import { useState } from 'react';
import ls from 'local-storage';
import { Navigate, useNavigate } from 'react-router-dom';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate= useNavigate();
  
  var userDetailsString = ls.get('userDetails');
  var userToken=ls.get('JWTToken');
  var userDetails = JSON.parse(userDetailsString);
  var user_id = userDetails.userid;
  const handleSubmit =async (e)=>{
    e.preventDefault(); // Prevent form default submission behavior
   const response = await fetch('http://localhost:3001/post', {
      method: 'POST',
      headers: {
        'token':userToken,
        'Content-Type': 'application/json'
      },
      // This converts the username, email, and password variables into a JSON string and sets it as the body of the request.
      //  This means the data will be sent to the server in JSON format.
      body: JSON.stringify({ title, content,user_id})
    });
    const data = await response.text();
    // console.log(data);
    alert("Data inserted successfully!!!");
    navigate('/dashboard', { replace: true });
    window.location.reload();

  

  };
  return (
    <form onSubmit={handleSubmit}>
    <div className="card card-lightgray" style={{backgroundColor:'lightgray'}}>
      <div className="title-container">
        <input type="text" 
        placeholder="Add Title" 
        className="Title_css title_css"
        required 
        value={title}
        onChange={(e) => setTitle(e.target.value)} 

        />
      </div>
      <div className="card-body card-lightgray">
        <textarea
          placeholder="What is in your Mind...."
          id="about"
          name="about"
          rows="4"
          cols="50"
          className="textarea-fullwidth"
          required 
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <button type="submit" className="btn btn-primary new">
          Add Post
        </button>
      </div>
      
    </div>
    </form>
  );
};

export default PostForm;
