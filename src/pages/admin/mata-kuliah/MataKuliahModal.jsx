import { useEffect, useState } from "react";
import Modal from "../../../design-system/organisms/Modal/Modal";
import Label from "../../../design-system/atoms/Label/Label";
import Input from "../../../design-system/atoms/Input/Input";
import Button from "../../../design-system/atoms/Button/Button";
import { toastError } from "../../../utils/toast";

export default function MataKuliahModal({ open, onClose, onSubmit, selected }) {
  if (!open) return null;

  const [form, setForm] = useState({ kode: "", nama: "", sks: 2, status: true });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selected) {
      setForm({
        kode: selected.kode ?? "",
        nama: selected.nama ?? "",
        sks: Number.isFinite(+selected.sks) ? +selected.sks : 2,
        status: !!selected.status,
      });
    } else {
      setForm({ kode: "", nama: "", sks: 2, status: true });
    }
    setErrors({});
  }, [selected, open]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : (name === "sks" ? Number(value) : value) }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.kode) er.kode = "Kode wajib diisi";
    if (!form.nama) er.nama = "Nama wajib diisi";
    if (!Number.isFinite(+form.sks) || +form.sks <= 0) er.sks = "SKS harus angka > 0";
    return er;
  };

  const submit = (e) => {
    e.preventDefault();
    const er = validate(); setErrors(er);
    if (Object.keys(er).length) return toastError("Periksa kembali input Anda");
    onSubmit({ ...form, sks: +form.sks, status: !!form.status });
  };

  return (
    <Modal open={open} onClose={onClose} title={selected ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}>
      <form className="space-y-4" onSubmit={submit}>
        <div>
          <Label htmlFor="kode">Kode</Label>
          <Input id="kode" name="kode" value={form.kode} onChange={handleChange} className={errors.kode ? "border-red-500" : ""} />
          {errors.kode && <p className="text-sm text-red-600 mt-1">{errors.kode}</p>}
        </div>
        <div>
          <Label htmlFor="nama">Nama</Label>
          <Input id="nama" name="nama" value={form.nama} onChange={handleChange} className={errors.nama ? "border-red-500" : ""} />
          {errors.nama && <p className="text-sm text-red-600 mt-1">{errors.nama}</p>}
        </div>
        <div>
          <Label htmlFor="sks">SKS</Label>
          <Input id="sks" name="sks" type="number" min={1} value={form.sks} onChange={handleChange} className={errors.sks ? "border-red-500" : ""} />
          {errors.sks && <p className="text-sm text-red-600 mt-1">{errors.sks}</p>}
        </div>
        <div className="flex items-center gap-2">
          <input id="status" name="status" type="checkbox" checked={form.status} onChange={handleChange} />
          <Label htmlFor="status" className="!mb-0">Aktif</Label>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" onClick={onClose} className="bg-gray-400 text-white hover:bg-gray-500">Batal</Button>
          <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">{selected ? "Simpan" : "Tambah"}</Button>
        </div>
      </form>
    </Modal>
  );
}
