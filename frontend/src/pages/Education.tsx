// --- TAMBAHKAN IMPORT GAMBAR DI SINI ---
import logoUai from '../assets/LOGO_UAI.jpeg';
import logoSma from '../assets/LOGO_SMA.jpeg';
import logoSmp from '../assets/LOGO_SMPN250.png';

export default function Education() {
  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6 md:px-14">
      <div className="mx-auto max-w-5xl">
        
        {/* Header Judul Section */}
        <div className="mb-16">
          <p className="font-mono text-sm text-white mb-2 uppercase tracking-widest">
            // ACADEMIC
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase">
            EDUCATION
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative ml-4 md:ml-8 pl-8 md:pl-12 border-l-2 border-neutral-800 space-y-16">
          
          {/* ================= CARD 1: S1 UAI & SKRIPSI ================= */}
          <div className="relative group">
            {/* Timeline Dot */}
            <span className="absolute -left-[41px] md:-left-[57px] top-8 w-4 h-4 rounded-full bg-white ring-4 ring-[#0a0a0a] group-hover:scale-125 transition-transform" />
            
            <div className="flex flex-col p-6 md:p-8 rounded-3xl border border-neutral-800 bg-[#111] hover:border-neutral-600 transition-colors">
              
              {/* Info Kampus */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center p-2 shrink-0">
                  {/* MENGGUNAKAN VARIABEL IMPORT */}
                  <img src={logoUai} alt="UAI Logo" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">S.KOM</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Bachelor of Informatics</h3>
                  <p className="text-neutral-300 font-medium mb-1">Universitas Al-Azhar Indonesia</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Web development, software engineering, and system design.<br/>
                    Structured programming, problem-solving, and scalable applications.
                  </p>
                </div>
                <div className="md:text-right shrink-0 mt-2 md:mt-0">
                  <span className="font-mono text-sm text-neutral-500 bg-neutral-900 px-4 py-1.5 rounded-lg border border-neutral-800">2021 — 2026</span>
                </div>
              </div>

              <hr className="border-neutral-800 my-8" />

              {/* Detail Skripsi */}
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-4">
                  UNDERGRADUATE THESIS PROJECT:
                </p>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0a0a0a] p-6 rounded-2xl border border-white">
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-base md:text-lg font-bold text-white leading-relaxed uppercase">
                      KLASIFIKASI KELULUSAN TEPAT WAKTU MAHASISWA INFORMATIKA UNIVERSITAS AL-AZHAR INDONESIA
                    </h4>
                    {/* Warna Cyan diubah menjadi Putih */}
                    <p className="text-xs text-white mt-3 font-mono">
                      Machine Learning | Klasifikasi Data | Data Science
                    </p>
                  </div>

                  {/* Foto Sidang */}
                  <div className="inline-block rounded-xl overflow-hidden border border-neutral-700 shadow-xl bg-black/40">
                    <img 
                      src="/foto_sidang.jpeg" 
                      alt="Aditia Ihsan Akbar" 
                      className="block w-full max-w-[240px] h-auto object-cover"
                    />
                  </div>
                </div>

                {/* 3 Gambar Evaluasi */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Heatmap */}
                  {/* Border diubah menjadi putih */}
                  <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group">
                    <h5 className="text-[11px] font-semibold text-white uppercase tracking-wider mb-3 text-center w-full transition-colors">
                      Heatmap Korelasi
                    </h5>
                    <div className="w-full h-40 rounded-lg overflow-hidden border border-white/50 bg-[#111] flex items-center justify-center">
                      <img 
                        src="/Heatmap_Korelasi.png" 
                        alt="Heatmap Korelasi" 
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Confusion Matrix */}
                  <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group">
                    <h5 className="text-[11px] font-semibold text-white uppercase tracking-wider mb-3 text-center w-full transition-colors">
                      Confusion Matrix
                    </h5>
                    <div className="w-full h-40 rounded-lg overflow-hidden border border-white/50 bg-[#111] flex items-center justify-center">
                      <img 
                        src="/Confusion_Matrix.png"
                        alt="Confusion Matrix" 
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Hasil Evaluasi */}
                  <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group">
                    <h5 className="text-[11px] font-semibold text-white uppercase tracking-wider mb-3 text-center w-full transition-colors">
                      Hasil Evaluasi
                    </h5>
                    <div className="w-full h-40 rounded-lg overflow-hidden border border-white/50 bg-[#111] flex items-center justify-center">
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

          {/* ================= CARD 2: SMA ================= */}
          <div className="relative group">
            <span className="absolute -left-[41px] md:-left-[57px] top-8 w-4 h-4 rounded-full bg-white ring-4 ring-[#0a0a0a] group-hover:scale-125 transition-transform" />
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 rounded-3xl border border-neutral-800 bg-[#111] hover:border-neutral-600 transition-colors">
              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center p-2 shrink-0">
                {/* MENGGUNAKAN VARIABEL IMPORT */}
                <img src={logoSma} alt="SMA Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">IPS</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Senior High School</h3>
                <p className="text-neutral-300 font-medium mb-3">SMA Bakti Idhata</p>
                <p className="text-neutral-400 text-sm leading-relaxed">
                 Critical thinking, economic and social analysis, logical problem-solving, and foundational understanding of digital tools.
                </p>
              </div>
              <div className="md:text-right shrink-0 mt-2 md:mt-0">
                <span className="font-mono text-sm text-neutral-500 bg-neutral-900 px-4 py-1.5 rounded-lg border border-neutral-800">2018 — 2021</span>
              </div>
            </div>
          </div>

          {/* ================= CARD 3: SMP ================= */}
          <div className="relative group">
            <span className="absolute -left-[41px] md:-left-[57px] top-8 w-4 h-4 rounded-full bg-white ring-4 ring-[#0a0a0a] group-hover:scale-125 transition-transform" />
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 rounded-3xl border border-neutral-800 bg-[#111] hover:border-neutral-600 transition-colors">
              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center p-2 shrink-0">
                {/* MENGGUNAKAN VARIABEL IMPORT */}
                <img src={logoSmp} alt="SMP Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">SMP</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Junior High School</h3>
                <p className="text-neutral-300 font-medium mb-3">SMP Negeri 250 Jakarta</p>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Robust foundation in core studies supported by early exposure to technological tools.
                </p>
              </div>
              <div className="md:text-right shrink-0 mt-2 md:mt-0">
                <span className="font-mono text-sm text-neutral-500 bg-neutral-900 px-4 py-1.5 rounded-lg border border-neutral-800">2015 — 2018</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}