import React from 'react';
import '../Styles/PostCard.css';
import MaleImg from '../Assets/3135715.jpg';
import LadyImg from '../Assets/lady1.jpg';


const PostCard = ({ userName, date, title, about,postid,onDelete,userGender}) => (

  
  <div className="container text-left max-width-100">
    <div className="row">
      <div className="col-1">
        <img src={userGender=="male"?MaleImg:LadyImg} className="card-img-top image_css max-width-50 UserImg" />
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
        ></textarea>
        <button type="button" className="btn btn-primary margin-bottom-43 comment_btn">
          Comment
        </button>
        {
          onDelete!==null && (<button type="button"
         className=" btn btn-danger delete_css deletePost_btn "
         onClick={() => onDelete(postid)}
         >
          Delete Post
        </button>
          )
        
        }
        {/* <button type="button"
         className=" btn btn-danger delete_css deletePost_btn "
         onClick={() => onDelete(postid)}
         >
          Delete Post
        </button> */}
      </div>
    </div>
  </div>
);

export default PostCard;
