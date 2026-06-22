import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { clearAuthSession, getToken, getUser } from "../../services/auth";
import Button from "../atoms/Button";

export default function Header({ pageTitle, onToggleSidebar }) {
  const navigate = useNavigate();
  const user = getUser();

  const handleLihatToken = () => {
    const token = getToken();
    Swal.fire({
      title: "JWT Token",
      html: `<div style="text-align:left;word-break:break-all;background:#1e293b;color:#38bdf8;padding:12px;border-radius:8px;font-size:12px;max-height:200px;overflow-y:auto;font-family:monospace;">${token || "Token tidak ditemukan"}</div>`,
      confirmButtonText: "Tutup",
      width: 600,
    });
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Sesi login akan dihapus dari browser.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    });

    if (result.isConfirmed) {
      clearAuthSession();
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white/80 text-slate-800 backdrop-blur">
      <div className="flex w-full items-center justify-between px-4 py-4 md:px-6">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="mr-3 rounded-lg border border-slate-300 bg-white px-2 py-1 text-xl leading-none shadow-sm md:hidden"
          aria-label="Buka menu"
        >
          ☰
        </button>

        <div>
          <h1 className="text-lg font-semibold md:text-xl">Praktikum 12</h1>
          <p className="text-xs text-slate-500">{pageTitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 sm:inline-flex">
            {user?.username ?? "User"} ({user?.role ?? "-"})
          </span>
          <Button
            type="button"
            variant="secondary"
            className="px-3 py-1 text-xs"
            onClick={handleLihatToken}
          >
            Lihat Token
          </Button>
          <Button
            type="button"
            variant="danger"
            className="px-3 py-1 text-xs"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

