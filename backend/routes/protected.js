const express = require("express"); //برای ساخت router مجزا
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); //برای بررسی توکن JWT

// تعریف مسیر GET برای داشبورد
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

module.exports = router;
