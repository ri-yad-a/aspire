import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "../styles/InterviewsTable.css";

const InterviewsTable = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Time</th>
            <th>Date</th>
            <th className="expand">Notes</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows && rows.map((row, idx) => {
            const statusText =
              row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx}>
                <td>{row.jobTitle}</td>
                <td>{row.company}</td>
                <td>{row.time}</td>
                <td>{row.date}</td>
                <td className="expand">{row.notes}</td>
                <td>
                  <span className={`label label-${row.status}`}>
                    {statusText}
                  </span>
                </td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InterviewsTable;