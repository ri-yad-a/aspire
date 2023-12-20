import { db } from "../dbConnect.js";

// general view of all jobs
export const getJobs = (req, res) => {
    const q = "SELECT id, email, company, jobTitle, status, jobDescription, DATE_FORMAT(dateUploaded, '%Y-%m-%d') AS dateUploaded FROM jobs WHERE email = ?";

    db.query(q, req.query.email, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
};
// view specific job
export const getJob = (req, res) => {
    res.send("Job");
};
// update specific job
export const updateJob = (req, res) => {
    const q = "UPDATE jobs SET `company` = ?, `email` = ?, `dateUploaded` = ?, `jobTitle` = ?, `status` = ?, `jobDescription` = ? WHERE `id` = ?";
    const values = [req.body.company, req.body.email, req.body.dateUploaded, req.body.jobTitle, req.body.status, req.body.jobDescription, req.body.id];
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Job edited successfully.");
    });
};
// delete specific job
export const deleteJob = (req, res) => {
    const q = "DELETE FROM jobs WHERE id = ?";
    db.query(q, req.query.id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Job deleted successfully.");
    });
};
// new job upload
export const uploadJob = (req, res) => {
    const q1 = "SELECT * FROM jobs WHERE id = ?";
    db.query(q1, req.body.id, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("Job already exists!");

      const q = "INSERT INTO jobs(`company`,`email`,`dateUploaded`,`jobTitle`,`status`, `jobDescription`) VALUES (?)";
      const values = [req.body.company, req.body.email, req.body.dateUploaded, req.body.jobTitle, req.body.status, req.body.jobDescription];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
};

export const deleteUserJobs = (req, res) => {
};
