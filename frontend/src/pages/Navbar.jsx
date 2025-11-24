// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../css/Navbar.css';
//  const [showLoginOptions, setShowLoginOptions] = useState(false);

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem('role');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     navigate('/');
//   };

//   const publicLinks = [
//     { to: '/', label: 'Home' },
//     { to: '/dictionary', label: 'Dictionary' },
//     { to: '/LoginForm', label: 'Login' },
//     { to: '/signup', label: 'Sign Up' },
    
//   ];

//   // User dashboard links
//   const userLinks = [
//     { to: '/user-dashboard', label: 'Dashboard' },
//     { to: '/main', label: 'Connect Lawyers' },
//     { to: '/upload', label: 'Analyze Docs' },
//     { to: '/case-category', label: 'LegalTemplates' },
//     { to: '/blogs', label: 'Blogs' },
//     { to: '/dictionary', label: 'Dictionary' },
//     { to: '/user-profile', label: 'My Profile' },
//   ];

//   // Lawyer dashboard links
//   const lawyerLinks = [
//     { to: '/lawyer-dashboard', label: 'Dashboard' },
//     { to: '/lawyer/consultations', label: 'My Consultations' },
//     { to: '/upload', label: 'Analyze Docs' },
//     { to: '/case-category', label: 'LegalTemplates' },
//     { to: '/blogs', label: 'Blogs' },
//     { to: '/dictionary', label: 'Dictionary' },
//     { to: '/profile', label: 'My Profile' },
//   ];

//   // Choose which set to render
//   let linksToRender = publicLinks;
//   if (token && role === 'user')   linksToRender = userLinks;
//   if (token && role === 'lawyer') linksToRender = lawyerLinks;

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <Link to="/">Legal Connect</Link>
//       </div>

//       <ul className="navbar-links">
//         {linksToRender.map(({ to, label }) => (
//           <li key={to}>
//             <Link to={to}>{label}</Link>
//           </li>
//         ))}
//        {/* LOGIN DROPDOWN (only if not logged in) */}
//         {!token && (
//           <li
//             className="login-dropdown"
//             onClick={() => setShowLoginOptions(!showLoginOptions)}
//           >
//             <span className="login-button">Login ▼</span>

//             {showLoginOptions && (
//               <div className="dropdown-menu">
//                 <button onClick={() => navigate('/LoginForm')}>User Login</button>
//                 <button onClick={() => navigate('/admin-login')}>Admin Login</button>
//               </div>
//             )}
//           </li>
//         )}
//         {token && (
//           <li>
//             <button className="logout-button" onClick={handleLogout}>
//               Logout
//             </button>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/dictionary', label: 'Dictionary' },
    { to: '/signup', label: 'Sign Up' },
  ];

  const userLinks = [
    { to: '/user-dashboard', label: 'Dashboard' },
    { to: '/main', label: 'Connect Lawyers' },
    { to: '/upload', label: 'Analyze Docs' },
    { to: '/case-category', label: 'LegalTemplates' },
    { to: '/blogs', label: 'Blogs' },
    { to: '/dictionary', label: 'Dictionary' },
    { to: '/user-profile', label: 'My Profile' },
  ];

  const lawyerLinks = [
    { to: '/lawyer-dashboard', label: 'Dashboard' },
    { to: '/lawyer/consultations', label: 'My Consultations' },
    { to: '/upload', label: 'Analyze Docs' },
    { to: '/case-category', label: 'LegalTemplates' },
    { to: '/blogs', label: 'Blogs' },
    { to: '/dictionary', label: 'Dictionary' },
    { to: '/profile', label: 'My Profile' },
  ];

  let linksToRender = publicLinks;
  if (token && role === 'user') linksToRender = userLinks;
  if (token && role === 'lawyer') linksToRender = lawyerLinks;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Legal Connect</Link>
      </div>

      <ul className="navbar-links">

        {/* Render all default links */}
        {linksToRender.map(({ to, label }) => (
          <li key={to}>
            <Link to={to}>{label}</Link>
          </li>
        ))}

        {/* LOGIN DROPDOWN (only if not logged in) */}
        {!token && (
          <li
            className="login-dropdown"
            onClick={() => setShowLoginOptions(!showLoginOptions)}
          >
            <span className="login-button">Login ▼</span>

            {showLoginOptions && (
              <div className="dropdown-menu">
                <button onClick={() => navigate('/LoginForm')}>User Login</button>
                <button onClick={() => navigate('/admin-login')}>Admin Login</button>
              </div>
            )}
          </li>
        )}

        {/* Logout button if logged in */}
        {token && (
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

