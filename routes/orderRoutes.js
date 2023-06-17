import express from "express";
import { addToOrder, deleteFromOrder,getAllOrder, getAllOrderItemsByUser, updateOrderById } from "../controller/orderController.js";


const router = express.Router();

router.route("/").post(addToOrder).get(getAllOrder);

router.route("/:id").get(getAllOrderItemsByUser).delete(deleteFromOrder).patch(updateOrderById);



export default router;