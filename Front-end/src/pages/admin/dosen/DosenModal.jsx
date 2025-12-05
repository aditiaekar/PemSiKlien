import { useEffect, useState } from "react";
import Modal from "../../../design-system/organisms/Modal/Modal";
import Label from "../../../design-system/atoms/Label/Label";
import Input from "../../../design-system/atoms/Input/Input";
import Button from "../../../design-system/atoms/Button/Button";
import { toastError } from "../../../utils/toast";

export default function DosenModal({ open, onClose, onSubmit, selected }) {
  if (!open) return null;

  const [form, setForm] = useState({ nidn: "", nama: "", status: true });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selected) setForm({ nidn: selected.nidn ?? "", nama: selected.nama ?? "", status: !!selected.status });
    else setForm({ nidn: "", nama: "", status: true });
    setErrors({});
  }, [selected, open]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.nidn) er.nidn = "NIDN wajib diisi";
    else if (!/^\d+$/.test(form.nidn)) er.nidn = "NIDN harus angka";
    if (!form.nama) er.nama = "Nama wajib diisi";
    return er;
  };

  const submit = (e) => {
    e.preventDefault();
    const er = validate(); setErrors(er);
    if (Object.keys(er).length) return toastError("Periksa kembali input Anda");
    onSubmit({ ...form, status: !!form.status });
  };

  return (
    <Modal open={open} onClose={onClose} title={selected ? "Edit Dosen" : "Tambah Dosen"}>
      <form className="space-y-4" onSubmit={submit}>
        <div>
          <Label htmlFor="nidn">NIDN</Label>
          <Input id="nidn" name="nidn" value={form.nidn} onChange={handleChange} className={errors.nidn ? "border-red-500" : ""} />
          {errors.nidn && <p className="text-sm text-red-600 mt-1">{errors.nidn}</p>}
        </div>
        <div>
          <Label htmlFor="nama">Nama</Label>
          <Input id="nama" name="nama" value={form.nama} onChange={handleChange} className={errors.nama ? "border-red-500" : ""} />
          {errors.nama && <p className="text-sm text-red-600 mt-1">{errors.nama}</p>}
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
