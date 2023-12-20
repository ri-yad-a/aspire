import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import "../styles/Modal.css";
import { AuthContext } from "../context/authContext";

const InterviewsModal = ({ closeModal, onSubmit, defaultValue, type }) => {
  let initialState;

  const {currentUser} = useContext(AuthContext);

  if (type === "interviews") {
    initialState = defaultValue || {
      jobTitle: "",
      company: "",
      time: "",
      date: "",
      notes: "",
      status: "accepted",
    };
  } else if (type === "interviewQuestions") {
    initialState = defaultValue || {
      question: "",
      answer: "",
      notes: "",
      questionType: "technical",
    };
  } else if (type === "jobs") {
    initialState = defaultValue || {
      jobTitle: "",
      company: "",
      jobDescription: "",
      dateUploaded: "",
      status: "accepted",
    };
  } else {
    initialState = defaultValue || {
      title: "",
      company: "",
      notes: "",
      dateUploaded: "",
      status: "accepted",
      document_name: "None",
    };
  }

  const [formState, setFormState] = useState(initialState);

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      (type === "interviews" &&
        formState.jobTitle &&
        formState.company &&
        formState.time &&
        formState.date &&
        formState.notes &&
        formState.status) ||
      (type === "interviewQuestions" &&
      formState.question &&
      formState.answer &&
      formState.notes &&
      formState.questionType) ||
      (type === "jobs" &&
        formState.jobTitle &&
        formState.company &&
        formState.jobDescription &&
        formState.dateUploaded.substring(0, 10) &&
        formState.status) ||
      (type === "applications" &&
        formState.title &&
        formState.company &&
        formState.notes &&
        formState.dateUploaded.substring(0, 10) &&
        formState.status &&
        formState.document_name)
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  const setDocumentsDropdown = async (email) => {
    // Access the <select> element using the ref
    const selectElement = document.getElementById('document_name');
    try {
      const res = await axios.get("/applications/documents", {
        params: {
          email: email,
        }
      });
      // Manipulate the options or perform other actions
      if (selectElement) {
        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < selectElement.length; j++) {
            if (selectElement.options[j].value === res.data[i].filename) {
              selectElement.remove(j);
            }
          };
          const newOption = document.createElement('option');
          newOption.value = res.data[i].filename;
          newOption.text = res.data[i].filename;
          selectElement.add(newOption);
        }
    }
      
    } catch (err){
      console.error(err.response);
    }
    
  };

  useEffect(() => {
    setDocumentsDropdown(currentUser.email);
  }, [currentUser.email])
  

  if (type === "interviews") {
    return(<div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="jobTitle">Job Title</label>
            <input name="jobTitle" onChange={handleChange} value={formState.jobTitle} />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input name="company" onChange={handleChange} value={formState.company} />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input name="time" onChange={handleChange} value={formState.time} />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input name="date" onChange={handleChange} value={formState.date} />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              name="notes"
              onChange={handleChange}
              value={formState.notes}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="accepted">Accepted</option>
              <option value="pending">Pending</option>
              <option value='upcoming'>Upcoming</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
  } else if (type === "interviewQuestions") {
    return(<div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
        <div className="form-group">
            <label htmlFor="question">Question</label>
            <textarea
              name="question"
              onChange={handleChange}
              value={formState.question}
            />
          </div>
          <div className="form-group">
            <label htmlFor="answer">Answer</label>
            <textarea
              name="answer"
              onChange={handleChange}
              value={formState.answer}
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              name="notes"
              onChange={handleChange}
              value={formState.notes}
            />
          </div>
          <div className="form-group">
            <label htmlFor="questionType">Type</label>
            <select
              name="questionType"
              onChange={handleChange}
              value={formState.questionType}
            >
              <option value="technical">Technical</option>
              <option value="other">Other</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
  } else if (type === "jobs") {
    return (
      <div
        className="modal-container"
        onClick={(e) => {
          if (e.target.className === "modal-container") closeModal();
        }}
      >
        <div className="modal">
          <form>
            <div className="form-group">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                name="jobTitle"
                onChange={handleChange}
                value={formState.jobTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                name="company"
                onChange={handleChange}
                value={formState.company}
              />
            </div>
            <div className="form-group">
              <label htmlFor="jobDescription">Job Description</label>
              <textarea
                name="jobDescription"
                onChange={handleChange}
                value={formState.jobDescription}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateUploaded">Date Uploaded</label>
              <input
                name="dateUploaded"
                onChange={handleChange}
                value={formState.dateUploaded.substring(0, 10)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                name="status"
                onChange={handleChange}
                value={formState.status}
              >
                <option value="accepted">Accepted</option>
                <option value="pending">Pending</option>
                <option value="upcoming">Upcoming</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            {errors && (
              <div className="error">{`Please include: ${errors}`}</div>
            )}
            <button type="submit" className="btn" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  } else if (type === "applications"){
    return(
      <div
        className="modal-container"
        onClick={(e) => {
          if (e.target.className === "modal-container") closeModal();
        }}
      >
        <div
          className="modal-container"
          onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
          }}
        >
          <div className="modal">
            <form>
              <div className="form-group">
                <label htmlFor="jobTitle">Title</label>
                <input
                  name="title"
                  onChange={handleChange}
                  value={formState.title}
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  name="company"
                  onChange={handleChange}
                  value={formState.company}
                />
              </div>
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                  name="notes"
                  onChange={handleChange}
                  value={formState.notes}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateUploaded">Date Uploaded</label>
                <input
                  name="dateUploaded"
                  onChange={handleChange}
                  value={formState.dateUploaded}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  onChange={handleChange}
                  value={formState.status}
                >
                  <option value="accepted">Accepted</option>
                  <option value="pending">Pending</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="rejected">Rejected</option>
                </select>
                </div>
                <div className="form-group">
                <label htmlFor="document_name">Choose Document</label>
                <select
                  name="document_name"
                  onChange={handleChange}
                  value={formState.document_name}
                  id="document_name"
                >
                  <option value="none">None</option>
                </select>
                </div>
                {errors && (
                  <div className="error">{`Please include: ${errors}`}</div>
                )}
                <button type="submit" className="btn" onClick={handleSubmit}>
                  Submit
                </button>
              </form>
          </div>
        </div>
      </div>
    );
  }
};

export default InterviewsModal;
