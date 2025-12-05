import api from "../lib/axios";

const transformKelasData = (kelasData, dosenList, mhsList, matkulList) => {
  return kelasData.map((k) => {
    const dosenObj = dosenList.find((d) => d.id === k.dosen_id);
    const matkulObj = matkulList.find((m) => m.id === k.matakuliah_id);
    const mhsObjList = (k.mahasiswa_ids || [])
      .map((id) => mhsList.find((m) => m.id === id))
      .filter(Boolean);

    return {
      ...k,
      dosen: dosenObj,
      matakuliah: matkulObj,
      mahasiswa: mhsObjList,
    };
  });
};

export async function list(page, perPage) {
  const [kelasRes, dosenRes, mhsRes, matkulRes] = await Promise.all([
    api.get("/kelas"),
    api.get("/dosen"),
    api.get("/mahasiswa"),
    api.get("/mata_kuliah"),
  ]);

  const rawKelas = kelasRes.data;

  const joinedData = transformKelasData(
    rawKelas,
    dosenRes.data,
    mhsRes.data,
    matkulRes.data
  );
  const total = joinedData.length;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedData = joinedData.slice(start, end);
  return {
    data: paginatedData,
    total: total,
  };
}

export async function getFormOptions() {
  const [dosenRes, mhsRes, matkulRes, kelasRes] = await Promise.all([
    api.get("/dosen"),
    api.get("/mahasiswa"),
    api.get("/mata_kuliah"),
    api.get("/kelas"),
  ]);

  const allKelas = kelasRes.data;
  const allMatkul = matkulRes.data;
  const allDosen = dosenRes.data;
  const allMhs = mhsRes.data;
  const dosenLoadMap = {};

  const mhsLoadMap = {};

  allKelas.forEach((k) => {
    const mk = allMatkul.find((m) => m.id === k.matakuliah_id);
    const sks = mk ? parseInt(mk.sks) : 0;

    if (k.dosen_id) {
      dosenLoadMap[k.dosen_id] = (dosenLoadMap[k.dosen_id] || 0) + sks;
    }

    if (k.mahasiswa_ids && Array.isArray(k.mahasiswa_ids)) {
      k.mahasiswa_ids.forEach((mhsId) => {
        mhsLoadMap[mhsId] = (mhsLoadMap[mhsId] || 0) + sks;
      });
    }
  });

  const mapMahasiswa = allMhs.map((m) => ({
    ...m,
    current_sks: mhsLoadMap[m.id] || 0,
    max_sks: 24,
  }));

  const mapDosen = allDosen.map((d) => ({
    ...d,
    current_beban: dosenLoadMap[d.id] || 0, // Beban saat ini
    max_sks: 12,
  }));

  return {
    dosen: mapDosen,
    mahasiswa: mapMahasiswa,
    matkul: allMatkul,
  };
}

export async function create(payload) {
  const { data } = await api.post("/kelas", payload);
  return data;
}

export async function update(id, payload) {
  const { data } = await api.put(`/kelas/${id}`, payload);
  return data;
}

export async function remove(id) {
  await api.delete(`/kelas/${id}`);
}
