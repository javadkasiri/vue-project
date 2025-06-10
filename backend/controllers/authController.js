const User = require("../models/User"); //مدل مانگو مربوط به کاربران
const bcrypt = require("bcryptjs"); //برای هش کردن رمز عبور
const jwt = require("jsonwebtoken"); // برای تولید توکن JWT
const memcached = require("../cache/memcachedClient"); // کلاینت اتصال به ممکچ برای کش کردن توکن‌ها.

const SECRET = process.env.JWT_SECRET || "secret_key"; // اگر در .env مقدار جی دلیو تی سکرت کی نبود، مقدار پیش‌فرض  استفاده می‌شود.

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body; //ورودی

    //بررسی وجود کاربر
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }
    //هش کردن رمز عبور و ذخیره
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();

    res.status(201).json({ message: "User created" }); // پاسخ موفق
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body; //گرفتن نام کاربری و رمز عبور

  //یافتن کاربر و بررسی رمز عبور
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid credentials");

  //تولید توکن JWT
  const token = jwt.sign({ id: user._id, username: user.username }, SECRET, {
    expiresIn: "12h",
  });

  //ذخیره توکن در Memcached
  memcached.set(token, JSON.stringify({ userId: user._id }), 3600, (err) => {
    if (err) console.error("Memcached error:", err);
  });

  // ذخیره توکن در کوکی HttpOnly
  res.cookie("token", token, {
    httpOnly: true, // جلوگیری از دسترسی JS
    secure: false, // در حالت production بگذار true
    sameSite: "Lax", // یا "Strict" یا "None" بسته به نیاز
    maxAge: 3600000, // 1 ساعت
  });

  // پاسخ موفق
  res.status(200).json({ message: "Login successful" });
};

exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body; //استخراج داده‌ها
  if (!currentPassword || !newPassword) {
    return res.status(400).send("Current and new password required"); //بررسی وجود فیلدها
  }
  try {
    //یافتن کاربر و تطبیق رمز فعلی
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).send("Current password is incorrect");
    //هش و ذخیره رمز جدید
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();
    res.send("Password changed successfully"); //پاسخ موفق
  } catch (err) {
    res.status(500).send("Server error");
  }
};
