//ایمپورت توابع مربوط به ساختن روت و استفاده از history mode
import { createRouter, createWebHistory } from "vue-router";

//ایمپورت کامپوننت‌هایی که در مسیرهای مختلف قرار می‌گیرند.
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import DashboardSetting from "../views/DashboardSetting.vue";
import DashboardProfile from "../views/DashboardProfile.vue";
import DashboardManagement from "../views/DashboardManagement.vue";
import DashboardChatTicket from "../views/DashboardChatTicket.vue";
import DashboardCallCenter from "../views/DashboardCallCenter.vue";
import DashboardMarketing from "../views/DashboardMarketing.vue";
import DashboardDataGrabber from "../views/DashboardDataGrabber.vue";

//تعریف مسیرها
const routes = [
  { path: "/", component: Home },
  { path: "/signup", component: Signup },
  { path: "/login", component: Login },
  {
    path: "/dashboard", //مسیر /dashboard فقط برای کاربران لاگین شده است
    component: Dashboard,
    children: [
      { path: "setting", component: DashboardSetting },
      { path: "profile", component: DashboardProfile },
      { path: "management", component: DashboardManagement },
      { path: "chat-ticket", component: DashboardChatTicket },
      { path: "call-center", component: DashboardCallCenter },
      { path: "marketing", component: DashboardMarketing },
      { path: "data-grabber", component: DashboardDataGrabber },
    ],
    meta: { requiresAuth: true }, // برای فعال‌سازی گارد امنیتی استفاده می‌شود.
  },
];

//استفاده از تاریخچه‌ی مرورگر به جای hash mode.
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// گارد برای بررسی اعتبار توکن از طریق کوکی
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const res = await fetch("http://localhost:3000/api/dashboard", {
        method: "GET",
        credentials: "include", // برای ارسال کوکی HttpOnly
      });
      if (res.ok) {
        next(); // دسترسی آزاد است
      } else {
        next("/login"); // توکن معتبر نیست
      }
    } catch (err) {
      console.error("Error validating session:", err);
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
