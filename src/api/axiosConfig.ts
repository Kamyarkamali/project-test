import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (req) => {
    const accessToken = localStorage.getItem("sessionId");

    if (accessToken) {
      req.headers["Authorization"] = accessToken.startsWith("Bearer ")
        ? accessToken
        : `Bearer ${accessToken}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
