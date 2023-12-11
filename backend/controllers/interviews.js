import { db } from "../dbConnect.js";

// general view of all interviews
export const getInterviews = (req, res) => {
  const q =
    "SELECT id, email, company, time, DATE_FORMAT(date, '%Y-%m-%d') AS date, application_id, status, jobTitle, notes FROM interviews WHERE email = ?";
  db.query(q, req.query.email, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
// view specific interview
export const getInterview = (req, res) => {
  res.send("Interview");
};
// update specific interview
export const updateInterview = (req, res) => {
  const q =
    "UPDATE interviews SET `email` = ?, `company` = ?, `time` = ?, `date` = ?, `status` = ?, `jobTitle` = ?, `notes` = ? WHERE `id` = ?";
  const values = [
    req.body.email,
    req.body.company,
    req.body.time,
    req.body.date,
    req.body.status,
    req.body.jobTitle,
    req.body.notes,
    req.body.id,
  ];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Interview edited successfully.");
  });
};
// delete specific interview
export const deleteInterview = (req, res) => {
  const q = "DELETE FROM interviews WHERE id = ?";
  db.query(q, req.query.id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Interview deleted successfully.");
  });
};
// new interview upload
export const uploadInterview = (req, res) => {
  const q1 = "SELECT * FROM interviews WHERE id = ?";
  db.query(q1, req.body.id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Interview already exists!");

    const q =
      "INSERT INTO interviews(`email`,`company`,`time`, `date`,`status`, `jobTitle`, `notes`) VALUES (?)";
    const values = [
      req.body.email,
      req.body.company,
      req.body.time,
      req.body.date,
      req.body.status,
      req.body.jobTitle,
      req.body.notes,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
