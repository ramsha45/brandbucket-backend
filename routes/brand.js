const express = require("express");
const { protect, restrictTo } = require("../controllers/auth");
const { getBrandById, addBrand, updateBrand, getAllBrands } = require("../controllers/brand");
const router = express.Router();

router.get("/brand/:brandId", getBrandById);
router.post("/", protect, restrictTo("admin"), addBrand);
router.get("/", getAllBrands);
router.patch("/brand/:brandId",protect, restrictTo("admin"), updateBrand);
router.delete("/brand/:brandId")

module.exports = router;
