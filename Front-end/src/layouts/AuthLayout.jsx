import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Outlet />
    </main>
  );
}
