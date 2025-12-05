import Button from "../../../design-system/atoms/Button/Button";

export default function MataKuliahTable({ rows, loading, openEditModal, onDelete }) {
  if (loading) return <p className="text-gray-600">Memuat data...</p>;

  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">ID</th>
          <th className="py-2 px-4 text-left">Kode</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-left">SKS</th>
          <th className="py-2 px-4 text-left">Status</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r.id ?? i} className={i % 2 ? "bg-gray-100" : "bg-white"}>
            <td className="py-2 px-4">{r.id}</td>
            <td className="py-2 px-4">{r.kode}</td>
            <td className="py-2 px-4">{r.nama}</td>
            <td className="py-2 px-4">{r.sks}</td>
            <td className="py-2 px-4">
              <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${r.status ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>
                {r.status ? "Aktif" : "Nonaktif"}
              </span>
            </td>
            <td className="py-2 px-4 text-center space-x-2">
              <Button className="bg-yellow-500 text-white px-2 py-1 hover:bg-yellow-600" onClick={() => openEditModal(r.id)}>
                Edit
              </Button>
              <Button className="bg-red-500 text-white px-2 py-1 hover:bg-red-600" onClick={() => onDelete(r.id)}>
                Hapus
              </Button>
            </td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr>
            <td className="py-4 px-4 text-center text-gray-500" colSpan={6}>Belum ada data.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
