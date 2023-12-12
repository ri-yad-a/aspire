import React, { useState } from "react";
import '../index.css';
import '../styles/SignInUp.css';
import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/jobs");
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
          Don't have an account yet? <Link style={linkStyle} to="/signUp">Sign Up</Link>
        </span>
      </form>
    </div>
    </div>
    
  );
};

export default Login;
