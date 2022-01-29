const express = require("express");
const { protect, restrictTo } = require("../controllers/auth");
const router = express.Router();

const { 
  getDiscountById, 
  addDiscount, 
  getAllDiscounts, 
  updateDiscount 
} = require("../controllers/discount");

router.get("/discount/:discountId", getDiscountById);
router.post("/", protect, restrictTo("admin"), addDiscount);
router.get("/", getAllDiscounts);
router.patch("/discount/:discountId", protect, restrictTo("admin"), updateDiscount);

module.exports = router;
