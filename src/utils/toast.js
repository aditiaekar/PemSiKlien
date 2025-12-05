// src/utils/toast.js
import toast from "react-hot-toast";

export const toastSuccess = (msg) => toast.success(msg);
export const toastError   = (msg) => toast.error(msg);
export const toastInfo    = (msg) => toast(msg);

// Optional helper untuk operasi async:
export const toastPromise = (promise, { loading = "Memproses...", success = "Berhasil", error = "Gagal" } = {}) =>
  toast.promise(promise, { loading, success, error });
