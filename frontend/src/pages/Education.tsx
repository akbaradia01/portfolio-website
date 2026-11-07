import React from 'react';

export default function Education() {
  return (
    <section className="min-h-screen bg-ink-950 text-white py-12 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header Judul Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-widest text-amber-500 uppercase flex items-center justify-center gap-2">
            <span>🎓</span> EDUCATION
          </h2>
        </div>

        {/* Informasi Kampus & Gelar */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-white/10 space-y-6 backdrop-blur-md shadow-xl">
          <div className="flex items-start gap-4">
            {/* Logo Universitas dengan object-contain agar tidak ter-zoom */}
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-white/10 flex-shrink-0 flex items-center justify-center p-1">
              <img 
                src="/LOGO_UAI.jpeg" 
                alt="Logo Universitas Al-Azhar Indonesia" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline flex-wrap">
                <h3 className="text-xl font-bold text-white">S1 Informatika</h3>
                <span className="text-slate-400 font-semibold text-sm">2021 – 2026</span>
              </div>
              <p className="text-slate-300">Universitas Al-Azhar Indonesia</p>
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Section Skripsi & Foto Diri */}
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3">
              UNDERGRADUATE THESIS PROJECT:
            </p>

            {/* Bagian Judul Skripsi & Foto */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0b101b] p-5 rounded-xl border border-white/5">
              {/* Teks Judul Skripsi */}
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="text-base md:text-lg font-bold text-white leading-relaxed uppercase">
                  KLASIFIKASI KELULUSAN TEPAT WAKTU MAHASISWA INFORMATIKA UNIVERSITAS AL-AZHAR INDONESIA
                </h4>
                <p className="text-xs text-cyan-400 mt-3">
                  Machine Learning | Klasifikasi Data | Data Science
                </p>
              </div>

              {/* Foto Diri dengan Border Neon Menyesuaikan Gambar */}
              <div className="inline-block rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] bg-black/40">
                <img 
                  src="/foto_sidang.jpeg" 
                  alt="Aditia Ihsan Akbar" 
                  className="block w-full max-w-[280px] h-auto object-cover"
                />
              </div>
            </div>

            {/* 3 KOLOM GAMBAR EVALUASI DENGAN EFEK INTERAKTIF (HOVER) */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* 1. KIRI: Heatmap Korelasi */}
              <div className="bg-[#0b101b] p-4 rounded-xl border border-white/5 flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer group">
                <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 text-center truncate w-full group-hover:text-cyan-400 transition-colors">
                  Heatmap Korelasi Analisis
                </h5>
                <div className="w-full h-48 rounded-lg overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                  <img 
                    src="/Heatmap_Korelasi.png" 
                    alt="Heatmap Korelasi" 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* 2. TENGAH: Confusion Matrix */}
              <div className="bg-[#0b101b] p-4 rounded-xl border border-white/5 flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer group">
                <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 text-center truncate w-full group-hover:text-cyan-400 transition-colors">
                  Confusion Matrix
                </h5>
                <div className="w-full h-48 rounded-lg overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                  <img 
                    src="/Confusion_Matrix.png"
                    alt="Confusion Matrix" 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* 3. KANAN: Hasil Evaluasi */}
              <div className="bg-[#0b101b] p-4 rounded-xl border border-white/5 flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer group">
                <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 text-center truncate w-full group-hover:text-cyan-400 transition-colors">
                  Hasil Evaluasi RF & SVM
                </h5>
                <div className="w-full h-48 rounded-lg overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                  <img 
                    src="/Evaluasi.png" 
                    alt="Hasil Evaluasi" 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}