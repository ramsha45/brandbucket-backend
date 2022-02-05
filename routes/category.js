const express = require("express");
const { protect, restrictTo } = require("../controllers/auth");
const router = express.Router();

const { 
  addCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
} = require("../controllers/category");

router.get("/category/:categoryId", getCategoryById);
router.post("/", protect, restrictTo("admin"), addCategory);
router.get("/", getAllCategories);
router.patch("/category/:categoryId", protect, restrictTo("admin") ,updateCategory);

module.exports = router;