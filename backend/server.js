const express = require("express"); //فریم‌ورک اصلی بک‌اند
const cookieParser = require("cookie-parser"); //برای خواندن کوکی‌ها مثل توکن JWT
const mongoose = require("mongoose"); //برای اتصال به MongoDB
const cors = require("cors"); //برای اجازه ارتباط بین فرانت‌اند و بک‌اند
const authRoutes = require("./routes/auth"); //مسیرهای مربوط به ثبت‌نام، ورود، خروج
const protectedRoutes = require("./routes/protected"); //مسیرهای محافظت‌شده مثل /dashboard
require("dotenv").config(); //برای خواندن متغیرهای .env

const app = express(); //ایجاد اپلیکیشن

//اجازه اتصال فرانت به بک
app.use(
  cors({
    origin: "http://localhost:8082", // آدرس فرانت‌اندت
    credentials: true, // اجازه ارسال کوکی
  })
);

app.use(express.json()); // برای پارس کردن جیسون در body
app.use(cookieParser()); // برای خواندن کوکی‌ها

// اتصال به دیتابیس MongoDB
mongoose
  .connect("mongodb://172.25.199.96:27017/vueapp")
  .then(() => console.log("MongoDB connected"));

app.use("/api", authRoutes); // احراز هویت

// مسیر محافظت‌شده مثل dashboard
app.use("/api", protectedRoutes);

app.listen(3000, () => console.log("Server started on port 3000"));
