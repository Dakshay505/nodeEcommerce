import express from "express";
import { addToCart, deleteFromCart, getAllCartItemsByUser, updateCartById } from "../controller/cartController.js";

const router = express.Router();

router.route("/add").post(addToCart);
router.route("/:id").get(getAllCartItemsByUser).delete(deleteFromCart).patch(updateCartById);



export default router;