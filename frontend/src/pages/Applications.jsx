import React, { useEffect } from 'react';
import '../index.css';
import '../styles/Interviews.css';
import Table from './Table';
import Modal from './Modal';
import { useState, useContext } from "react";
import axios from 'axios';
import { AuthContext } from "../context/authContext";


function Applications() {
  const {currentUser} = useContext(AuthContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const [applications, setApplications] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("/applications", {
        params: {
          email: currentUser.email,
        }
      });
      setApplications(res.data);
    } catch (err){
      console.error(err.response);
    } 
  };

  useEffect(() => {
    fetchData();
  }, [currentUser.email])

  useEffect(() => {
    setRows(applications);
  }, [applications]);

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = async (targetIndex) => {
    console.log(rows[targetIndex]);
    try {
      const res1 = await axios.delete("/applications", {
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
        const res = await axios.post("/applications", { ...newRow, email: currentUser.email });
      } else {
        const res = await axios.post("/applications", { ...newRow, email: currentUser.email, id: 0 });
      }
      
      fetchData();
    } catch (err) {
      if (err.response.status === 409) {
        try {
          const res1 = await axios.put("/applications", { ...newRow, email: currentUser.email });
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