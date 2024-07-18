import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { listOrder, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRouter=express.Router();


orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/list",listOrder)
orderRouter.post("/status",updateStatus)


export default orderRouter;