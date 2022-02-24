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
router.delete("/category/:categoryId")

module.exports = router;


// axios.get("/")
// axios.post("/", body)
// axios.patch("/category/5", body)
// axios.get("/category/5")
// axios.delete()