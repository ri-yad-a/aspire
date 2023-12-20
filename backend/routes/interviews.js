import express from "express";
import {
  getInterviews,
  updateInterview,
  deleteInterview,
  uploadInterview,
  getInterviewQuestions,
  updateInterviewQuestion,
  deleteInterviewQuestion,
  uploadInterviewQuestion,
  deleteUserInterviews,
  deleteUserInterviewQuestions
} from "../controllers/interviews.js";
const router = express.Router();

// general view of all interviews
router.get("/", getInterviews);
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

// delete all interviews for a user
router.delete("/delete", deleteUserInterviews);

// delete all interview questions for a user
router.delete("/questions/delete", deleteUserInterviewQuestions);

export default router;
