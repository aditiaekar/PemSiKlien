// src/utils/apis/mataKuliahApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
// sesuaikan kalau endpoint-mu beda, misal /mata-kuliah
const RESOURCE_PATH = "/mataKuliah";

// GET /mataKuliah
export const getMataKuliahList = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}${RESOURCE_PATH}`, {
    params,
  });
  return response.data;
};

// GET /mataKuliah/:id
export const getMataKuliahById = async (id) => {
  if (!id && id !== 0) {
    throw new Error("ID Mata Kuliah wajib diisi");
  }
  const response = await axios.get(`${API_BASE_URL}${RESOURCE_PATH}/${id}`);
  return response.data;
};

// POST /mataKuliah
export const createMataKuliah = async (payload) => {
  const response = await axios.post(
    `${API_BASE_URL}${RESOURCE_PATH}`,
    payload
  );
  return response.data;
};

// PUT /mataKuliah/:id
export const updateMataKuliah = async (id, payload) => {
  if (!id && id !== 0) {
    throw new Error("ID Mata Kuliah wajib diisi");
  }
  const response = await axios.put(
    `${API_BASE_URL}${RESOURCE_PATH}/${id}`,
    payload
  );
  return response.data;
};

// DELETE /mataKuliah/:id
export const deleteMataKuliah = async (id) => {
  if (!id && id !== 0) {
    throw new Error("ID Mata Kuliah wajib diisi");
  }
  const response = await axios.delete(
    `${API_BASE_URL}${RESOURCE_PATH}/${id}`
  );
  return response.data;
};
