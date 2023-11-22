import React from 'react';
import '../index.css';
import '../styles/SignInUp.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

const Register = () => {
  // const [inputs, setInputs] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  // });
  // const [err, setError] = useState(null);

  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("/auth/register", inputs);
  //     navigate("/login");
  //   } catch (err) {
  //     setError(err.response.data);
  //   }
  // };

  return (
    <div className="login-signup">
    <div className="intro-pane">
      <h1><i>ASPIRE</i></h1>
      <p>Application for Job Seekers</p>
    </div>
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          // onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          // onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          // onChange={handleChange}
        />
        <button /*onClick={handleSubmit}*/>Register</button>
        {/* {err && <p>{err}</p>} */}
        <span>
          Do you have an account? <Link to="/">Login</Link>
        </span>
      </form>
    </div>
    </div>
  );
};

export default Register;

