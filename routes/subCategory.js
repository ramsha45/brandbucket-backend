const express = require("express");
const { protect, restrictTo } = require("../controllers/auth");
const { 
  getSubCategoryById, 
  addSubCategory,
  getAllSubCategories, 
  updateSubCategory 
} = require("../controllers/subCategory");
const router = express.Router();

router.get("/subcategory/:subcategoryId", getSubCategoryById);
router.post("/", protect, restrictTo("admin"), addSubCategory);
router.get("/", getAllSubCategories);
router.patch("/subcategory/:subcategoryId", protect, restrictTo("admin"), updateSubCategory);

module.exports = router;
