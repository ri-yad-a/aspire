import React, { useEffect } from 'react';
import '../index.css';
// import '../styles/AdminDashboard.css'; not set up yet
import Table from './Table';
import Modal from './Modal';
import { useState, useContext } from "react";
import axios from 'axios';
import { AuthContext } from "../context/authContext";


function AdminDashboard() {
  const {currentUser} = useContext(AuthContext);
  const [rows, setRows] = useState([]);

  const [err, setError] = useState(null);

  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("/users/all", {});
      setUsers(res.data);
    } catch (err){
      setError(err.response);
    } 
  };

  useEffect(() => {
    fetchData();
  }, [currentUser.email])

  useEffect(() => {
    setRows(users);
  }, [users]);


  const handleDeleteRow = async (targetIndex) => {
    deleteUserData(targetIndex);
    console.log(rows[targetIndex]);
    try {
      await axios.delete("/users/delete", {
        params: {
          email: rows[targetIndex].email,
        }
      });
    } catch (err2) {
      setError(err2.response.data);
    }
    console.log(rows[targetIndex]);
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const deleteUserData = async (targetIndex) => {
    // delete applications
    const deleteApps = await axios.delete("/applications/delete", {});

    // delete interviews
    const deleteInterviews = await axios.delete("/interviews/delete", {});

    // delete interview questions
    const deleteInterviewQs = await axios.delete("/interviews/questions/delete", {});

    // delete jobs
    const deleteJobs = await axios.delete("/jobs/delete", {});

    // delete documents
    const deleteDocs = await axios.delete("/users/pdf", {});

  };

  const errorStyle = {
    color: 'red',
  };
  
  return (
    <div className="interviews">
      <h1 className="welcome">Admin Dashboard</h1>
      <Table rows={rows} deleteRow={handleDeleteRow} deleteData={deleteUserData} type={"adminDashboard"}/>
      {err && <p style={errorStyle}>{err}</p>}
    </div>
  );
}

export default AdminDashboard;