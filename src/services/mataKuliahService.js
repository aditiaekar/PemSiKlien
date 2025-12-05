import api from "../lib/axios";

export async function list() {
  const { data } = await api.get("/mata_kuliah");
  return data;
}
export async function create(body) {
  const { data } = await api.post("/mata_kuliah", body);
  return data;
}
export async function update(id, body) {
  const { data } = await api.put(`/mata_kuliah/${id}`, body);
  return data;
}
export async function remove(id) {
  const { data } = await api.delete(`/mata_kuliah/${id}`);
  return data;
}
