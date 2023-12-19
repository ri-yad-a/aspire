import { db } from "../dbConnect.js";

// general view of all interviews
export const getInterviews = (req, res) => {
  const q =
    "SELECT id, email, company, time, DATE_FORMAT(date, '%Y-%m-%d') AS date, status, jobTitle, notes FROM interviews WHERE email = ?";
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

export const getInterviewQuestions = (req, res) => {
  const q = "SELECT id FROM interviewq_created WHERE email = ?";
  db.query(q, req.query.email, (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data);
    const q1 = "SELECT * FROM interview_questions WHERE id = ?";
    db.query(q1, data, (err1, data1) => {
      if (err1) return res.status(500).json(err1);
      return res.status(200).json(data1);
    });
  });
};

export const updateInterviewQuestion = (req, res) => {
  const q =
    "UPDATE interview_questions SET `question` = ?, `answer` = ?, `notes` = ?, `questionType` = ? WHERE `id` = ?";
  const values = [
    req.body.question,
    req.body.answer,
    req.body.notes,
    req.body.questionType,
  ];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Interview Question edited successfully.");
  });
};

export const deleteInterviewQuestion = (req, res) => {
  const q = "DELETE FROM interviewq_created WHERE id = ?";
  db.query(q, req.query.id, (err, data) => {
    if (err) return res.status(500).json(err);

    const q1 = "DELETE FROM interview_questions WHERE id = ?";
    db.query(q1, req.query.id, (err1, data1) => {
      if (err1) return res.status(500).json(err1);
      return res.status(200).json("Interview Question deleted successfully.");
    });
  });
};

export const uploadInterviewQuestion = (req, res) => {
  const q = "SELECT * FROM interview_questions WHERE id = ?";
  db.query(q, req.body.id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Interview Question already exists!");

    const q1 =
      "INSERT INTO interview_questions(`question`,`answer`,`notes`, `questionType`) VALUES (?)";
    const values = [
      req.body.question,
      req.body.answer,
      req.body.notes,
      req.body.questionType,
    ];

    db.query(q1, [values], (err1, data1) => {
      if (err1) return res.status(500).json(err1);

      const q2 = "INSERT INTO interviewq_created(`email`, `id`) VALUES (?)";
      db.query(q2, [req.body.email, req.body.id], (err2, data2) => {
        if (err2) return res.status(500).json(err2);
        return res.status(200).json(data2);
      })

    });
  });
};
