import express from "express";
import { getJobs, getJob, updateJob, deleteJob, uploadJob } from "../controllers/job.js";
const router = express.Router();

// general view of all jobs
router.get("/", getJobs);
// view specific job
router.get("/:id", getJob);
// update specific job
router.put("/:id", updateJob);
// delete specific job
router.delete("/:id", deleteJob);
// new job upload
router.post("/:id", uploadJob);

export default router;