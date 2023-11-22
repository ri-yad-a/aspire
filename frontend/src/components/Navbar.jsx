import React from 'react';
import "../styles/Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <nav>
        <ul>
          <li><Link to="/applications">Applications</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          <li><p>ASPIRE</p></li>
          <li><Link to="/interviews">Interviews</Link></li>
          <li>Profile</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;
