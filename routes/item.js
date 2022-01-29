const express = require("express");
const { protect, restrictTo } = require("../controllers/auth");
const { 
  getItemById, 
  addItem, 
  getAllItem, 
  updateItem, 
  ItemImgUpload 
} = require("../controllers/Item");
const router = express.Router();

router.get("/item/:itemId", getItemById);
router.post("/", protect, restrictTo("admin"), ItemImgUpload, addItem);
router.get("/", getAllItem);
router.patch("/item/:itemId", protect, restrictTo("admin"), updateItem);

module.exports = router;
