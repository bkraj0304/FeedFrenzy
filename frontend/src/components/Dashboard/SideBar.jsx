// import React from 'react';
// import MaleImg from '../Assets/3135715.jpg';
// import LadyImg from '../Assets/lady1.jpg';
// import PostImg from '../Assets/post.jpg'; // Ensure this path is correct
// import SettingsImg from '../Assets/setting.jpg'; // Ensure this path is correct
// import LogoutImg from '../Assets/logout.jpg'; // Ensure this path is correct
// import Friendsimg from '../Assets/Friends.jpg';
// import '../Styles/Sidebar.css';
// import ls from 'local-storage';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//   // const username=ls.get('userDetails');
//   var userDetailsString = ls.get('userDetails');
//   var userDetails = JSON.parse(userDetailsString);
//   var username = userDetails.username;
//   var userGender=userDetails.userGender;
//   return (
//     <div className="col col-md-2">
//       <ul className="nav flex-column">
//         <li className="nav-item">
//         <div className='parentdiv '>
//           <img src={userGender=="male"?MaleImg:LadyImg} className='circular-image' alt='username'></img>
//           <div className='childText'>
//           <Link to="/dashboard">{username}</Link> 
//            </div>
//         </div>
        
          
//         </li>

//         <li className="nav-item">
//         <Link to="/friends" className='parentdiv'>
        
//           <img src={Friendsimg} className='circular-image' alt='Friends'></img>
//           <div className='childText'> Friends </div>
//           </Link>
//         </li>


//         <li className="nav-item">
        
//         <Link to="/userPosts" className='parentdiv'>
//           <img src={PostImg} className='circular-image' alt='Posts'></img>
//           <div className='childText'>My Posts </div>
//           </Link>
          
//         </li>

//         <li className="nav-item">
        
//         <Link to="/profile" className='parentdiv'>
//           <img src={PostImg} className='circular-image' alt='Posts'></img>
//           <div className='childText'>My Profile</div>
//           </Link>
          
//         </li>
        
//       </ul>
//     </div>
//   );
// };

// const ProfileItem = ({ imgSrc, linkHref, linkText }) => (
//   <div className="container text-left max-width-100">
//     <div className="row">
//       <div className="col flex-grow-0">
//         <img src={imgSrc} className="card-img-top image_css max-width-50" />
//       </div>
//       <div className="col padding-right-0">
//         <div>
//           <a className="nav-link profile_icon_text" href={linkHref}>
//             {linkText}
//           </a>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default Sidebar;
import React from 'react';
import MaleImg from '../Assets/3135715.jpg';
import LadyImg from '../Assets/lady1.jpg';
import PostImg from '../Assets/post.jpg';
import FriendsImg from '../Assets/Friends.jpg';
import MyProfile from '../Assets/My_profile.jpg';
import '../Styles/Sidebar.css';
import ls from 'local-storage';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  var userDetailsString = ls.get('userDetails');
  var userDetails = JSON.parse(userDetailsString);
  var username = userDetails.username;
  var userGender = userDetails.userGender;

  return (
    <div className="col col-md-2 sidebar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <div className="parentdiv">
            <img src={userGender === "male" ? MaleImg : LadyImg} className="circular-image" alt="username" />
            <div className="childText">
              <Link to="/dashboard">{username}</Link>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <div className="parentdiv">
            <img src={PostImg} className="circular-image" alt="Friends" />
            <div className="childText">
            <Link to="/userPosts">My Posts</Link>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <div className="parentdiv">
            <img src={MyProfile} className="circular-image" alt="Friends" />
            <div className="childText">
            <Link to="/profile">My Profile</Link>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <div className="parentdiv">
            <img src={FriendsImg} className="circular-image" alt="Friends" />
            <div className="childText">
            <Link to="/friends">Friends</Link>
            </div>
          </div>
        </li>
        
        
      </ul>
    </div>
  );
};

export default Sidebar;
