import { defineStore } from "pinia";
import {
  loginRequest,
  registerRequest,
  fetchUser,
  logoutRequest,
} from "@/api/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as any,
    token:
      localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken") ||
      null,
  }),

  actions: {
    async login(email: string, password: string, remember: boolean) {
      const res = await loginRequest({ email, password, remember });

      this.token = res.data.token;
      this.user = res.data.user;

      if (remember) {
        localStorage.setItem("authToken", res.data.token);
        sessionStorage.removeItem("authToken");
      } else {
        sessionStorage.setItem("authToken", res.data.token);
        localStorage.removeItem("authToken");
      }
    },

    async register(
      name: string,
      email: string,
      password: string,
      passwordConfirmation: string
    ) {
      const res = await registerRequest({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      this.token = res.data.token;
      this.user = res.data.user;

      sessionStorage.setItem("authToken", res.data.token);
      localStorage.removeItem("authToken");
    },

    async getUser() {
      const res = await fetchUser();
      this.user = res.data;
    },

    async logout() {
      await logoutRequest();
      this.user = null;
      this.token = null;
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
    },
  },
});
