import React from "react";
import Card from "../../design-system/molecules/Card/Card";

// Import Komponen Baru
import GPATrendChart from "../../design-system/molecules/Charts/GPATrendChart";
import EnrollmentBarChart from "../../design-system/molecules/Charts/EnrollmentBarChart";
import StudentStatusPieChart from "../../design-system/molecules/Charts/StudentStatusPieChart";

// --- DATA DUMMY AKADEMIK ---

// 1. Data Tren IPK Rata-rata per Semester
const dataIPK = [
  { semester: "Sem 1", ipk: 3.2 },
  { semester: "Sem 2", ipk: 3.4 },
  { semester: "Sem 3", ipk: 3.1 }, // Ada penurunan
  { semester: "Sem 4", ipk: 3.5 }, // Naik lagi
  { semester: "Sem 5", ipk: 3.6 },
  { semester: "Sem 6", ipk: 3.8 },
];

// 2. Data Matakuliah Paling Diminati (Jumlah Mahasiswa)
const dataPeminatan = [
  { matkul: "Pemrograman Web", jumlah: 120 },
  { matkul: "Kecerdasan Buatan", jumlah: 95 },
  { matkul: "Basis Data", jumlah: 110 },
  { matkul: "Jaringan Komputer", jumlah: 85 },
  { matkul: "UI/UX Design", jumlah: 130 },
];

// 3. Data Status Mahasiswa
const dataStatus = [
  { status: "Aktif", value: 850 },
  { status: "Cuti", value: 45 },
  { status: "Drop Out", value: 15 },
  { status: "Lulus", value: 200 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Akademik
          </h1>
          <p className="text-gray-500 text-sm">
            Monitoring performa mahasiswa dan perkuliahan.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Tren IPK (Full Width) */}
        <div className="lg:col-span-2">
          <Card title="Tren Rata-rata IPK Mahasiswa">
            <GPATrendChart data={dataIPK} />
          </Card>
        </div>

        {/* CHART 2: Peminatan Matkul (Bar Chart) */}
        <Card title="Matakuliah Paling Diminati">
          <EnrollmentBarChart data={dataPeminatan} />
        </Card>

        {/* CHART 3: Status Mahasiswa (Pie Chart) */}
        <Card title="Distribusi Status Mahasiswa">
          <StudentStatusPieChart data={dataStatus} />
        </Card>
      </div>
    </div>
  );
}
