// src/app/guards/RequireRole.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function RequireRole({
  allowedRoles = [],
  allowedPermissions = [],
  children,
}) {
  const { user, hasRole, hasPermission } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const roles = user.roles || [];

  // super_admin boleh semua
  if (roles.includes("super_admin")) {
    return children;
  }

  const okRole =
    allowedRoles.length > 0 && hasRole(...allowedRoles);

  const okPerm =
    allowedPermissions.length > 0 && hasPermission(...allowedPermissions);

  if (allowedRoles.length === 0 && allowedPermissions.length === 0) {
    return children;
  }

  if (okRole || okPerm) {
    return children;
  }

  return (
    <div className="p-6 text-red-600">
      403 Forbidden – Anda tidak punya akses ke halaman ini.
    </div>
  );
}
