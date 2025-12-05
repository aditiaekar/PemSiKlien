import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerUser } from "../../services/authService";
import { toastSuccess, toastError } from "../../utils/toast";
import Card from "../../design-system/molecules/Card/Card";
import Label from "../../design-system/atoms/Label/Label";
import Input from "../../design-system/atoms/Input/Input";
import Button from "../../design-system/atoms/Button/Button";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toastError("Nama, email, dan password wajib diisi");
    if (form.password !== form.password_confirmation) return toastError("Konfirmasi password tidak cocok");

    try {
      setLoading(true);
      await registerUser(form);
      toastSuccess("Registrasi berhasil");
      navigate("/login");
    } catch (err) {
      toastError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <Card title="Registrasi">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="name">Nama</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
            <Input id="password_confirmation" name="password_confirmation" type="password" value={form.password_confirmation} onChange={handleChange} required />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-blue-600 text-white hover:bg-blue-700">
            {loading ? "Mendaftarkan..." : "Daftar"}
          </Button>
          <p className="text-sm text-center text-gray-600">
            Sudah punya akun? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
