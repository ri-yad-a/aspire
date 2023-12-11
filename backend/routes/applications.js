import express from "express";
import { getApplications, getApplication, updateApplication, deleteApplication, uploadApplication } from "../controllers/applications.js";
const router = express.Router();

// general view of all jobs
router.get("/", getApplications);
// view specific job
router.get("/:id", getApplication);
// update specific job
router.put("/", updateApplication);
// delete specific job
router.delete("/", deleteApplication);
// new job upload
router.post("/", uploadApplication);

export default router;