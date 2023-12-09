import { db } from "../dbConnect.js";

// general view of all jobs
export const getJobs = (req, res) => {
    const q = "SELECT * FROM jobs WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
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
    res.send("Update Job");
};
// delete specific job
export const deleteJob = (req, res) => {
    res.send("Delete Job");
};
// new job upload
export const uploadJob = (req, res) => {
    res.send("Upload Job");
}