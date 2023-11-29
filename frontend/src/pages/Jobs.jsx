import React from 'react';
import '../index.css';
import '../styles/Interviews.css';
import Table from './Table';
import Modal from './Modal';
import { useState } from "react";


function Jobs() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      jobTitle: "Software Engineer Intern 2024",
      company: "Google",
      jobDescription: "This is the main page of the website",
      dateUploaded: "02-16-2004",
      status: "accepted",
    }
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
