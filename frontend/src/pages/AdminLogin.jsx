import React, { useState } from "react";
import '../index.css';
import '../styles/SignInUp.css';
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const AdminLogin = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { adminLogin } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminLogin(inputs);
      navigate("/adminDashboard");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const linkStyle = {
    margin: "5px",
    backgroundColor: 'white',
    color: 'black',
  };

  return (
    <div className="login-signup">
    <div className="intro-pane">
      <h1><i>ASPIRE</i></h1>
      <p>Application for Job Seekers</p>
      <p>Admin Dashboard</p>
    </div>
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't have an admin account? <Link style={linkStyle} to="/">Login</Link>
        </span>
      </form>
    </div>
    </div>
    
  );
};

export default AdminLogin;