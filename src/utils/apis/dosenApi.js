// src/utils/apis/dosenApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE_PATH = "/dosen";

// GET /dosen
export const getDosenList = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}${RESOURCE_PATH}`, {
    params,
  });
  return response.data;
};

// GET /dosen/:id
export const getDosenById = async (id) => {
  if (!id && id !== 0) {
    throw new Error("ID Dosen wajib diisi");
  }
  const response = await axios.get(`${API_BASE_URL}${RESOURCE_PATH}/${id}`);
  return response.data;
};

// POST /dosen
export const createDosen = async (payload) => {
  const response = await axios.post(
    `${API_BASE_URL}${RESOURCE_PATH}`,
    payload
  );
  return response.data;
};

// PUT /dosen/:id
export const updateDosen = async (id, payload) => {
  if (!id && id !== 0) {
    throw new Error("ID Dosen wajib diisi");
  }
  const response = await axios.put(
    `${API_BASE_URL}${RESOURCE_PATH}/${id}`,
    payload
  );
  return response.data;
};

// DELETE /dosen/:id
export const deleteDosen = async (id) => {
  if (!id && id !== 0) {
    throw new Error("ID Dosen wajib diisi");
  }
  const response = await axios.delete(
    `${API_BASE_URL}${RESOURCE_PATH}/${id}`
  );
  return response.data;
};
