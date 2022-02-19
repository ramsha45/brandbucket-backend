const express = require("express");
const { paymentSession } = require("../controllers/payment");
const router = express.Router();

router.post("/", paymentSession)
// router.post("/order/checkout-session/:productId", checkoutSession);

module.exports = router;