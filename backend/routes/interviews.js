import express from "express";
import {
  getInterviews,
  getInterview,
  updateInterview,
  deleteInterview,
  uploadInterview,
  getInterviewQuestions,
  updateInterviewQuestion,
  deleteInterviewQuestion,
  uploadInterviewQuestion,
} from "../controllers/interviews.js";
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

// general view of all interviews
router.get("/questions", getInterviewQuestions);
// update specific interview
router.put("/questions", updateInterviewQuestion);
// delete specific interview
router.delete("/questions", deleteInterviewQuestion);
// new interview upload
router.post("/questions", uploadInterviewQuestion);

export default router;
