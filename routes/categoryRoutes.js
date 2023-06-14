import express from "express"
import { createCategory, getAllCategory, getCategoryById, updateCategoryById } from "../controller/categoryController.js";

const router = express.Router();

router.route("/").get(getAllCategory).post(createCategory);
router.route("/:id").get(getCategoryById).patch(updateCategoryById);


export default router;