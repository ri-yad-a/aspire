import { db } from "../dbConnect.js";

// general view of all applications
export const getApplications = (req, res) => {
    const q = "SELECT id, email, title, company, notes, document_name, status, DATE_FORMAT(dateUploaded, '%Y-%m-%d') AS dateUploaded FROM applications WHERE email = ?";

    db.query(q, req.query.email, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
};
// update specific application
export const updateApplication = (req, res) => {
    const q = "UPDATE applications SET `email` = ?, `title` = ?, `company` = ?, `notes` = ?, `status` = ?, `dateUploaded` = ?, `document_name` = ? WHERE `id` = ?";
    const values = [req.body.email, req.body.title, req.body.company, req.body.notes, req.body.status, req.body.dateUploaded, req.body.document_name, req.body.id];
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Application edited successfully.");
    });
};
// delete specific application
export const deleteApplication = (req, res) => {
    const q = "DELETE FROM applications WHERE id = ?";
    db.query(q, req.query.id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Application deleted successfully.");
    });
};
// new application upload
export const uploadApplication = (req, res) => {
    const q1 = "SELECT * FROM applications WHERE id = ?";
    db.query(q1, req.body.id, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("Application already exists!");

      const q = "INSERT INTO applications(`email`,`title`, `company`,`notes`,`status`,`dateUploaded`, `document_name`) VALUES (?)";
      const values = [req.body.email, req.body.title, req.body.company, req.body.notes, req.body.status, req.body.dateUploaded, req.body.document_name];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
};

export const getDocuments = (req, res) => {
    const q1 = "SELECT filename FROM documents WHERE email = ?";
    db.query(q1, req.query.email, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(200).json(data);
    });
};