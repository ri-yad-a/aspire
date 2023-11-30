import React from 'react';
import '../index.css';
import '../styles/Profile.css';

import { useState } from 'react';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const Profile = () => {

  const [isEditable, setIsEditable] = useState(true);
  const buttonClass = isEditable ? "edit-button" : "save-button";

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
          <button id={buttonClass} onClick={handleButtonClick}>{isEditable ? "Edit Information" : "Save Information"}</button>
      </form>
    </div>

    <div className='right-pane'>
      <h1>Documents</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept='application/pdf' onChange={handlePDFChange}/>
        <button type='submit'>Upload</button>
        <div className="pdf-container">
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
            {viewPDF && <>
              <Viewer fileUrl={viewPDF} plugins={[newplugin]} />
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
