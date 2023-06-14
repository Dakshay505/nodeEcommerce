import express from "express";
import { addProduct, getProduct, getProductById, updateProductById } from "../controller/productController.js";

const router = express.Router();

router.route("/add").post(addProduct);
router.route("/").get(getProduct);
router.route("/:id").get(getProductById).patch(updateProductById);



export default router;