import { useState } from "react"; // state lokal
import { useAuth } from "../../../app/providers/AuthProvider"; // akses logout

export default function Header({ title }) {
  // header topbar
  const { logout } = useAuth(); // action logout
  const [open, setOpen] = useState(false); // state dropdown

  return (
    <header className="bg-white shadow-md">
      {" "}
      {/* wrapper header */}
      <div className="flex justify-between items-center px-6 py-4">
        {" "}
        {/* baris utama */}
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1> {/* judul */}
        <div className="relative">
          {" "}
          {/* container dropdown */}
          <button
            onClick={() => setOpen(!open)} // toggle dropdown
            className="w-8 h-8 rounded-full bg-gray-300 focus:outline-none" // avatar dummy
            aria-label="Open user menu" // aksesibilitas
          />
          {open && ( // menu saat open
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
              {" "}
              {/* panel dropdown */}
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profile
              </a>{" "}
              {/* item */}
              <button onClick={logout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Logout
              </button>{" "}
              {/* logout */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
