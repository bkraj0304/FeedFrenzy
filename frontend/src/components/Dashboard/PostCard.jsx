// import React from 'react';
// import '../Styles/PostCard.css';
// import MaleImg from '../Assets/3135715.jpg';
// import LadyImg from '../Assets/lady1.jpg';
// import { useState,useCallback,useEffect } from 'react';
// import ls from 'local-storage';

// const PostCard = ({ userName, date, title, about, postid, onDelete, userGender,friendid,comments }) => {
//   var userDetailsString = ls.get('userDetails');
//   var userDetails = JSON.parse(userDetailsString);
//   var userId = userDetails.userid;
//   var username= userDetails.username;
//   var usergender = userDetails ? userDetails.userGender : 'unknown';
//   const friendName=userName;

//   const [comment, setComment] = useState('');
//   const [commentsList,setCommentsList] = useState(comments.data);


//   useEffect(() => {
//     setCommentsList(comments.data);
//     console.log("commentsList",commentsList);
// }, [comments.data]);

//   const handleComment = async (comment,friendid,friendName,postid) => {
//     try {
//         const response = await fetch('http://localhost:3001/handleComment', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({comment,friendid,friendName,postid,userId,username,usergender})
//         });
//         // console.log("Hieeeeee");
//         const data = await response.json();
//         console.log("handleAcceptRequest", data);
//         if(data.message==="Comment Inserted Successfully"){
//           alert(data.message);
//         }
//         else alert("Error Inserting Comment")

//         // alert(data.message);
//         window.location.reload();
//     } catch (error) {
//         console.error('Error rejecting friend request:', error);
//     }
// };
//   return (
//     <div className="container text-left max-width-100">
//       <div className="row">
//         <div className="col-1">
//           <img src={userGender === "male" ? MaleImg : LadyImg} className="card-img-top image_css max-width-50 UserImg" alt="User" />
//         </div>
//         <div className="col-11">
//           <div>
//             <p id="userName_card" className="fw-medium margin-vertical-20">
//               {userName}
//             </p>
//           </div>
//           <div>
//             <p id="userDate_card" className="fw-normal">
//               {date}
//             </p>
//           </div>
//         </div>
//       </div>
//       <hr />
//       <div className="card-body">
//         <p id="postTitle_card" className="fw-bolder font-size-24 padding-right-63">
//           {title}
//         </p>
//         <p id="postAbout_card" className="fw-medium padding-right-66">
//           {about}
//         </p>
//         <div>
//           <textarea
//             id="comment"
//             placeholder="Write a comment"
//             name="comment"
//             rows="2"
//             cols="50"
//             className="textarea-70"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)} 
//           ></textarea>
//           <button type="button" className="btn btn-primary margin-bottom-43 comment_btn"
//           onClick={() => handleComment(comment,friendid,friendName,postid
//           )}>
//             Comment
//           </button>
//           {onDelete !== null && (
//             <button
//               type="button"
//               className="btn btn-danger delete_css deletePost_btn"
//               onClick={() => onDelete(postid)}
//             >
//               Delete Post
//             </button>
//           )}
//         </div>
//       </div>
//       <div>
        

//         <h6>Comment section</h6>
//         {commentsList && commentsList.length > 0 ? (
//           commentsList.map((comment, index) => (
//             <p key={index}>
//               <strong>{comment.userName}:</strong> {comment.userComment}
//             </p>
//           ))
//         ) : (
//           <p>No comments</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostCard;
import React from 'react';
import '../Styles/PostCard.css';
import MaleImg from '../Assets/3135715.jpg';
import LadyImg from '../Assets/lady1.jpg';
import { useState, useEffect } from 'react';
import ls from 'local-storage';

const PostCard = ({ userName, date, title, about, postid, onDelete, userGender, friendid, comments }) => {
  var userDetailsString = ls.get('userDetails');
  var userDetails = JSON.parse(userDetailsString);
  var userId = userDetails.userid;
  var username = userDetails.username;
  var usergender = userDetails ? userDetails.userGender : 'unknown';
  const friendName = userName;

  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState(comments.data);


  useEffect(() => {
    setCommentsList(comments.data);
  }, [comments.data]);

  const handleComment = async (comment, friendid, friendName, postid) => {
    try {
      const response = await fetch('http://localhost:3001/handleComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment, friendid, friendName, postid, userId, username, usergender })
      });
      const data = await response.json();
      if (data.message === "Comment Inserted Successfully") {
        alert(data.message);
      } else alert("Error Inserting Comment");

      window.location.reload();
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  return (
    <div className="container text-left max-width-100 post-card">
      <div className="row">
        <div className="col-1">
          <img src={userGender === "male" ? MaleImg : LadyImg} className="card-img-top image_css max-width-50 UserImg" alt="User" />
        </div>
        <div className="col-11">
          <div>
            <p id="userName_card" className="fw-medium margin-vertical-20">
              {userName}
            </p>
          </div>
          <div>
            <p id="userDate_card" className="fw-normal">
              {date}
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="card-body">
        <p id="postTitle_card" className="fw-bolder font-size-24 padding-right-63">
          {title}
        </p>
        <p id="postAbout_card" className="fw-medium padding-right-66">
          {about}
        </p>
        <div>
          <textarea
            id="comment"
            placeholder="Write a comment"
            name="comment"
            rows="2"
            cols="50"
            className="textarea-70"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button type="button" className="btn btn-primary margin-bottom-43 comment_btn"
            onClick={() => handleComment(comment, friendid, friendName, postid)}>
            Comment
          </button>
          {onDelete !== null && (
            <button
              type="button"
              className="btn btn-danger delete_css deletePost_btn" style={{marginBottom: '15px'}}
              onClick={() => onDelete(postid)}
            >
              Delete Post
            </button>
          )}
        </div>
      </div>
      <div className="comments-section">
        <h6>Comment section</h6>
        <div className="comments-list">
          {commentsList && commentsList.length > 0 ? (
            commentsList.map((comment, index) => (
              <div key={index} className="comment">
                <strong>{comment.userName}:</strong> {comment.userComment}
                {/* {postCardFor==="userpost"?
                  <button type="button"
                        className=" btn btn-danger delete_css deletePost_btn btn_css botton_class">
                        Remove
                        </button>
                  :
                  {}
                } */}
                
              </div>
            ))
          ) : (
            <p>No comments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
