import React from 'react';
import '../index.css';
import '../styles/Interviews.css';
import InterviewsTable from '../pages/InterviewsTable';
import InterviewsModal from '../pages/InterviewsModal';
import { useState } from "react";


function Interviews() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      jobTitle: "Software Engineer Intern 2024",
      company: "Google",
      time: "10:45am",
      date: "02-16-2004",
      notes: "This is the main page of the website",
      status: "accepted",
    },
    // {
    //   jobTitle: "Software Engineer Intern 2024",
    //   company: "Google",
    //   jobDescription: "This is the main page of the website",
    //   dateUploaded: "02-16-2004",
    //   status: "accepted",
    // },
    // {
    //   jobTitle: "Software Engineer Intern 2024",
    //   company: "Google",
    //   documents: "Link to documents",
    //   status: "accepted",
    // },
  ]);
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
      <InterviewsTable rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} type={"interviews"}/>
      <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button>
      {modalOpen && (
        <InterviewsModal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
          type={"interviews"}
        />
      )}
    </div>
  );
}

export default Interviews;
