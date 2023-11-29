import React from 'react';
import '../index.css';
import '../styles/Profile.css';

import { Link } from "react-router-dom";
import { useState } from 'react';

const Profile = () => {

  const [isEditable, setIsEditable] = useState(true);

  const handleButtonClick = (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);

    var nameField = document.getElementById("name-field");
    var passwordField = document.getElementById("password-field");
    var emailField = document.getElementById("email-field"); 
    var usernameField = document.getElementById("username-field");
    var professionField = document.getElementById("profession-field");
    if (isEditable) {
      nameField.readOnly = false;
      passwordField.readOnly = false;
      emailField.readOnly = false;
      usernameField.readOnly = false;
      professionField.readOnly = false;
    } else {
      nameField.readOnly = true;
      passwordField.readOnly = true;
      emailField.readOnly = true;
      usernameField.readOnly = true;
      professionField.readOnly = true;
    }
  }

    // var nameField = document.getElementById("name-field");
    // if (nameField.readOnly === true) {
    //   
    // } else {
    //   
    // }
    // var button = document.getElementById("editBtn");
    // if (button.innerHTML === "Edit Information") {
    //   button.innerHTML = "Cancel";
    // } else {
    //   button.innerHTML = "Edit Information";
    // }

  return (
    <div className="profile">
    <div className="left-pane">
      <h1>Personal Information</h1>
      <form>
        <input id="name-field"
          type="text"
          placeholder="Name"
          name="username"
          readOnly
          // onChange={handleChange}
        />
        <div className="aspiring">
          <p>Aspiring</p>
          <input id="profession-field"
            type="text"
            placeholder="Profession"
            name="profession"
            readOnly
            // onChange={handleChange}
          />
        </div>
        <div className="aspiring">
          <p>Email:</p>
          <input id="email-field"
            type="text"
            placeholder="Email"
            name="email"
            readOnly
            // onChange={handleChange}
          />
        </div>
        <div className="aspiring">
          <p>Username:</p>
          <input id="username-field"
            type="text"
            placeholder="Username"
            name="username"
            readOnly
            // onChange={handleChange}
          />
        </div>
        <div className="aspiring">
        <p>Password: </p>
          <input id="password-field"
            type="password"
            placeholder="Password"
            name="password"
            readOnly
            // onChange={handleChange}
          />
        </div>
          <button onClick={handleButtonClick}>{isEditable ? "Edit Information" : "Save Information"}</button>
      </form>
    </div>
    </div>
    
  );
}

export default Profile;
