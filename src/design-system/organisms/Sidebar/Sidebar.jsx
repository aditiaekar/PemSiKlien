// src/design-system/organisms/Sidebar/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";

const baseItem = "flex items-center gap-3 px-4 py-2 rounded transition-colors";
const getItemClass = ({ isActive }) =>
  [
    baseItem,
    isActive ? "bg-blue-700 text-white" : "text-white/90 hover:bg-blue-700",
  ].join(" ");

export default function Sidebar() {
  const { hasRole } = useAuth();

  const isSuperAdmin = hasRole("super_admin");

  return (
    <aside className="bg-blue-800 text-white h-full w-64 shrink-0">
      <div className="flex items-center justify-between p-4 border-b border-blue-700">
        <span className="text-2xl font-bold">Admin</span>
      </div>

      <nav className="p-4 space-y-2">
        <NavLink to="/admin/dashboard" end className={getItemClass}>
          <span>Dashboard</span>
        </NavLink>

        {isSuperAdmin && (
          <>
            <NavLink to="/admin/mahasiswa" className={getItemClass}>
              <span>Mahasiswa</span>
            </NavLink>

            <NavLink to="/admin/dosen" className={getItemClass}>
              <span>Dosen</span>
            </NavLink>

            <NavLink to="/admin/kelas" className={getItemClass}>
              <span>Kelas</span>
            </NavLink>
          </>
        )}

        <NavLink to="/admin/mata-kuliah" className={getItemClass}>
          <span>Mata Kuliah</span>
        </NavLink>
      </nav>
    </aside>
  );
}
