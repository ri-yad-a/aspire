import React, { useContext, useState, useEffect } from 'react';
import '../index.css';
import '../styles/Profile.css';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const Profile = () => {

  const currentUser = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    email: currentUser.currentUser.email,
  });
  const fetchData = async () => {
    try {
      const res = await axios.get("/users", {
        params: {
          email: currentUser.currentUser.email,
        }
      });
      setInputs(res.data[0]);
    } catch (err){
      console.error(err.response);
    }
  };

  const updateInfo = async () => {
    try {
      const res = await axios.put("/users", inputs);
    } catch (err){
      console.error(err.response);
    }
  };

  // initial fetch
  useEffect(() => {
    fetchData();
  },[currentUser.currentUser.email])

  // Use another useEffect to watch for changes in the userInfo state
  useEffect(() => {
    // Code that depends on the updated userInfo state
    setInputs(inputs);
    var fnameField = document.getElementById("fname-field");
    var lnameField = document.getElementById("lname-field");
    var passwordField = document.getElementById("password-field");
    var emailField = document.getElementById("email-field"); 
    var usernameField = document.getElementById("username-field");
    var professionField = document.getElementById("profession-field");
    fnameField.value = inputs.fname;
    lnameField.value = inputs.lname;
    passwordField.value = inputs.password;
    emailField.value = inputs.email;
    usernameField.value = inputs.username;
    professionField.value = inputs.profession;
  }, [inputs]); // Add userInfo as a dependency

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const [isEditable, setIsEditable] = useState(true);
  const buttonClass = isEditable ? "edit-button" : "save-button";

  const handleButtonClick = (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);

    var fnameField = document.getElementById("fname-field");
    var lnameField = document.getElementById("lname-field");
    var passwordField = document.getElementById("password-field");
    var usernameField = document.getElementById("username-field");
    var professionField = document.getElementById("profession-field");
    if (isEditable) {
      fnameField.readOnly = false;
      lnameField.readOnly = false;
      passwordField.readOnly = false;
      usernameField.readOnly = false;
      professionField.readOnly = false;
    } else {
      fnameField.readOnly = true;
      lnameField.readOnly = true;
      passwordField.readOnly = true;
      usernameField.readOnly = true;
      professionField.readOnly = true;

      // update database
      updateInfo();
    }
  }

  const [pdfFile, setPDFFile] = useState(null);
  const [viewPDF, setViewPDF] = useState(null);

  const fileType = ['application/pdf'];
  const handlePDFChange = (e) => { 
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          setPDFFile(e.target.result);
        }
      }
      else {
        setPDFFile(null);
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPDF(pdfFile);
    }
    else {
      setViewPDF(null);
    }
  }

  const newplugin = defaultLayoutPlugin();

  return (
    <div className="profile">
    <div className="left-pane">
      <h1>Personal Information</h1>
      <form>
      <div className="aspiring">
        <input id="fname-field"
          type="text"
          placeholder="fname"
          name="fname"
          readOnly
          onChange={handleChange}
        />
        <input id="lname-field"
          type="text"
          placeholder="lname"
          name="lname"
          readOnly
          onChange={handleChange}
        />
        </div>
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
            onChange={handleChange}
          />
        </div>
        <div className="aspiring">
        <p>Password: </p>
          <input id="password-field"
            type="password"
            placeholder="Password"
            name="password"
            readOnly
            onChange={handleChange}
          />
        </div>
          <button id={buttonClass} onClick={handleButtonClick}>{isEditable ? "Edit Information" : "Save Information"}</button>
      </form>
    </div>

    <div className='right-pane'>
      <h1>Documents</h1>
      <form onSubmit={handleSubmit}>
        <p>Select Document to view here.</p>
        <input type="file" accept='application/pdf' onChange={handlePDFChange}/>
        <button id='upload-button' type='submit'>Upload</button>
        <div className="pdf-container">
        <Worker workerUrl='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'>
            {viewPDF && <>
              <Viewer theme='auto' fileUrl={viewPDF} plugins={[newplugin]} />
            </>}
            {!viewPDF && <>Please select a PDF to view.</>}
            
          </Worker>
        </div>
      </form>

    </div>

    </div>
    
  );
}

// notes: change panel style, add profile picture, do not allow empty fields

export default Profile;
