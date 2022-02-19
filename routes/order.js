const express = require("express");
const { protect, restrictTo } = require("../controllers/auth");
const { 
  getOrderById, 
  addOrder, 
  getAllOrders, 
  updateOrder, 
  checkoutSession
} = require("../controllers/order");
const router = express.Router();

router.get("/order/:orderId", getOrderById);
router.post("/", addOrder);
router.get("/", getAllOrders);
router.patch("/order/:orderId", protect, restrictTo("admin"), updateOrder);
// router.post("/order/checkout-session/:productId", checkoutSession);

module.exports = router;
