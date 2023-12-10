import React, { useEffect } from 'react';
import '../index.css';
import '../styles/Interviews.css';
import Table from './Table';
import Modal from './Modal';
import { useState, useContext } from "react";
import axios from 'axios';
import { AuthContext } from "../context/authContext";


function Jobs() {
  const {currentUser} = useContext(AuthContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const [jobs, setJobs] = useState([]); // array of jobs

  const fetchData = async () => {
    try {
      const res = await axios.get("/jobs", {
        params: {
          email: currentUser.email,
        }
      });
      setJobs(res.data);
    } catch (err){
      console.error(err.message);
    }
  };
  // initial fetch
  useEffect(() => {
    fetchData();
  },[currentUser.email])

  // Use another useEffect to watch for changes in the jobs state
  useEffect(() => {
    // Code that depends on the updated jobs state
    setRows(jobs);
  }, [jobs]); // Add jobs as a dependency

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = async (targetIndex) => {
    console.log(rows[targetIndex]);
    try {
      const res1 = await axios.delete("/jobs", {
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

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    console.log({ ...newRow, email: currentUser.email })
    try {
      if (Object.hasOwn(newRow, "id")) {
        const res = await axios.post("/jobs", { ...newRow, email: currentUser.email });
      } else {
        const res = await axios.post("/jobs", { ...newRow, email: currentUser.email, id: 0 });
      }
      
      fetchData();
    } catch (err) {
      if (err.response.status === 409) {
        try {
          const res1 = await axios.put("/jobs", { ...newRow, email: currentUser.email });
        } catch (err2) {
          console.error(err2.response.data);
        }
      } else {
        console.error(err.response.data);
      }
      
    }
    console.log(newRow)
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <div className="interviews">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} type={"jobs"}/>
      <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
          type={"jobs"}
        />
      )}
    </div>
  );
}

export default Jobs;
