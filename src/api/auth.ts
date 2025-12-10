import api from "./axios";

export const loginRequest = (payload: {
  email: string;
  password: string;
  remember: boolean;
}) => {
  return api.post("/login", payload);
};

export const registerRequest = (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post("/register", payload);
};

export const logoutRequest = () => {
  return api.post("/logout");
};

export const fetchUser = () => {
  return api.get("/user");
};
