import express from "express";
import { getJobs, getJob, updateJob, deleteJob, uploadJob } from "../controllers/job.js";
const router = express.Router();

// general view of all jobs
router.get("/", getJobs);
// view specific job
router.get("/:id", getJob);
// update specific job
router.put("/", updateJob);
// delete specific job
router.delete("/", deleteJob);
// new job upload
router.post("/", uploadJob);

export default router;