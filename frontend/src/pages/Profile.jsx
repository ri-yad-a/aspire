import React from 'react';
import '../index.css';
import '../styles/Profile.css';

import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="profile">
    <div className="left-pane">
      <h1>Personal Information</h1>
      <form>
        <input
          type="text"
          placeholder="Name"
          name="username"
          // onChange={handleChange}
        />
        <div className="aspiring">
          <p>Aspiring</p>
          <input
            type="text"
            placeholder="Profession"
            name="profession"
            // onChange={handleChange}
          />
        </div>
        <input
          type="password"
          placeholder="password"
          name="password"
          // onChange={handleChange}
        />
        <button /*onClick={handleSubmit}*/>Edit Information</button>
        {/* {err && <p>{err}</p>} */}
        <span>
          Don't have an account yet? <Link to="/signUp">Sign Up</Link>
        </span>
      </form>
    </div>
    </div>
    
  );
}

export default Profile;
