import { createWebHistory, createRouter } from "vue-router";
import LoginView from "@/views/Login.vue";
import DashboardView from "@/views/Dashboard.vue";
import Notfound from "@/views/Notfound.vue";

const routes = [
  { path: "/", component: LoginView },
  { path: "/dashboard", component: DashboardView },
  { path: "/:catchAll(.*)", name: "NotFound", component: Notfound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
