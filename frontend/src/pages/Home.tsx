import { Link } from 'react-router-dom';
import IDCard from '../components/IDCard';
import { profile } from '../data/profile';
import { FiMail, FiInstagram, FiExternalLink } from 'react-icons/fi';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

// Fungsi helper untuk memilih ikon yang sesuai berdasarkan label sosial media
function getSocialIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes('email') || l.includes('mail')) return <FiMail className="text-cyan-400" />;
  if (l.includes('linkedin')) return <FaLinkedinIn className="text-cyan-400" />;
  if (l.includes('whatsapp')) return <FaWhatsapp className="text-cyan-400" />;
  if (l.includes('instagram')) return <FiInstagram className="text-cyan-400" />;
  return <FiExternalLink className="text-cyan-400" />;
}

export default function Home() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
      <div className="animate-fadeUp">
        {profile.availableForWork && (
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="h-2 w-2 animate-pulseDot rounded-full bg-emerald-400" />
            Available for Work
          </span>
        )}

        <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          Welcome to <span className="bg-gradient-to-r from-accent to-accent-violet bg-clip-text text-transparent">My Portfolio</span>
        </h1>
        <p className="mt-3 font-mono text-lg text-accent">{profile.role}</p>
        <p className="mt-5 max-w-lg text-slate-400">{profile.about[0]}</p>

        {/* Tombol Aksi dengan Tema Neon */}
        <div className="mt-8 flex flex-wrap gap-4">
          {/* Tombol Utama (Download CV / Aksi Pertama) */}
          <a href="/path-to-cv.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]">
            <span>📥</span> Download CV
          </a>

          {/* Tombol See The Portfolio dengan Border & Efek Neon */}
          <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-xl border-2 border-cyan-400 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]">
            <span>See The Portfolio</span>
            <span>→</span>
          </Link>
        </div>

        {/* List Sosial Media dengan Logo */}
        <ul className="mt-8 flex flex-wrap gap-5 text-sm text-slate-400">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a 
                href={s.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 transition-colors hover:text-white group"
              >
                <span className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-400/50 transition-colors">
                  {getSocialIcon(s.label)}
                </span>
                <span className="underline-offset-4 group-hover:underline">{s.label}</span>
                <span className="text-xs text-slate-500">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="animate-fadeUp [animation-delay:150ms]">
        <IDCard />
      </div>
    </section>
  );
}