import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/Auth/LoginView.vue";
import ProfitDashboard from "../views/Charts/ProfitDashboard.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "profit",
    component: ProfitDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user");
  let token = null;

  if (user) {
    token = JSON.parse(user).accessToken;
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
