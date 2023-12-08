import express from "express";
import {} from "../controllers/jobs.js";
import { getJobs, getJob, updateJob, deleteJob, uploadJob } from "../controllers/job";
const router = express.Router();

// general view of all jobs
router.get("/", getJobs);
// view specific job
router.get("/:id", getJob);
// update specific job
router.update("/:id", updateJob);
// delete specific job
router.delete("/:id", deleteJob);
// new job upload
router.post("/:id", uploadJob);

export default router;