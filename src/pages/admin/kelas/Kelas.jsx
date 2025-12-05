import Card from "../../../design-system/molecules/Card/Card";
import Button from "../../../design-system/atoms/Button/Button";
import KelasModal from "./KelasModal";
import KelasTable from "./KelasTable";
import { useState } from "react";

import { useKelasQuery } from "../../../utils/hooks/useKelasQuery";
import { toastSuccess } from "../../../utils/toast";
import { confirmBeforeSave, confirmDeleteMahasiswa } from "../../../utils/swal";
import Pagination from "../../../design-system/molecules/Pagination/Pagination";

export default function Kelas() {
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const {
    kelas,
    isLoading,
    total,
    isError,
    error,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useKelasQuery(page, perPage);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

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

      await updateMutation({ id: selected.id, data: form });
      toastSuccess("Data kelas diperbarui");
    } else {
      await createMutation(form);
      toastSuccess("Data kelas ditambahkan");
    }
    setModalOpen(false);
    setSelected(null);
  };

  const handleDelete = async (row) => {
    const ok = await confirmDeleteMahasiswa(row.nim);
    if (!ok) return;

    await deleteMutation(row.id);
    toastSuccess("Data kelas dihapus");
  };

  if (isLoading) {
    return <div className="p-6">Loading data kelas...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-600">Error: {error.message}</div>;
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Kelas</h2>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={openAddModal}
        >
          + Tambah Kelas
        </Button>
      </div>

      <KelasTable
        kelas={kelas}
        openEditModal={openEditModal}
        onDelete={handleDelete}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <KelasModal
        isModalOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelected(null);
        }}
        onSubmit={handleSubmit}
        selectedKelas={selected}
      />
    </Card>
  );
}
