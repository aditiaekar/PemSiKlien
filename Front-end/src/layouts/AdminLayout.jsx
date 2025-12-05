// src/layouts/AdminLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider"; // ← pakai context
import Sidebar from "../design-system/organisms/Sidebar/Sidebar";
import { confirmLogout } from "../utils/swal";
import { toastSuccess } from "../utils/toast";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // ← ambil logout dari context

  const handleLogout = async () => {
    const ok = await confirmLogout();
    if (!ok) return;
    logout();                 // ← kosongkan state + localStorage via provider
    toastSuccess("Logout berhasil");
    navigate("/login");
  };

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md">
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">Admin</h1>
            <button onClick={handleLogout} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300">
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>

        <footer className="bg-white text-center py-4 shadow-inner text-sm text-gray-600">
          © 2025 Admin Dashboard. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
