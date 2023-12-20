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

  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("/users", {});
      setUsers(res.data);
    } catch (err){
      console.error(err.response);
    } 
  };

  useEffect(() => {
    fetchData();
  }, [currentUser.email])

  useEffect(() => {
    setRows(users);
  }, [users]);


  const handleDeleteRow = async (targetIndex) => {
    console.log(rows[targetIndex]);
    try {
      const res1 = await axios.delete("/users", {
        params: {
          id: rows[targetIndex].id,
        }
      });
    } catch (err2) {
      console.error(err2.response.data);
    }
    console.log(rows[targetIndex]);
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };
  

  return (
    <div className="interviews">
      <h1 className="welcome">{currentUser.username}'s Admin Dashboard</h1>
      <Table rows={rows} deleteRow={handleDeleteRow} type={"adminDashboard"}/>
    </div>
  );
}

export default AdminDashboard;