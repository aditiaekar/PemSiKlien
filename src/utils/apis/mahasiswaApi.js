// src/utils/apis/mahasiswaApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE_PATH = "/mahasiswa";

// GET /mahasiswa?...
export const getMahasiswaList = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}${RESOURCE_PATH}`, {
    params,
  });
  return response.data;
};

// GET /mahasiswa/:id
export const getMahasiswaById = async (id) => {
  if (!id && id !== 0) {
    throw new Error("ID Mahasiswa wajib diisi");
  }
  const response = await axios.get(`${API_BASE_URL}${RESOURCE_PATH}/${id}`);
  return response.data;
};

// POST /mahasiswa
export const createMahasiswa = async (payload) => {
  const response = await axios.post(
    `${API_BASE_URL}${RESOURCE_PATH}`,
    payload
  );
  return response.data;
};

// PUT /mahasiswa/:id
export const updateMahasiswa = async (id, payload) => {
  if (!id && id !== 0) {
    throw new Error("ID Mahasiswa wajib diisi");
  }
  const response = await axios.put(
    `${API_BASE_URL}${RESOURCE_PATH}/${id}`,
    payload
  );
  return response.data;
};

// DELETE /mahasiswa/:id
export const deleteMahasiswa = async (id) => {
  if (!id && id !== 0) {
    throw new Error("ID Mahasiswa wajib diisi");
  }
  const response = await axios.delete(
    `${API_BASE_URL}${RESOURCE_PATH}/${id}`
  );
  return response.data;
};
