import React from "react";
import { BsFillTrashFill, BsFillPencilFill, BsCloudUploadFill, BsCloudDownloadFill } from "react-icons/bs";
import "../styles/Table.css";

const InterviewsTable = ({ rows, deleteRow, editRow, type, viewRowPDF, downloadRowPDF }) => {
    if (type === "interviews") {
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
    } else if (type === "jobs") {
        return(<div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th className="expand">Job Description</th>
              <th>Date Uploaded</th>
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
                  <td>{row.jobDescription}</td>
                  <td>{row.dateUploaded.substring(0, 10)}</td>
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
      </div>);
    } else if (type === "applications") {
        return(<div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th className="expand">Notes</th>
              <th>Date Uploaded</th>
              <th>Status</th>
              <th>Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows && rows.map((row, idx) => {
              const statusText =
                row.status.charAt(0).toUpperCase() + row.status.slice(1);
  
              return (
                <tr key={idx}>
                  <td>{row.title}</td>
                  <td>{row.company}</td>
                  <td>{row.notes}</td>
                  <td>{row.dateUploaded}</td>
                  <td>
                    <span className={`label label-${row.status}`}>
                      {statusText}
                    </span>
                  </td>
                  <td>{row.document_name}</td>
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
      </div>);
    } else if (type === "documents") {
              return(<div className="table-wrapper1">
        <table className="table">
          <thead>
            <tr>
              <th>Document Title</th>
              <th>File Name</th>
              <th className="expand">Description</th>
              <th>Date Uploaded</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows && rows.map((row, idx) => {
              const statusText =
                row.type.charAt(0).toUpperCase() + row.type.slice(1);
  
              return (
                <tr key={idx}>
                  <td>{row.title}</td>
                  <td>{row.filename}</td>
                  <td>{row.description}</td>
                  <td>{row.uploadDate}</td>
                  <td>
                    <span className={`label label-${row.type}`}>
                      {statusText}
                    </span>
                  </td>
                  <td className="fit">
                    <span className="actions">
                      <BsFillTrashFill
                        className="delete-btn"
                        onClick={() => deleteRow(idx)}
                      />
                      <BsCloudUploadFill
                        className="upload-btn"
                        onClick={() => viewRowPDF(idx)}
                      />
                      <BsCloudDownloadFill 
                        className="download-btn"
                        onClick={() => downloadRowPDF(idx)}
                      />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>);
    } else if (type === "adminDashboard") {
      return(<div className="table-wrapper">
<table className="table">
  <thead>
    <tr>
      <th>Username</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th className="expand">Email</th>
      <th>Type</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {rows && rows.map((row, idx) => {
      const statusText =
        row.type.charAt(0).toUpperCase() + row.type.slice(1);

      return (
        <tr key={idx}>
          <td>{row.username}</td>
          <td>{row.fname}</td>
          <td>{row.lname}</td>
          <td>{row.email}</td>
          <td>
            <span className={`label label-${row.type}`}>
              {statusText}
            </span>
          </td>
          <td className="fit">
            <span className="actions">
              <BsFillTrashFill
                className="delete-btn"
                onClick={() => deleteRow(idx)}
              />
              <BsCloudUploadFill
                className="upload-btn"
                onClick={() => viewRowPDF(idx)}
              />
            </span>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>
</div>);
}
 
};

export default InterviewsTable;