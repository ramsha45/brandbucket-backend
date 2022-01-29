const express = require("express");
const { protect, restrictTo } = require("../controllers/auth");
const router = express.Router();

const {
    addProduct,
    productById,
    list,
    productImgUpload,
    updateProduct
} = require("../controllers/product");

router.get("/product/:productId", productById);
router.post("/products", protect, restrictTo("admin"), addProduct);
router.get("/products", list);
router.patch("/product/:productId", updateProduct);

module.exports = router;
