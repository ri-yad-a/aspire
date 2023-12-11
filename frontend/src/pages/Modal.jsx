import React, { useState } from "react";

import "../styles/Modal.css";

const InterviewsModal = ({ closeModal, onSubmit, defaultValue, type }) => {
  let initialState;

  if (type === "interviews") {
    initialState = defaultValue || {
      jobTitle: "",
      company: "",
      time: "",
      date: "",
      notes: "",
      status: "accepted",
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
      jobTitle: "",
      company: "",
      documents: "",
      status: "accepted",
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
      (type === "jobs" &&
        formState.jobTitle &&
        formState.company &&
        formState.jobDescription &&
        formState.dateUploaded.substring(0, 10) &&
        formState.status) ||
      (type === "applications" &&
        formState.jobTitle &&
        formState.company &&
        formState.notes &&
        formState.dateApplied.substring(0, 10) &&
        formState.status)
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
                <label htmlFor="notes">Notes</label>
                <textarea
                  name="notes"
                  onChange={handleChange}
                  value={formState.notes}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateApplied">Date Applied</label>
                <input
                  name="dateApplied"
                  onChange={handleChange}
                  value={formState.dateApplied.substring(0, 10)}
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
      </div>
    );
  }
};

export default InterviewsModal;
