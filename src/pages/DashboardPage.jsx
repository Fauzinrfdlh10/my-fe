import { getUser } from "../services/auth";

const summaryItems = [
  "Response 401 menampilkan pesan khusus ketika akun belum terisi.",
  "Profil menampilkan username dan role dari localStorage.",
  "Password dapat diubah dan token JWT dapat dilihat melalui modal.",
];

export default function DashboardPage() {
  const user = getUser();

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">
          Pertemuan 12
        </p>
        <h2 className="mt-1 text-2xl font-bold">JWT Session &amp; Profile</h2>
        <p className="mt-2 max-w-xl text-sm text-blue-100">
          Praktikum ini mengimplementasikan autentikasi JWT dengan profil pengguna, ubah password, inspeksi token, dan
          perlindungan akses role.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium backdrop-blur">
          👋 Halo, {user?.username ?? "User"}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-400">Materi Aktif</p>
          <p className="mt-1 text-xl font-bold text-slate-900">JWT Session</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-400">Pertemuan</p>
          <p className="mt-1 text-xl font-bold text-blue-600">12</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-400">Fitur Mandate</p>
          <p className="mt-1 text-xl font-bold text-green-600">4 Selesai</p>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Ringkasan Praktikum
        </h3>
        <ul className="space-y-2">
          {summaryItems.map((item, index) => (
            <li
              key={index}
              className="rounded-md border-l-4 border-blue-400 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
