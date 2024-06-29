import { React, useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../Styles/Dashboard.css';
import SideBar from './SideBar';
import PostForm from './PostForm';
import PostCard from './PostCard';
import Header from './Header';
import Footer from './Footer';
import Friends from '../Friends/Friends';
import ls from 'local-storage';

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options);
};

const App = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  var userDetailsString = ls.get('userDetails');
  var userDetails = JSON.parse(userDetailsString);
  var userId = userDetails.userid;
  var userName = userDetails.username;
  var userGender = userDetails ? userDetails.userGender : 'unknown';
  
  const fetchPosts = useCallback(async () => {
    try {
      
      const response = await fetch(`http://localhost:3001/getFriendsPosts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    });
  
    const friendsPostDetails = await response.json();
    // console.log("fetchFriendsPostsassses", friendsPostDetails);
    if (friendsPostDetails.message === "Friends Details Fetched") {

        setPosts(friendsPostDetails.data);
        return friendsPostDetails.data;
        // console.log("FriendsPosts",friendsPostDetails.data);
    } else {
        alert(friendsPostDetails.message);
    }

    } catch (error) {
      console.error('Dashboard :', error.message);
      // Handle the error here (e.g., show a message to the user or retry fetching)
      return [];
    }
  }, [userId]);
  
  const fetchComments = useCallback(async (postId) => {
    try {
      // console.log("Yes");
      const response = await fetch(`http://localhost:3001/getComments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postid: postId })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Dashboard :', error.message);
      // Handle the error here (e.g., show a message to the user or retry fetching)
      return [];
    }
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      if (userId) {
        try {
          // Fetch posts
          const fetchedPosts = await fetchPosts();
          // console.log("fetchedPOSTS",fetchedPosts);
          setPosts(fetchedPosts);

          // Fetch comments for each post
          const commentsMap = {};
          // console.log("Here");
          for (const post of fetchedPosts) {
            const fetchedComments = await fetchComments(post.post_id);
            commentsMap[post.post_id] = fetchedComments;
          }
          setComments(commentsMap);
          // console.log("commentsMap",commentsMap);
        } catch (error) {
          console.error('Error fetching posts or comments:', error);
        }
      }
    };

    fetchAllData();
  }, [userId, fetchPosts, fetchComments]);

  // const handleDelete = async (postid) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/deletepost?postid=${postid}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const result = await response.json();

  //     if (result.message === 'Post deleted successfully') {
  //       fetchPosts();
  //     }

  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //     fetchPosts();
  //   }
  // };

  return (
    <div>
      <Header />
      <div className="container text-center app-container" style={{marginTop: '5%'}}>
        <div className="row align-items-start">
          <SideBar />
          <div className="col col-md-10">
            <PostForm />
            <hr />
            <div id="userPostCard" className="card card-lightgray">
              {posts.map((post) => (
                <PostCard
                  key={post.post_id}
                  userName={post.friend_name}
                  date={formatDate(post.creater_in)}
                  title={post.post_title}
                  about={post.post_body}
                  postid={post.post_id}
                  userGender={post.friend_gender}
                  friendid={post.user_id}
                  onDelete={null}
                  comments={comments[post.post_id] || []}
                  postCardFor={"friendspost"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;















