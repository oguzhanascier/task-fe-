import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/Auth/LoginView.vue";
import ProfitDashboard from "../views/Charts/ProfitDashboard.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: { name: "login" },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/profit",
    name: "profit",
    component: ProfitDashboard,
    meta: { requiresAuth: true },
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

  if (to.name !== "login" && !token) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
