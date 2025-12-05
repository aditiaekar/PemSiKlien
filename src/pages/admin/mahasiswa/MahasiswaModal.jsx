import { useEffect, useState } from "react";
import Modal from "../../../design-system/organisms/Modal/Modal";
import Label from "../../../design-system/atoms/Label/Label";
import Input from "../../../design-system/atoms/Input/Input";
import Button from "../../../design-system/atoms/Button/Button";

export default function MahasiswaModal({
  isModalOpen,
  onClose,
  onSubmit,
  selectedMahasiswa,
}) {
  // saat modal tertutup, jangan render (hemat & hindari event tak perlu)
  if (!isModalOpen) return null;

  const [form, setForm] = useState({ nim: "", nama: "", status: true });
  const [errors, setErrors] = useState({});

  // Prefill form ketika edit, reset ketika tambah
  useEffect(() => {
    if (selectedMahasiswa) {
      setForm({
        nim: selectedMahasiswa.nim,
        nama: selectedMahasiswa.nama,
        status: Boolean(selectedMahasiswa.status),
      });
    } else {
      setForm({ nim: "", nama: "", status: true });
    }
    setErrors({});
  }, [selectedMahasiswa, isModalOpen]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors(err => ({ ...err, [name]: undefined }));
  };

  const validate = () => {
    const err = {};
    const nim = form.nim.trim();
    const nama = form.nama.trim();
    if (!nim) err.nim = "NIM wajib diisi";
    else if (!/^\d+$/.test(nim)) err.nim = "NIM harus berupa angka";
    if (!nama) err.nama = "Nama wajib diisi";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;
    onSubmit({
      nim: form.nim.trim(),
      nama: form.nama.trim(),
      status: Boolean(form.status),
    });
    // onClose dipanggil di parent setelah sukses (agar error terlihat jika gagal)
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={onClose}
      title={selectedMahasiswa ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="nim">NIM</Label>
          <Input
            id="nim"
            name="nim"
            value={form.nim}
            onChange={handleChange}
            placeholder="Masukkan NIM"
            required
            className={errors.nim ? "border-red-500" : ""}
          />
          {errors.nim && <p className="text-sm text-red-600 mt-1">{errors.nim}</p>}
        </div>

        <div>
          <Label htmlFor="nama">Nama</Label>
          <Input
            id="nama"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Masukkan nama"
            required
            className={errors.nama ? "border-red-500" : ""}
          />
          {errors.nama && <p className="text-sm text-red-600 mt-1">{errors.nama}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input
            id="status"
            name="status"
            type="checkbox"
            checked={form.status}
            onChange={handleChange}
          />
          <Label htmlFor="status" className="!mb-0">Aktif</Label>
        </div>

        <div className="flex justify-end gap-2 pt-2">
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
            {selectedMahasiswa ? "Simpan Perubahan" : "Simpan"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
