import express from "express";
import {adminLogin, adminLogout} from "../controllers/adminAuth.js";

const router = express.Router();

router.post("/admin/login", adminLogin);
router.post("/admin/logout", adminLogout);

export default router;