// src/utils/swal.js
import Swal from "sweetalert2";

// Konfirmasi umum (dipakai ulang)
export function confirm({ title, text, confirmText = "Ya", cancelText = "Batal", icon = "question" }) {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    focusCancel: true,
  });
}

export async function confirmLogin(email) {
  const res = await Swal.fire({
    title: "Login sekarang?",
    text: `Anda akan masuk sebagai ${email}.`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya, login",
    cancelButtonText: "Batal",
    reverseButtons: true,
    focusCancel: true,
  });
  return res.isConfirmed;
}

// Shortcut sesuai kebutuhan tugas:
export async function confirmLogout() {
  const res = await confirm({ title: "Logout?", text: "Anda akan keluar dari sesi admin.", confirmText: "Ya, logout" });
  return res.isConfirmed;
}

export async function confirmDeleteMahasiswa(nim) {
  const res = await confirm({
    title: "Hapus data?",
    text: `Data mahasiswa dengan NIM ${nim} akan dihapus permanen.`,
    confirmText: "Ya, hapus",
    icon: "warning",
  });
  return res.isConfirmed;
}

export async function confirmBeforeSave() {
  const res = await confirm({
    title: "Simpan perubahan?",
    text: "Perubahan data mahasiswa akan disimpan.",
    confirmText: "Simpan",
  });
  return res.isConfirmed;
}
