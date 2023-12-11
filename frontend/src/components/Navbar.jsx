import React from "react";
import "../styles/Navbar.css";
import { useContext, useState   } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const {logout} = useContext(AuthContext);

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
        <div className="navbar-profile">
          <div>
            <Link to="/profile">Profile</Link>
          </div>
          <div onClick={handleLogout}>Logout</div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
