import {
  createWebHistory,
  createRouter,
  type RouteRecordRaw,
} from "vue-router";
import LoginView from "@/views/Login.vue";
import DashboardView from "@/views/Dashboard.vue";
import Notfound from "@/views/Notfound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
    meta: {
      title: "Debt Tracker",
      requiresAuth: false,
      guestOnly: true,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: {
      title: "Dashboard - Debt Tracker",
      requiresAuth: false,
    },
  },
  { path: "/:catchAll(.*)", name: "NotFound", component: Notfound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title;
  if (pageTitle) {
    document.title = pageTitle as string;
  } else {
    document.title = "Debt Tracker";
  }

  const token = localStorage.getItem("sanctumApiToken");
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth && !token) {
    next("/");
    return;
  }

  if (to.meta.guestOnly && token) {
    next("/dashboard");
    return;
  }

  next();
});
