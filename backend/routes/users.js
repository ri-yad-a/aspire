import express from "express";
import { getPDFs, getUserInfo, updateUserInfo, uploadPDF } from "../controllers/users.js";

const router = express.Router();

// all information about user
router.get("/", getUserInfo);
// update specific user information
router.put("/", updateUserInfo);

// upload pdf file
router.post("/upload", uploadPDF)
router.get("/upload", getPDFs);

export default router;