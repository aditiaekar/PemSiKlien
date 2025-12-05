import { useParams, Link } from "react-router-dom";

export default function MahasiswaDetail() {
  const { nim } = useParams();

  // Demo: di real app, fetch detail by NIM; di sini mock minimal
  const detail = {
    nim,
    nama: "Nama Mahasiswa",
    prodi: "Teknik Informatika",
    angkatan: 2021,
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Detail Mahasiswa</h2>
        <Link to="/admin/mahasiswa" className="text-blue-600 hover:underline">
          ← Kembali ke daftar
        </Link>
      </div>

      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <dt className="text-gray-500">NIM</dt>
          <dd className="font-medium">{detail.nim}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Nama</dt>
          <dd className="font-medium">{detail.nama}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Program Studi</dt>
          <dd className="font-medium">{detail.prodi}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Angkatan</dt>
          <dd className="font-medium">{detail.angkatan}</dd>
        </div>
      </dl>
    </div>
  );
}
