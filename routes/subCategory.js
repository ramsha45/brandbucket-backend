const express = require("express");
const { protect, restrictTo } = require("../controllers/auth");
const { 
  getSubCategoryById, 
  addSubCategory,
  getAllSubCategories, 
  updateSubCategory, 
  SubCategoryUpload
} = require("../controllers/subCategory");
const router = express.Router();

router.get("/subcategory/:subcategoryId", getSubCategoryById);
router.post("/", protect, restrictTo("admin"), SubCategoryUpload, addSubCategory);
router.get("/", getAllSubCategories);
router.patch("/subcategory/:subcategoryId", protect, restrictTo("admin"), updateSubCategory);

module.exports = router;
