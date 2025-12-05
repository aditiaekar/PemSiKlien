// src/pages/admin/mahasiswa/MahasiswaTable.jsx
import Button from "../../../design-system/atoms/Button/Button";
import { Link } from "react-router-dom";

export default function MahasiswaTable({ mahasiswa, openEditModal, onDelete }) {
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">NIM</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-left">Status</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {mahasiswa.map((m, i) => (
          <tr key={m.id ?? m.nim} className={i % 2 ? "bg-gray-100" : "bg-white"}>
            <td className="py-2 px-4">{m.nim}</td>
            <td className="py-2 px-4">{m.nama}</td>
            <td className="py-2 px-4">
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  m.status ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
                }`}
              >
                {m.status ? "Aktif" : "Nonaktif"}
              </span>
            </td>
            <td className="py-2 px-4 text-center space-x-2">
              <Link
                to={`/admin/mahasiswa/${m.nim}`}
                state={{ mahasiswa: m }}
                className="inline-block bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700"
              >
                Detail
              </Link>

              <Button
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                onClick={() => openEditModal(m)}     // ← kirim object m
              >
                Edit
              </Button>

              <Button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => onDelete(m)}           // ← kirim object m
              >
                Hapus
              </Button>
            </td>
          </tr>
        ))}
        {mahasiswa.length === 0 && (
          <tr>
            <td className="py-4 px-4 text-center text-gray-500" colSpan={4}>
              Belum ada data.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
