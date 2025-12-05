// src/pages/admin/mahasiswa/Mahasiswa.jsx
import Card from "../../../design-system/molecules/Card/Card";
import Button from "../../../design-system/atoms/Button/Button";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";
import { useState } from "react";

import { useMahasiswaQuery } from "../../../utils/hooks/useMahasiswaQuery";
import { toastSuccess, toastError } from "../../../utils/toast";
import { confirmBeforeSave, confirmDeleteMahasiswa } from "../../../utils/swal";
import Pagination from "../../../design-system/molecules/Pagination/Pagination";

export default function Mahasiswa() {
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const {
    mahasiswa,
    isLoading,
    total,
    isError,
    error,
    createMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
  } = useMahasiswaQuery(page, perPage);

  const totalPages = Math.max(1, Math.ceil(total / perPage));
  console.log("MAHASISWA PAGINATION", {
  total,
  perPage,
  totalPages,
  length: mahasiswa.length,
});


  const openAddModal = () => {
    setSelected(null);
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    setSelected(row);
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    if (selected) {
      const ok = await confirmBeforeSave();
      if (!ok) return;

      await updateMahasiswa({ id: selected.id, data: form });
      toastSuccess("Data mahasiswa diperbarui");
    } else {
      await createMahasiswa(form);
      toastSuccess("Data mahasiswa ditambahkan");
    }
    setModalOpen(false);
    setSelected(null);
  };

  const handleDelete = async (row) => {
    const ok = await confirmDeleteMahasiswa(row.nim);
    if (!ok) return;

    await deleteMahasiswa(row.id);
    toastSuccess("Data mahasiswa dihapus");
  };

  if (isLoading) {
    return <div className="p-6">Loading data mahasiswa...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-600">Error: {error.message}</div>;
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Mahasiswa</h2>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={openAddModal}
        >
          + Tambah Mahasiswa
        </Button>
      </div>

      <MahasiswaTable
        mahasiswa={mahasiswa}
        openEditModal={openEditModal}
        onDelete={handleDelete}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage}/>

      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelected(null);
        }}
        onSubmit={handleSubmit}
        selectedMahasiswa={selected}
      />
    </Card>
  );
}
