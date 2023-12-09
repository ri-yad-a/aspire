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
  //     {
  //       jobTitle: "Software Engineer Intern 2024",
  //       company: "jobs[0].company_name",
  //       jobDescription: "This is the main page of the website",
  //       dateUploaded: "02-16-2004",
  //       status: "accepted",
  //     }
  // ]);

  const [jobs, setJobs] = useState([]); // array of jobs
  useEffect(() => {
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
    fetchData();
  },[])

  // Use another useEffect to watch for changes in the jobs state
  useEffect(() => {
    // Code that depends on the updated jobs state
    setRows(jobs);
    console.log(jobs);
  }, [jobs]); // Add jobs as a dependency


  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
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
