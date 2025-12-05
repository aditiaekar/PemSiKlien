// src/services/authService.js
import api from "../lib/axios";

/**
 * LOGIN
 * - cek user by email & password
 * - ambil roles
 * - hit /roles untuk mapping ke permissions
 */
export async function login({ email, password }) {
  const { data: users } = await api.get("/users", {
    params: { email, password },
  });
  const user = users[0];

  if (!user) {
    const err = new Error("INVALID_CREDENTIAL");
    err.code = "INVALID_CREDENTIAL";
    throw err;
  }

  const roleIds = user.roles || [];
  let permissions = [];

  if (roleIds.length > 0) {
    const { data: allRoles } = await api.get("/roles");
    const attachedRoles = allRoles.filter((r) => roleIds.includes(r.id));

    const permSet = new Set();
    attachedRoles.forEach((role) => {
      (role.permissions || []).forEach((p) => permSet.add(p));
    });

    permissions = Array.from(permSet);
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    roles: roleIds,
    permissions,
  };
}

/**
 * REGISTER
 * - buat user baru di /users
 * - default role: viewer (misalnya)
 */
export async function register({ name, email, password }) {
  const { data: existing } = await api.get("/users", {
    params: { email },
  });

  if (existing.length > 0) {
    const err = new Error("EMAIL_TAKEN");
    err.code = "EMAIL_TAKEN";
    throw err;
  }

  const payload = {
    name,
    email,
    password,
    roles: ["viewer"],
  };

  const { data: created } = await api.post("/users", payload);
  return created;
}
