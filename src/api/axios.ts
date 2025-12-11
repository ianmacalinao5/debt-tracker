import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const pendingRequests = new Map<string, boolean>();

const generateRequestKey = (config: any): string => {
  return `${config.method}:${config.url}:${JSON.stringify(config.data || {})}`;
};

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const requestKey = generateRequestKey(config);

    if (pendingRequests.has(requestKey)) {
      return Promise.reject({
        __CANCEL__: true,
        message: "Duplicate request prevented",
      });
    }

    pendingRequests.set(requestKey, true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const requestKey = generateRequestKey(response.config);
    pendingRequests.delete(requestKey);
    return response;
  },
  (error) => {
    if (error.config) {
      const requestKey = generateRequestKey(error.config);
      pendingRequests.delete(requestKey);
    }

    if (error.__CANCEL__) {
      return new Promise(() => {});
    }

    return Promise.reject(error);
  }
);

export default api;
