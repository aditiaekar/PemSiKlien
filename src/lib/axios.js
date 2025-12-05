import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // sesuaikan jika port/host berbeda
  timeout: 15000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("auth");
    if (raw) {
      const { token } = JSON.parse(raw) || {};
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const err = new Error(
      error?.response?.data?.message ||
      error?.message ||
      "Terjadi kesalahan. Coba lagi."
    );
    err.status = error?.response?.status;
    err.data = error?.response?.data;
    return Promise.reject(err);
  }
);

export default api;
