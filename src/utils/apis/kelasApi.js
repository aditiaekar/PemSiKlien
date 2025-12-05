// src/utils/apis/kelasApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE_PATH = "/kelas";

// GET /kelas
export const getKelasList = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}${RESOURCE_PATH}`, {
    params,
  });
  return response.data;
};

// GET /kelas/:id
export const getKelasById = async (id) => {
  if (!id && id !== 0) {
    throw new Error("ID Kelas wajib diisi");
  }
  const response = await axios.get(`${API_BASE_URL}${RESOURCE_PATH}/${id}`);
  return response.data;
};

// POST /kelas
export const createKelas = async (payload) => {
  const response = await axios.post(
    `${API_BASE_URL}${RESOURCE_PATH}`,
    payload
  );
  return response.data;
};

// PUT /kelas/:id
export const updateKelas = async (id, payload) => {
  if (!id && id !== 0) {
    throw new Error("ID Kelas wajib diisi");
  }
  const response = await axios.put(
    `${API_BASE_URL}${RESOURCE_PATH}/${id}`,
    payload
  );
  return response.data;
};

// DELETE /kelas/:id
export const deleteKelas = async (id) => {
  if (!id && id !== 0) {
    throw new Error("ID Kelas wajib diisi");
  }
  const response = await axios.delete(
    `${API_BASE_URL}${RESOURCE_PATH}/${id}`
  );
  return response.data;
};
