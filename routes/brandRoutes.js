import express from "express"
import { createBrand, getAllBrand, getBrandById, updateBrandById } from "../controller/brandController.js";

const router = express.Router();

router.route("/").get(getAllBrand).post(createBrand);
router.route("/:id").get(getBrandById).patch(updateBrandById);


export default router;