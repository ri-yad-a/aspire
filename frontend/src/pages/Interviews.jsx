import React from "react";
import "../index.css";
import "../styles/Interviews.css";
import Table from "./Table";
import Modal from "./Modal";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

function Interviews() {
  const { currentUser } = useContext(AuthContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [questionsModalOpen, setQuestionsModalOpen] = useState(false);

  const [rows, setRows] = useState([]);
  const [questionsRows, setQuestionsRows] = useState([]);

  const [rowToEdit, setRowToEdit] = useState(null);
  const [questionsRowToEdit, setQuestionsRowToEdit] = useState(null);

  const [interviews, setInterviews] = useState([]); // array of interviews
  const [questions, setQuestions] = useState([]); // array of interviewQuestions

  const fetchData = async () => {
    try {
      const res = await axios.get("/interviews", {
        params: {
          email: currentUser.email,
        },
      });
      setInterviews(res.data);
    } catch (err) {
      console.error(err.response);
    }
  };

  const fetchQuestionsData  = async () => {
    try {
      const res = await axios.get("/interviews/questions", {
        params: {
          email: currentUser.email,
        },
      });
      setQuestions(res.data);
    } catch (err) {
      console.error(err.response);
    }
  };

  // initial fetch
  useEffect(() => {
    fetchData();
  }, [currentUser.email]);

  // initial fetch for questions
  useEffect(() => {
    fetchQuestionsData();
  }, [currentUser.email]);

  // Use another useEffect to watch for changes in the interviews state
  useEffect(() => {
    // Code that depends on the updated interviews state
    setRows(interviews);
  }, [interviews]); // Add interviews as a dependency

  // Use another useEffect to watch for changes in the questions state
  useEffect(() => {
    // Code that depends on the updated questions state
    setQuestionsRows(questions);
  }, [questions]); // Add questions as a dependency

  const handleDeleteRow = async (targetIndex) => {
    console.log(rows[targetIndex]);
    try {
      const res1 = await axios.delete("/interviews", {
        params: {
          id: rows[targetIndex].id,
        },
      });
    } catch (err2) {
      console.error(err2.response.data);
    }
    console.log(rows[targetIndex]);
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleDeleteQuestionsRow = async (targetIndex) => {
    console.log(questionsRows[targetIndex]);
    try {
      const res1 = await axios.delete("/interviews/questions", {
        params: {
          id: questionsRows[targetIndex].id,
        },
      });
    } catch (err2) {
      console.error(err2.response.data);
    }
    console.log(questionsRows[targetIndex]);
    setQuestionsRows(questionsRows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleEditQuestionsRow = (idx) => {
    setQuestionsRowToEdit(idx);
    setQuestionsModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    console.log({ ...newRow, email: currentUser.email });
    try {
      if (Object.hasOwn(newRow, "id")) {
        const res = await axios.post("/interviews", {
          ...newRow,
          email: currentUser.email,
        });
      } else {
        const res = await axios.post("/interviews", {
          ...newRow,
          email: currentUser.email,
          id: 0,
        });
      }

      fetchData();
    } catch (err) {
      if (err.response.status === 409) {
        try {
          const res1 = await axios.put("/interviews", {
            ...newRow,
            email: currentUser.email,
          });
        } catch (err2) {
          console.error(err2.response);
        }
      } else {
        console.error(err.response);
      }
    }
    console.log(newRow);
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };


  const handleQuestionsSubmit = async (newRow) => {
    console.log({ ...newRow, email: currentUser.email });
    try {
      if (Object.hasOwn(newRow, "id")) {
        const res = await axios.post("/interviews/questions", {
          ...newRow,
          email: currentUser.email,
        });
      } else {
        const res = await axios.post("/interviews/questions", {
          ...newRow,
          email: currentUser.email,
          id: 0,
        });
        console.log(res.data)
      }

      fetchQuestionsData();
    } catch (err) {
      if (err.response.status === 409) {
        try {
          const res1 = await axios.put("/interviews/questions", {
            ...newRow,
            email: currentUser.email,
          });
        } catch (err2) {
          console.error(err2.response);
        }
      } else {
        console.error(err.response);
      }
    }
    console.log(newRow);
    questionsRowToEdit === null
      ? setQuestionsRows([...questionsRows, newRow])
      :setQuestionsRows(
        questionsRows.map((currRow, idx) => {
            if (idx !== questionsRowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <div className="interviews">
      <h1 className="welcome">{currentUser.username}'s Interviews</h1>
      <Table
        rows={rows}
        deleteRow={handleDeleteRow}
        editRow={handleEditRow}
        type={"interviews"}
      />
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
          type={"interviews"}
        />
      )}
      <h1 className="welcome">{currentUser.username}'s Interview Questions</h1>
      <Table
        rows={questionsRows}
        deleteRow={handleDeleteQuestionsRow}
        editRow={handleEditQuestionsRow}
        type={"interviewQuestions"}
      />
      <button onClick={() => setQuestionsModalOpen(true)} className="btn">
        Add
      </button>
      {questionsModalOpen && (
        <Modal
          closeModal={() => {
            setQuestionsModalOpen(false);
            setQuestionsRowToEdit(null);
          }}
          onSubmit={handleQuestionsSubmit}
          defaultValue={questionsRowToEdit !== null && questionsRows[questionsRowToEdit]}
          type={"interviewQuestions"}
        />
      )}
    </div>
  );
}

export default Interviews;
