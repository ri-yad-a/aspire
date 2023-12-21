import express from "express";
import {adminLogin, adminLogout, checkAdmin} from "../controllers/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);

router.get("/checkAdmin", checkAdmin);

export default router;