import express from "express";
import { addProduct, filterbyBrand, getAllCategory, getAllProductAdmin, getProduct, getProductById, updateProductById } from "../controller/productController.js";

const router = express.Router();

router.route("/add").post(addProduct);
router.route("/cat").get(getAllCategory);
router.route("/").get(getProduct);
router.route("/prd").get(filterbyBrand)
router.route("/admin").get(getAllProductAdmin);
router.route("/:id").get(getProductById).patch(updateProductById);



export default router;