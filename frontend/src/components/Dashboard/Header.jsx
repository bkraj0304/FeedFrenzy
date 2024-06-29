// import React from 'react';
// import '../Styles/Header.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { useNavigate } from 'react-router-dom';
// import ls from "local-storage";

// const Header = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear Local Storage
//     ls.clear(); 
//     // Perform any logout operations here

//     navigate('/');
//   }



//   return (
//     <nav className="navbar navbar-expand-lg bg-body-tertiary navbar bg-dark border-bottom border-bottom-dark" style={{ height: '61px' }}>
//       <div className="container-fluid">
//         <a className="navbar-brand" href="http://127.0.0.1:5500/HTML/new_page.html#">FeedFrenzy</a>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarScroll">
//           <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
//             <li className="nav-item">
//               <a className="nav-link active" aria-current="page" href="http://127.0.0.1:5500/HTML/new_page.html#">Home</a>
//             </li>
//           </ul>
//           <form className="d-flex" role="search">
//             <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//             <button className="btn btn-outline-success" type="button" onClick={handleLogout}>Logout</button>
//           </form>
//         </div>
//       </div>
//     </nav>
//   );
// }
// export default Header;
import React from 'react';
import '../Styles/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';
import ls from "local-storage";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear Local Storage
    ls.clear();
    // Perform any logout operations here
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">FeedFrenzy</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
          </ul>
          <form className="d-flex">
            {/*  */}
            <button className="btn btn-outline-success " type="button" onClick={handleLogout}>Logout</button>
            {/* <button className="btn custom-btn" type="button" onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: '#fff', border: '1px solid #dc3545' }}>
  Logout
</button> */}
            {/* <button className="btn custom-btn" type="button" onClick={handleLogout}>
              Logout
            </button> */}


          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />