// src/pages/admin/dosen/Dosen.jsx
import { useEffect, useState } from "react";
import Card from "../../../design-system/molecules/Card/Card";
import Button from "../../../design-system/atoms/Button/Button";
import { toastSuccess, toastError } from "../../../utils/toast";
import { confirmBeforeSave, confirm } from "../../../utils/swal";
import * as dosenAPI from "../../../services/dosenService";
import DosenTable from "./DosenTable";
import DosenModal from "./DosenModal";
import Pagination from "../../../design-system/molecules/Pagination/Pagination"; // ← tambahkan ini

export default function Dosen() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // state pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // jumlah baris per halaman

  const load = async () => {
    try {
      setLoading(true);
      const data = await dosenAPI.list();
      setRows(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      toastError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // clamp page kalau setelah delete jumlah halaman berkurang
  useEffect(() => {
    const totalPages = Math.max(
      1,
      Math.ceil(rows.length / perPage)
    );
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [rows, page]);

  const openAdd = () => {
    setSelected(null);
    setOpen(true);
  };

  const openEdit = (id) => {
    const found = rows.find((x) => String(x.id) === String(id));
    if (!found) return toastError("Data tidak ditemukan");
    setSelected(found);
    setOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      if (selected) {
        const ok = await confirmBeforeSave();
        if (!ok) return;
        await dosenAPI.update(selected.id, form);
        toastSuccess("Perubahan disimpan");
      } else {
        await dosenAPI.create(form);
        toastSuccess("Dosen ditambahkan");
      }
      setOpen(false);
      setSelected(null);
      await load();
    } catch (err) {
      toastError(err.message);
    }
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await confirm({
      title: "Hapus data?",
      text: `Data dosen dengan ID ${id} akan dihapus.`,
      icon: "warning",
      confirmText: "Ya, hapus",
    });
    if (!isConfirmed) return;

    try {
      await dosenAPI.remove(id);
      toastSuccess("Dosen dihapus");
      await load();
    } catch (err) {
      toastError(err.message);
    }
  };

  // hitung pagination
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pageRows = rows.slice(start, end); // ← hanya data halaman aktif

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Dosen</h2>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={openAdd}
        >
          + Tambah Dosen
        </Button>
      </div>

      <DosenTable
        rows={pageRows}             // ← gunakan pageRows, bukan rows
        loading={loading}
        openEditModal={openEdit}
        onDelete={handleDelete}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <DosenModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelected(null);
        }}
        onSubmit={handleSubmit}
        selected={selected}
      />
    </Card>
  );
}
