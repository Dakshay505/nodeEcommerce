import express from "express";
import { addToCart, deleteFromCart, delleteAllItemInCart, getAllCartItemsByUser, updateCartById } from "../controller/cartController.js";

const router = express.Router();

router.route("/add").post(addToCart);

router.route("/allcart").get(getAllCartItemsByUser)

router.route("/:id").delete(deleteFromCart).patch(updateCartById);

router.route("/delete").delete(delleteAllItemInCart);

export default router;