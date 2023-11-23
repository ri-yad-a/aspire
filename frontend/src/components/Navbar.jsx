import React from 'react';
import "../styles/Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <nav className='navbar'>
        <ul className='nav-links'>
          <li><Link to="/applications">Applications</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          <li><Link to="/applications">ASPIRE</Link></li>
          <li><Link to="/interviews">Interviews</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar;
