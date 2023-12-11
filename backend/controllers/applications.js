import { db } from "../dbConnect.js";

// general view of all applications
export const getApplications = (req, res) => {
    const q = "SELECT id, email, title, company, notes, status, DATE_FORMAT(dateApplied, '%Y-%m-%d') AS dateApplied FROM applications WHERE email = ?";

    db.query(q, req.query.email, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
};
// view specific application
export const getApplication = (req, res) => {
    res.send("Application");
};
// update specific application
export const updateApplication = (req, res) => {
    const q = "UPDATE applications SET `email` = ?, `title` = ?, `company` = ?, `notes` = ?, `status` = ?, `dateApplied` = ?, `resume` = ?, `transcript` = ?, `coverLetter` = ? WHERE `id` = ?";
    const values = [req.body.email, req.body.title, req.body.notes, req.body.status, req.body.dateApplied, req.body.resume, req.body.transcript, req.body.coverLetter, req.body.id];
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

      const q = "INSERT INTO applications(`email`,`title`, `company`,`notes`,`status`,`dateApplied`, `resume`, `transcript`, `coverLetter`) VALUES (?)";
      const values = [req.body.email, req.body.title, req.body.company, req.body.notes, req.body.status, req.body.dateApplied, req.body.resume, req.body.transcript, req.body.coverLetter];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
};