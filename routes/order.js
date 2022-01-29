const express = require("express");
const { protect, restrictTo } = require("../controllers/auth");
const { 
  getOrderById, 
  addOrder, 
  getAllOrders, 
  updateOrder 
} = require("../controllers/order");
const router = express.Router();

router.get("/order/:orderId", getOrderById);
router.post("/", addOrder);
router.get("/", getAllOrders);
router.patch("/order/:orderId", protect, restrictTo("admin"), updateOrder);

module.exports = router;
