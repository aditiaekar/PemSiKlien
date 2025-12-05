import { useEffect, useState, useMemo } from "react";
import Modal from "../../../design-system/organisms/Modal/Modal";
import Label from "../../../design-system/atoms/Label/Label";
import Button from "../../../design-system/atoms/Button/Button";
import { useKelasOptions } from "../../../utils/hooks/useKelasQuery";

export default function KelasModal({
  isModalOpen,
  onClose,
  onSubmit,
  selectedKelas,
}) {
  const [form, setForm] = useState({
    matakuliah_id: "",
    dosen_id: "",
    mahasiswa_ids: [],
  });
  const [errors, setErrors] = useState({});

  const { data: options, isLoading } = useKelasOptions();

  useEffect(() => {
    if (isModalOpen) {
      if (selectedKelas) {
        setForm({
          matakuliah_id: selectedKelas.matakuliah_id,
          dosen_id: selectedKelas.dosen_id,
          mahasiswa_ids: selectedKelas.mahasiswa_ids || [],
        });
      } else {
        setForm({ matakuliah_id: "", dosen_id: "", mahasiswa_ids: [] });
      }
      setErrors({});
    }
  }, [selectedKelas, isModalOpen]);

  const bebanSKS = useMemo(() => {
    if (!options?.matkul || !form.matakuliah_id) return 0;

    const mk = options.matkul.find((m) => m.id == form.matakuliah_id);
    return mk ? parseInt(mk.sks) : 0;
  }, [options?.matkul, form.matakuliah_id]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "matakuliah_id") {
      setForm((prev) => ({ ...prev, matakuliah_id: value, mahasiswa_ids: [] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleToggleMahasiswa = (studentId) => {
    setForm((prev) => {
      const exists = prev.mahasiswa_ids.includes(studentId);
      let newIds;
      if (exists) {
        newIds = prev.mahasiswa_ids.filter((id) => id !== studentId);
      } else {
        newIds = [...prev.mahasiswa_ids, studentId];
      }
      return { ...prev, mahasiswa_ids: newIds };
    });
  };

  const validate = () => {
    const err = {};
    if (!form.matakuliah_id) err.matakuliah_id = "Mata kuliah wajib dipilih";
    if (!form.dosen_id) err.dosen_id = "Dosen wajib dipilih";
    if (form.mahasiswa_ids.length === 0)
      err.mahasiswa_ids = "Minimal pilih 1 mahasiswa";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;
    onSubmit(form);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={onClose}
      title={selectedKelas ? "Edit Kelas" : "Buat Kelas Baru"}
    >
      {isLoading ? (
        <div className="p-4 text-center">Memuat data referensi...</div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="matakuliah_id">Mata Kuliah</Label>
            <select
              id="matakuliah_id"
              name="matakuliah_id"
              value={form.matakuliah_id}
              onChange={handleChange}
              className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.matakuliah_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">-- Pilih Mata Kuliah --</option>
              {options?.matkul?.map((mk) => (
                <option key={mk.id} value={mk.id}>
                  {mk.kode} - {mk.nama} ({mk.sks} SKS)
                </option>
              ))}
            </select>
            {errors.matakuliah_id && (
              <p className="text-sm text-red-600 mt-1">
                {errors.matakuliah_id}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="dosen_id">Dosen Pengampu</Label>
            <select
              id="dosen_id"
              name="dosen_id"
              value={form.dosen_id}
              onChange={handleChange}
              className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.dosen_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">-- Pilih Dosen --</option>
              {options?.dosen?.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nidn} - {d.nama}
                </option>
              ))}
            </select>
            {errors.dosen_id && (
              <p className="text-sm text-red-600 mt-1">{errors.dosen_id}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Pilih Mahasiswa</Label>

            {!form.matakuliah_id && (
              <div className="bg-yellow-50 text-yellow-800 p-3 rounded text-sm mb-2 border border-yellow-200">
                ⚠ Pilih <b>Mata Kuliah</b> terlebih dahulu.
              </div>
            )}

            <div
              className={`border rounded-lg p-3 max-h-60 overflow-y-auto bg-gray-50 ${
                errors.mahasiswa_ids ? "border-red-500" : "border-gray-300"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {options?.mahasiswa?.map((mhs) => {
                  // Logic SKS (Data mock dari service)
                  const currentSKS = parseInt(mhs.current_sks || 0);
                  const maxSKS = parseInt(mhs.max_sks || 24);
                  const prediksiTotal = currentSKS + bebanSKS;

                  const isSelected = form.mahasiswa_ids.includes(mhs.id);
                  const isOverLimit = prediksiTotal > maxSKS;
                  const isDisabled =
                    !form.matakuliah_id || (isOverLimit && !isSelected);

                  return (
                    <div
                      key={mhs.id}
                      className={`flex items-start p-2 rounded border transition-colors ${
                        isDisabled
                          ? "bg-gray-200 opacity-60 cursor-not-allowed"
                          : "bg-white hover:bg-blue-50 cursor-pointer"
                      }`}
                      onClick={() =>
                        !isDisabled && handleToggleMahasiswa(mhs.id)
                      }
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        disabled={isDisabled}
                        readOnly
                        className="mt-1 mr-2 cursor-pointer"
                      />
                      <div className="flex-1 text-sm">
                        <div className="font-semibold text-gray-800">
                          {mhs.nama}{" "}
                          <span className="text-gray-400 font-normal">
                            ({mhs.nim})
                          </span>
                        </div>
                        <div className="text-xs mt-0.5 flex justify-between">
                          <span
                            className={
                              isOverLimit
                                ? "text-red-600 font-bold"
                                : "text-gray-500"
                            }
                          >
                            SKS: {currentSKS} / {maxSKS}
                          </span>
                          {isOverLimit && !isSelected && (
                            <span className="text-red-600 font-bold text-[10px] uppercase ml-1 border border-red-200 px-1 rounded bg-red-50">
                              Penuh
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {errors.mahasiswa_ids && (
              <p className="text-sm text-red-600 mt-1">
                {errors.mahasiswa_ids}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {selectedKelas ? "Simpan Perubahan" : "Simpan"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
