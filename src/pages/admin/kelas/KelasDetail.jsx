import { useParams, Link, useLocation } from "react-router-dom";

export default function KelasDetail() {
  const { id } = useParams();
  const { state } = useLocation();

  const detail = state?.kelas || {
    id: id,
    matakuliah: { nama: "-", sks: 0, kode: "-" },
    dosen: { nama: "-", nidn: "-" },
    mahasiswa: [],
    mahasiswa_ids: [],
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Detail Kelas</h2>
          <p className="text-sm text-gray-500">ID: {detail.id}</p>
        </div>
        <Link
          to="/admin/kelas"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
        >
          ← Kembali ke daftar
        </Link>
      </div>

      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 bg-gray-50 p-4 rounded-lg border">
        <div>
          <dt className="text-sm text-gray-500 mb-1">Mata Kuliah</dt>
          <dd className="font-semibold text-lg text-gray-900">
            {detail.matakuliah?.nama}
          </dd>
          <dd className="text-sm text-gray-600">
            Kode: {detail.matakuliah?.kode}
          </dd>
        </div>

        {/* INFO DOSEN */}
        <div>
          <dt className="text-sm text-gray-500 mb-1">Dosen Pengampu</dt>
          <dd className="font-semibold text-lg text-gray-900">
            {detail.dosen?.nama}
          </dd>
          <dd className="text-sm text-gray-600">NIDN: {detail.dosen?.nidn}</dd>
        </div>

        <div>
          <dt className="text-sm text-gray-500 mb-1">Beban SKS</dt>
          <dd className="font-medium text-gray-900">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
              {detail.matakuliah?.sks || 0} SKS
            </span>
          </dd>
        </div>

        <div>
          <dt className="text-sm text-gray-500 mb-1">Jumlah Mahasiswa</dt>
          <dd className="font-medium text-gray-900">
            {detail.mahasiswa_ids?.length || 0} Orang
          </dd>
        </div>
      </dl>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Mahasiswa Terdaftar
        </h3>

        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-center w-12">No</th>
                <th className="px-4 py-3">NIM</th>
                <th className="px-4 py-3">Nama Mahasiswa</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Cek apakah kita punya object mahasiswa (hasil join) */}
              {detail.mahasiswa && detail.mahasiswa.length > 0 ? (
                detail.mahasiswa.map((mhs, index) => (
                  <tr key={mhs.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-center">{index + 1}</td>
                    <td className="px-4 py-3 font-mono text-gray-800">
                      {mhs.nim}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {mhs.nama}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          mhs.status
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {mhs.status ? "Aktif" : "Non-Aktif"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-6 text-center text-gray-400 italic"
                  >
                    Data mahasiswa belum dimuat atau kosong.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
