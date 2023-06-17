import express from "express";
import { getUserById, logout, updateUserById } from "../controller/userController.js";


const router = express.Router();

router.route("/me").get(getUserById).patch(updateUserById);
router.route("/logout").get(logout)

export default router;