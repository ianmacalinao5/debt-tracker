import {
    createWebHistory,
    createRouter,
    type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
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
    const auth = useAuthStore();

    document.title = (to.meta.title as string) || "Debt Tracker";

    if (to.meta.requiresAuth && !auth.token) {
        return next("/");
    }

    if (to.meta.guestOnly && auth.token) {
        return next("/dashboard");
    }

    next();
});
