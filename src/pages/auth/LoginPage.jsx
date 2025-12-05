// src/pages/auth/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider"; // pakai login dari context
import { toastSuccess, toastError, toastInfo } from "../../utils/toast";
import { confirmLogin } from "../../utils/swal";

import Card from "../../design-system/molecules/Card/Card";
import Label from "../../design-system/atoms/Label/Label";
import Input from "../../design-system/atoms/Input/Input";
import Button from "../../design-system/atoms/Button/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // login akan call API /users?email=... lalu cek password
  const [values, setValues] = useState({ email: "", password: "", remember: false });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      toastError("Email dan password wajib diisi");
      return;
    }

    const ok = await confirmLogin(values.email);
    if (!ok) {
      toastInfo("Login dibatalkan");
      return;
    }

    try {
      await login(values); // delegasi ke AuthProvider → simpan ke localStorage
      toastSuccess("Login berhasil");
      navigate("/admin");
    } catch (err) {
      toastError(err.message || "Email atau password salah");
    }
  };

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <Card title="Login">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={values.email} onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={values.password} onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))} required />
          </div>

          <label className="flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center">
              <input type="checkbox" className="mr-2" checked={values.remember} onChange={(e) => setValues((v) => ({ ...v, remember: e.target.checked }))} />
              Ingat saya
            </span>
            <span className="text-gray-400 cursor-not-allowed">Lupa password?</span>
          </label>

          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
            Login
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Daftar
          </Link>
        </p>
      </Card>
    </div>
  );
}
