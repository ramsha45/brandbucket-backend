const express = require("express");
const { protect, restrictTo} = require("../controllers/auth");
const { 
  getAllCartItem, 
  getCartItemById, 
  addCartItem, 
  updateCartItem 
} = require("../controllers/cartItem");
const router = express.Router();

router.get("/cart/:cartId", getCartItemById);
router.post("/", protect, restrictTo("admin"), addCartItem);
router.get("/", getAllCartItem);
router.patch("/cart/:cartId", protect, restrictTo("admin"), updateCartItem);

module.exports = router;
