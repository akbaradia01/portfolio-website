import { useState } from 'react';
import { FiMail, FiCheck } from 'react-icons/fi';

export default function EmailCopyToast() {
  const [copied, setCopied] = useState(false);
  const email = "aditiaihsan.akbar@example.com"; // Sesuaikan dengan email Anda

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all shadow-sm group"
      >
        {copied ? <FiCheck className="text-emerald-400" /> : <FiMail className="text-cyan-400" />}
        <span className="text-sm font-mono">{copied ? "Email Disalin!" : "Salin Email"}</span>
      </button>

      {/* Toast Pop-up Notifikasi Neon */}
      {copied && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-bounce whitespace-nowrap z-50">
          ✨ Tersalin ke Clipboard!
        </div>
      )}
    </div>
  );
}