const mongoose = require('mongoose'); //ایمپورت Mongoose

//تعریف اسکیمای کاربر
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema); // ایجاد مدل و صادر کردن
