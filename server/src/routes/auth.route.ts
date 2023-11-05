import express from "express";
import { signUp } from "../controllers/AuthController";
const router = express.Router();

router.post("/signup", signUp);

export default router;
