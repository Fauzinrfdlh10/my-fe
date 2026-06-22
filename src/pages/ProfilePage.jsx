import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { getToken, getUser } from "../services/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CHANGE_PW_URL = API_BASE_URL?.replace(/\/api\/?$/, "") + "/change-password";

export default function ProfilePage() {
  const user = getUser();
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.new_password !== form.confirm_password) {
      return Swal.fire("Gagal", "Konfirmasi password tidak cocok.", "error");
    }

    if (form.new_password.length < 4) {
      return Swal.fire("Gagal", "Password baru minimal 4 karakter.", "error");
    }

    try {
      setLoading(true);
      await axios.put(
        CHANGE_PW_URL,
        {
          old_password: form.old_password,
          new_password: form.new_password,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            Accept: "application/json",
          },
        }
      );

      await Swal.fire("Berhasil", "Password berhasil diubah.", "success");
      setForm({ old_password: "", new_password: "", confirm_password: "" });
    } catch (error) {
      const msg =
        error.response?.data?.message || "Gagal mengubah password.";
      await Swal.fire("Gagal", msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold">Profil</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT — Profil LocalStorage */}
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 p-6 text-white">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-300">
              Profil LocalStorage
            </p>

            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/30 text-2xl font-bold uppercase text-white ring-2 ring-blue-400/50">
                {user?.username ? user.username.substring(0, 2).toUpperCase() : "US"}
              </div>
              <div>
                <h3 className="text-lg font-bold">{user?.username ?? "User"}</h3>
                <span className="mt-1 inline-block rounded-full bg-blue-500 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide">
                  {user?.role ?? "user"}
                </span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-blue-200">
              Data profil ini dibaca langsung dari sesi autentikasi pada localStorage.
            </p>

            <div className="mt-4 inline-flex rounded-lg bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              ID: {user?.id ?? "-"}
            </div>
          </div>
        </div>

        {/* RIGHT — Ubah Password */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Keamanan Akun
          </p>
          <h3 className="text-lg font-bold text-slate-900">Ubah Password</h3>
          <p className="mt-1 text-sm text-slate-500">
            Password lama diverifikasi sebelum password baru disimpan sebagai hash bcrypt.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Password Lama
              </label>
              <input
                type="password"
                name="old_password"
                value={form.old_password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Masukkan password lama"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Password Baru
              </label>
              <input
                type="password"
                name="new_password"
                value={form.new_password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Masukkan password baru"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                name="confirm_password"
                value={form.confirm_password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Ulangi password baru"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Ubah Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
