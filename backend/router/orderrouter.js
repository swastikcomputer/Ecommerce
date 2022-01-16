const express=require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controller/ordercontroller");
const { isAutheticatedUser, authorizeRole } = require('../middleware/auth');

const router=express.Router();
router.route("/order/new").post(isAutheticatedUser,newOrder);
router.route("/order/:id").get(isAutheticatedUser,getSingleOrder);
router.route("/orders/me").get(isAutheticatedUser,myOrders);
router.route("/admin/orders").get(isAutheticatedUser, authorizeRole("admin"),getAllOrders);
router.route("/admin/order/:id").put(isAutheticatedUser, authorizeRole("admin"),updateOrder)
.delete(isAutheticatedUser, authorizeRole("admin"),deleteOrder);





module.exports = router;