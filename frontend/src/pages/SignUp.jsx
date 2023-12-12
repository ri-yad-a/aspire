import React from 'react';
import '../index.css';
import '../styles/SignInUp.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    fname:"",
    lname:"",
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", inputs);
      console.log(res);
      navigate("/");
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
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
      <input
          required
          type="text"
          placeholder="First Name"
          name="fname"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="Last Name"
          name="lname"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
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
        <button type="submit">Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link style={linkStyle} to="/">Login</Link>
        </span>
      </form>
    </div>
    </div>
  );
};

export default Register;

