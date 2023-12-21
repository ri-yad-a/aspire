import express from "express";
import { deletePDF, deleteUser, deleteUserDocs, getAllUsers, getPDF, getPDFs, getUserInfo, updateUserInfo, uploadPDF } from "../controllers/users.js";

const router = express.Router();

// all information about user
router.get("/", getUserInfo);
// update specific user information
router.put("/", updateUserInfo);

// upload pdf file
router.post("/upload", uploadPDF)
router.get("/upload", getPDFs);
router.delete("/upload", deletePDF);

// get specific pdf file
router.get("/pdf", getPDF);

// get all users for admin dashboard
router.get("/all", getAllUsers);
router.delete("/delete", deleteUser);

// delete user docs
router.delete("/pdf", deleteUserDocs);

export default router;