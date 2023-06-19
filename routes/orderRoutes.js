import express from "express";
import { addToOrder, deleteFromOrder,getAllOrder, getAllOrderItemsByUser, updateOrderById } from "../controller/orderController.js";


const router = express.Router();

router.route("/").post(addToOrder);
router.route("/admin/all").get(getAllOrder);
router.route("/me").get(getAllOrderItemsByUser);
router.route("/:id").delete(deleteFromOrder).patch(updateOrderById);



export default router;