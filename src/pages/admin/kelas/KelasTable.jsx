import Button from "../../../design-system/atoms/Button/Button";
import { Link } from "react-router-dom";

export default function KelasTable({ kelas, openEditModal, onDelete }) {
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">Mata Kuliah</th>
          <th className="py-2 px-4 text-left">Dosen Pengampu</th>
          <th className="py-2 px-4 text-center">Jumlah Mahasiswa</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {(kelas || []).map((k, i) => (
          <tr key={k.id} className={i % 2 ? "bg-gray-100" : "bg-white"}>
            <td className="py-2 px-4">
              <div className="font-medium text-gray-900">
                {k.matakuliah?.nama || "Unknown Matkul"}
              </div>
              <div className="flex gap-2 text-xs mt-1">
                <span className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">
                  {k.matakuliah?.kode}
                </span>
                <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                  {k.matakuliah?.sks} SKS
                </span>
              </div>
            </td>

            <td className="py-2 px-4">
              {k.dosen ? (
                <div>
                  <div className="font-medium">{k.dosen.nama}</div>
                  <div className="text-xs text-gray-500">
                    NIDN: {k.dosen.nidn}
                  </div>
                </div>
              ) : (
                <span className="text-red-500 italic">
                  Dosen tidak ditemukan
                </span>
              )}
            </td>

            <td className="py-2 px-4 text-center">
              <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                {k.mahasiswa_ids?.length || 0} Orang
              </span>
            </td>

            <td className="py-2 px-4 text-center space-x-2">
              <Link
                to={`/admin/kelas/${k.id}`}
                state={{ kelas: k }}
                className="inline-block bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700"
              >
                Detail
              </Link>

              <Button
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                onClick={() => openEditModal(k)}
              >
                Edit
              </Button>

              <Button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => onDelete(k)}
              >
                Hapus
              </Button>
            </td>
          </tr>
        ))}

        {(!kelas || kelas.length === 0) && (
          <tr>
            <td className="py-8 px-4 text-center text-gray-500" colSpan={4}>
              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold">Belum ada data kelas.</p>
                <p className="text-xs">Silakan tambah kelas baru.</p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
