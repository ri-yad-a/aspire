import express from "express";
import { getApplications, updateApplication, deleteApplication, uploadApplication, getDocuments, deleteUserApplications } from "../controllers/applications.js";
const router = express.Router();

// general view of all jobs
router.get("/", getApplications);
// update specific job
router.put("/", updateApplication);
// delete specific job
router.delete("/", deleteApplication);
// new job upload
router.post("/", uploadApplication);
// get docs
router.get("/documents", getDocuments);

// delete all applications for a user
router.delete("/delete", deleteUserApplications);

export default router;