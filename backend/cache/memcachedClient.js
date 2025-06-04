const Memcached = require("memcached");
const memcached = new Memcached("172.25.199.96:11211");

module.exports = memcached;