import express from "express";
import { getInterviews, getInterview, updateInterview, deleteInterview, uploadInterview } from "../controllers/interviews.js";
const router = express.Router();

// general view of all interviews
router.get("/", getInterviews);
// view specific interview
router.get("/:id", getInterview);
// update specific interview
router.put("/", updateInterview);
// delete specific interview
router.delete("/", deleteInterview);
// new interview upload
router.post("/", uploadInterview);

export default router;