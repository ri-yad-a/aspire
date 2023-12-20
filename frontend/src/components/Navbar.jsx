import React from "react";
import "../styles/Navbar.css";
import { useContext, useState   } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({type}) => {

  const {logout, adminLogout} = useContext(AuthContext);

  const navigate = useNavigate();

  const [err, setError] = useState(null);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const authLogout = async (e) => {
    e.preventDefault();
    try {
      await adminLogout();
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  if (type === 'admin') {
    console.log(type);
    return (
      <header>
        <nav className="navbar">
          <div className="navbar-logo">ASPIRE</div>
          <ul className="nav-links hidden">
            <li>
            </li>
            <li>
            </li>
            <li>
            </li>
          </ul>
          <div className="navbar-last">
            <div className="profile-btn hidden">
              <Link to="/profile">Profile</Link>
            </div>
            <div onClick={authLogout} className="logout-btn">Logout</div>
          </div>
        </nav>
      </header>);
  } else {
    return (
      <header>
        <nav className="navbar">
          <div className="navbar-logo">ASPIRE</div>
          <ul className="nav-links">
            <li>
              <Link to="/applications">Applications</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            {/* <li><Link to="/applications">ASPIRE</Link></li> */}
            <li>
              <Link to="/interviews">Interviews</Link>
            </li>
            {/* <li><Link to="/profile">Profile</Link></li> */}
          </ul>
          <div className="navbar-last">
            <div className="profile-btn">
              <Link to="/profile">Profile</Link>
            </div>
            <div onClick={handleLogout} className="logout-btn">Logout</div>
          </div>
        </nav>
      </header>);
  }

  
  
};

export default Navbar;
