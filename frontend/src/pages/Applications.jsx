import React from 'react';
import '../index.css';
import '../styles/Interviews.css';
import Table from './Table';
import Modal from './Modal';
import { useState } from "react";


function Applications() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      jobTitle: "Software Engineer Intern 2024",
      company: "Google",
      documents: "Link to documents",
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
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} type={"applications"}/>
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
          type={"applications"}
        />
      )}
    </div>
  );
}

export default Applications;
