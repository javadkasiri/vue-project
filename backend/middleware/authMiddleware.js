const jwt = require("jsonwebtoken"); //برای بررسی صحت توکن JWT
const memcached = require("../cache/memcachedClient"); //برای چک کردن اعتبار توکن در کش
const SECRET = process.env.JWT_SECRET || "secret_key"; //کلید رمزنگاری برای بررسی توکن

module.exports = (req, res, next) => {

  const token = req.cookies.token; //بررسی می‌کنه که آیا کوکی به نام token وجود داره
  if (!token) return res.status(401).send("Access Denied"); //اگر نباشه دسترسی رد میشه
  memcached.get(token, (err, data) => {
    if (err || !data) return res.status(401).send("Session expired"); //بررسی می‌کنه آیا این توکن داخل کش Memcached هست
    
    //بررسی اعتبار JWT
    try {
      const verified = jwt.verify(token, SECRET);
      req.user = verified;
      next();
    } catch (e) {
      res.status(400).send("Invalid Token");
    }
  });
};
