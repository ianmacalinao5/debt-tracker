import {
  createWebHistory,
  createRouter,
  type RouteRecordRaw,
} from "vue-router";
import LoginView from "@/views/Login.vue";
import RegisterView from "@/views/Register.vue";
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
    path: "/register",
    name: "Register",
    component: RegisterView,
    meta: {
      title: "Register - Debt Tracker",
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
      requiresAuth: true,
    },
  },
  { path: "/:catchAll(.*)", name: "NotFound", component: Notfound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const pageTitle = to.meta.title;
  document.title = pageTitle ? (pageTitle as string) : "Debt Tracker";

  // Check both localStorage and sessionStorage for token
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth && !token) {
    return next("/");
  }

  if (to.meta.guestOnly && token) {
    return next("/dashboard");
  }

  next();
});
