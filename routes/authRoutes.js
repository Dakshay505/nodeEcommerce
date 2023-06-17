import express from "express";
import { addUser, loginUser } from "../controller/authController.js";
import passport from "passport";
const router = express.Router();


router.route("/signup").post(addUser);
router.route("/login").post(loginUser);



export default router;