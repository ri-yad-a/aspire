import React from 'react';
import "../styles/Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <nav className='navbar'>
        <div className='navbar-logo'>ASPIRE</div>
        <ul className='nav-links'>
          <li><Link to="/applications">Applications</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          {/* <li><Link to="/applications">ASPIRE</Link></li> */}
          <li><Link to="/interviews">Interviews</Link></li>
          {/* <li><Link to="/profile">Profile</Link></li> */}
        </ul>
        <div className='navbar-profile'><Link to="/profile">Profile</Link></div>
      </nav>
    </header>
  )
}

export default Navbar;