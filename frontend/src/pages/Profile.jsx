import React, { useContext, useState, useEffect } from 'react';
import '../index.css';
import '../styles/Profile.css';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import Table from './Table';

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

  const fetchPDFData = async () => {
    try {
      const res = await axios.get("/users/upload", {
        params: {
          email: currentUser.currentUser.email,
        }
      });
      setRows(res.data);
    } catch (err){
      console.error(err.response);
    }
  }

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
    fetchPDFData();
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

  const handlePDFInfoChange = (e) => {
    setPDFInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(pdfInputs);
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
          console.log(new Date().toLocaleString() + "");
          var filenameField = document.getElementById("filename-field");
          var sizeField = document.getElementById("size-field");
          filenameField.value = selectedFile.name;
          sizeField.value = selectedFile.size + " bytes";
          pdfInputs.filename = selectedFile.name;
          pdfInputs.size = selectedFile.size + " bytes";
        }
      }
      else {
        setPDFFile(null);
      }
    }
  }

  const [pdfInputs, setPDFInputs] = useState({
    email: currentUser.currentUser.email,
    title: "",
    filename: "",
    file: pdfFile,
    description: "",
    type: "resume",
    uploadDate: "",
    uploadTime: "",
    id: 0,
    size: "",
  });
  const uploadPDF = async () => {
    try {
      var dateString = new Date().toLocaleDateString();
      // Split the date string into an array of components
      var dateComponents = dateString.split('/'); // Adjust the delimiter based on your locale
      // Rearrange the components to the desired format (YYYY-MM-DD)
      pdfInputs.uploadDate = dateComponents[2] + '-' + dateComponents[0].padStart(2, '0') + '-' + dateComponents[1].padStart(2, '0');
      var timeString = new Date().toLocaleTimeString();
      // Split the time string into an array of components
      var timeComponents = timeString.split(" ")[0].split(':');
      // Rearrange the components to the desired format (HH:mm:ss)
      pdfInputs.uploadTime = timeComponents[0].padStart(2, '0') + ':' + timeComponents[1].padStart(2, '0') + ':' + timeComponents[2].padStart(2, '0');
      pdfInputs.file = pdfFile;
      const res = await axios.post("/users/upload", pdfInputs);
    } catch (err){
      console.error(err.response);
    }
  }

  const viewRowPDF = async (idx) => {
    try {
      const response = await axios.get("/users/pdf", {
        params: {
          id: rows[idx].id,
        },
      });
      setPDFFile(response.data[0].file);
      setViewPDF(response.data[0].file);
    } catch (error) {
      console.error(error);
    }
  };
  

  const downloadPDF = async (idx) => {
    try {
      const response = await axios.get("/users/pdf", {
        params: {
          id: rows[idx].id,
        },
      });
      console.log(response.data[0].file)
      var link = document.createElement("a");
      // If you don't know the name or want to use
      // the webserver default set name = ''
      link.setAttribute('download', rows[idx].filename);
      link.href = response.data[0].file;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
    }
  }

  const handlePDFSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      uploadPDF();
      handleSubmit(pdfInputs);
      fetchPDFData();
      var filenameField = document.getElementById("filename-field");
      var sizeField = document.getElementById("size-field");
      var descriptionField = document.getElementById("description-field");
      var titleField = document.getElementById("title-field");
      var fileField = document.getElementById("fileInput");
      var typeField = document.getElementById("type");
      filenameField.value = "";
      sizeField.value = "";
      descriptionField.value = "";
      titleField.value = "";
      fileField.value = "";
      typeField.value = "resume";
    }
    else {
      setViewPDF(null);
    }
  }

  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = async (targetIndex) => {
    try {
      const res1 = await axios.delete("/users/upload", {
        params: {
          id: rows[targetIndex].id,
        }
      });
    } catch (err2) {
      console.error(err2.response.data);
    }
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

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
            onChange={handleChange}
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
      <form onSubmit={handlePDFSubmit}>
        <p>Select Document to view here.</p>
        <Table rows={rows} deleteRow={handleDeleteRow} type={"documents"} viewRowPDF={viewRowPDF} downloadRowPDF={downloadPDF}/>
        <p>Upload New Document here.</p>
        <input type="file" accept='application/pdf' onChange={handlePDFChange} id="fileInput" required/>
        <input id="title-field"
          type="text"
          placeholder="Document Title"
          name="title"
          required
          onChange={handlePDFInfoChange}
        />
        <input id="filename-field"
          type="text"
          placeholder="File Name"
          name="filename"
          readOnly
          required
        />
        <input id="size-field"
          type="text"
          placeholder="File Size"
          name="size"
          readOnly
          required
        />
        <textarea id="description-field"
          type="text"
          placeholder="Description"
          name="description"
          required
          onChange={handlePDFInfoChange}
        />
        <select name="type" id="type" onChange={handlePDFInfoChange}>
          <option value="resume">Resume</option>
          <option value="cover-letter">Cover Letter</option>
          <option value="transcript">Transcript</option>
          <option value="other">Other</option>
        </select>
        <button id='upload-button' type='submit'>Add Document</button>
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
