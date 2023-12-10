import express from "express";
import { getUserInfo, updateUserInfo } from "../controllers/users.js";

const router = express.Router();

// all information about user
router.get("/", getUserInfo);
// update specific user information
router.put("/", updateUserInfo);

export default router;