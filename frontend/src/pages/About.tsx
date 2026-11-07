import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { FiDownload, FiArrowRight } from 'react-icons/fi';

export default function About() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-8 md:py-12">
      {/* Judul Besar Ditarik ke Atas */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Who I <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]">
            Really Am
          </span>
        </h1>
      </div>

      {/* Grid Layout: Foto di Kiri, Teks di Kanan (Sejajar di Tengah Secara Vertikal) */}
      <div className="grid items-center gap-10 md:grid-cols-12">
        
        {/* Kolom Kiri: Foto Profil Diperbesar */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-80 h-[460px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-ink-800 to-ink-950 shadow-2xl p-3 flex flex-col items-center">
            <div className="absolute inset-0 bg-accent/5 blur-xl pointer-events-none" />
            <img 
              src={profile.photoUrl} 
              alt={profile.name}
              className="w-full h-full object-cover rounded-2xl border border-white/10"
            />
          </div>
        </div>

        {/* Kolom Kanan: Perkenalan & Teks Diperbesar */}
        <div className="md:col-span-7 space-y-6">
          <div>
            <p className="text-base font-mono text-slate-400 mb-1">Hello, I'm</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {profile.name}
            </h2>
          </div>

          {/* Paragraf Deskripsi Diperbesar */}
          <div className="space-y-4 text-slate-200 text-lg leading-relaxed">
            {profile.about.map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tombol Aksi dengan Tema Neon Konsisten */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href={profile.cvUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] text-base"
            >
              <FiDownload /> Download CV
            </a>
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-2 rounded-xl border-2 border-cyan-400 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] text-base"
            >
              See The Project <FiArrowRight />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}