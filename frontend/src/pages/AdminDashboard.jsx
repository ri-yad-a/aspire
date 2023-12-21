import React, { useEffect } from 'react';
import '../index.css';
// import '../styles/AdminDashboard.css'; not set up yet
import Table from './Table';
import Modal from './Modal';
import { useState, useContext } from "react";
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";


function AdminDashboard() {
  const {currentUser, adminLogout} = useContext(AuthContext);
  const [rows, setRows] = useState([]);

  const [err, setError] = useState(null);

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {

    try {
      const yes = await axios.get("/admin/checkAdmin", {
        params: {
          email: currentUser.email,
        }
      });
      setError(yes.data)
    } catch (error) {
      console.log("Cannot login as non-admin user")
      await adminLogout();
      navigate("/")
    }

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
    try {
      await axios.delete("/users/delete", {
        params: {
          email: rows[targetIndex].email,
        }
      });
    } catch (err2) {
      setError(err2.response.data);
    }
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const deleteUserData = async (targetIndex) => {
    let errToReturn = "";
    // delete applications
    try {
      await axios.delete("/applications/delete", {
        params: {
          email: rows[targetIndex].email,
        }
      });
    } catch (error) {
      errToReturn += error.response;
    }

    // delete interviews
    try {
      await axios.delete("/interviews/delete", {
        params: {
          email: rows[targetIndex].email,
        }
      });
    } catch (error) {
      errToReturn += error.response;
    }

    // delete interview questions
    try {
      await axios.delete("/interviews/questions/delete", {
        params: {
          email: rows[targetIndex].email,
        }
      });
    } catch (error) {
      errToReturn += error.response;
    }

//     // delete jobs
    try {
      await axios.delete("/jobs/delete", {
        params: {
          email: rows[targetIndex].email,
        }
      });
    } catch (error) {
      errToReturn += error.response;
    }

    // delete documents
    try {
      await axios.delete("/users/pdf", {
        params: {
          email: rows[targetIndex].email,
        }
      });
    } catch (error) {
      errToReturn += error.response;
    }

    setError(errToReturn !== '' ? errToReturn : 'Data deleted successfully for user ' + rows[targetIndex].username);
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