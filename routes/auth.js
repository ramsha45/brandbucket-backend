const express = require("express")
const {signup, fetchuser, login, forgetPassword, resetPassword} = require("../controllers/auth")

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/", fetchuser);
router.post("/forgot-password",forgetPassword);
router.post("/reset-password/:token",resetPassword)


module.exports = router;