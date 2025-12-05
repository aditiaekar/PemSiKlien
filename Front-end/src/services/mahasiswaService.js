// src/services/mahasiswaService.js
import api from "../lib/axios";

export async function list() {
  const { data } = await api.get("/mahasiswa");
  return data;
}

export async function create(payload) {
  const { data } = await api.post("/mahasiswa", payload);
  return data;
}

export async function update(id, payload) {
  const { data } = await api.put(`/mahasiswa/${id}`, payload);
  return data;
}

export async function remove(id) {
  await api.delete(`/mahasiswa/${id}`);
}
