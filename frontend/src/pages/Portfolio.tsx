import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Tab = 'projects' | 'certificates';

// ================= TIPE DATA =================
interface Project {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  images?: string[];        // Array untuk menampung banyak foto step
  features: string[];
  technologies: string[];
  demo_url?: string;
  repo_url?: string;
}

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  image_url: string;
}

// ================= DATA STATIS (PROYEK) =================
const projectsData: Project[] = [
  {
    id: 1,
    title: "Website Katalog Film",
    description: "Platform web katalog film yang menampilkan daftar film populer, detail informasi film, profil aktor, dan sutradara.",
    image_url: "/projectwebmovies.jpeg",
    features: ["Pencarian film & aktor", "Halaman detail film", "Profil aktor & sutradara", "Desain antarmuka responsif"],
    technologies: ["React.js", "Tailwind CSS", "TypeScript"],
    demo_url: "",
    repo_url: ""
  },
  {
    id: 2,
    title: "Desain UI/UX Aplikasi Chit-Chat",
    description: "Perancangan antarmuka (UI) dan pengalaman pengguna (UX) untuk aplikasi pesan instan (chatting) berbasis mobile.",
    image_url: "/chit-chat.jpeg",
    features: ["Desain Splash Screen", "Halaman Login & Register", "Antarmuka Obrolan", "Halaman Profil"],
    technologies: ["Figma", "UI/UX Design"],
    demo_url: "",
    repo_url: ""
  },
  {
    id: 3,
    title: "Aplikasi Snip.iy (URL Shortener)",
    description: "Platform web pemendek tautan (URL Shortener) yang dilengkapi dengan fitur QR Code, manajemen riwayat, dan statistik jumlah klik.",
    // Nama file di folder public/snip.iy/ : Snip-1.jpeg sampai Snip-7.jpeg
    images: Array.from({ length: 7 }, (_, i) => `/snip.iy/Snip-${i + 1}.jpeg`),
    features: ["Pemendek URL Instan", "QR Code Generator", "Statistik Klik", "Kustomisasi URL"],
    technologies: ["React.js", "Node.js", "Tailwind CSS", "MySQL"],
    demo_url: "",
    repo_url: "https://github.com/username/url-shortener"
  }
];

const certificatesData: Certificate[] = [
  {
    id: 1,
    title: "Sertifikat Magang",
    issuer: "Kementerian Pekerjaan Umum",
    image_url: "/Sertifikat_Magang.jpg",
  }
];

// ================= KOMPONEN UTAMA =================
export default function Portfolio() {
  const [tab, setTab] = useState<Tab>('projects');

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="mb-10">
        <span className="font-mono text-xs text-cyan-400">// portfolio showcase</span>
        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          Portofolio
        </h1>
      </div>

      <div role="tablist" className="mt-8 inline-flex rounded-xl border border-white/10 bg-ink-800/60 p-1">
        <button
          role="tab"
          aria-selected={tab === 'projects'}
          onClick={() => setTab('projects')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            tab === 'projects' ? 'bg-cyan-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Projects
        </button>
        <button
          role="tab"
          aria-selected={tab === 'certificates'}
          onClick={() => setTab('certificates')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            tab === 'certificates' ? 'bg-cyan-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Certificates
        </button>
      </div>

      <div className="mt-8 animate-fadeUp" key={tab}>
        {tab === 'projects' && <ProjectsTab />}
        {tab === 'certificates' && <CertificatesTab />}
      </div>
    </section>
  );
}

// ================= KOMPONEN PROJECTS =================
function ProjectsTab() {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {projectsData.map((p) => {
          // Mendukung array images ataupun image_url tunggal
          const imgList = p.images && p.images.length > 0 ? p.images : (p.image_url ? [p.image_url] : []);

          return (
            <article 
              key={p.id} 
              className="card overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-400/10 group"
            >
              {imgList.length > 0 && <ImageSlider images={imgList} alt={p.title} />}

              <div className="p-6">
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{p.description}</p>

                <h4 className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Fitur Utama</h4>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-300">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.technologies.map((t) => (
                    <span key={t} className="rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 font-mono text-xs text-cyan-400">
                      {t}
                    </span>
                  ))}
                </div>

                {((p.demo_url && p.demo_url.trim() !== '') || (p.repo_url && p.repo_url.trim() !== '')) && (
                  <div className="mt-5 flex gap-3">
                    {p.demo_url && p.demo_url.trim() !== '' && (
                      <a href={p.demo_url} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                        Live Demo
                      </a>
                    )}
                    {p.repo_url && p.repo_url.trim() !== '' && (
                      <a href={p.repo_url} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2">
                        Source
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

// ================= KOMPONEN CERTIFICATES =================
function CertificatesTab() {
  const [active, setActive] = useState<Certificate | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificatesData.map((c) => (
          <button key={c.id} onClick={() => setActive(c)} className="card group overflow-hidden text-left transition hover:border-cyan-400/40">
            <img src={c.image_url} alt={c.title} loading="lazy" className="aspect-[10/7] w-full object-cover transition group-hover:scale-[1.03]" />
            <div className="p-4">
              <h3 className="font-semibold text-white">{c.title}</h3>
              <p className="text-sm text-slate-400">{c.issuer}</p>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div className="max-h-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <img src={active.image_url} alt={active.title} className="max-h-[80vh] rounded-xl" />
            <p className="mt-3 text-center text-sm text-slate-300">
              {active.title} — {active.issuer}
            </p>
            <button onClick={() => setActive(null)} className="btn-ghost mx-auto mt-3">
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ================= KOMPONEN IMAGE SLIDER =================
interface Props {
  /** Daftar path gambar, contoh: ['/snip.iy/Snip-1.jpeg', '/snip.iy/Snip-2.jpeg'] */
  images: string[];
  alt: string;
}

/**
 * Di kartu: slider dengan panah, titik, dan swipe.
 * Saat foto diklik: galeri 3D "coverflow" — foto aktif di tengah, foto lain bertumpuk
 * miring di kiri/kanan. Ganti foto dengan panah, klik foto samping, tombol ← →, atau geser.
 */
function ImageSlider({ images, alt }: Props) {
  const total = images.length;
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  // Saat galeri terbuka: aktifkan keyboard dan kunci scroll halaman
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = oldOverflow;
    };
  }, [open, prev, next]);

  if (total === 0) return null;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const arrowClass =
    'absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2 text-white backdrop-blur transition hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400';

  const ArrowLeft = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
  const ArrowRight = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );

  // Posisi relatif tiap foto terhadap foto aktif (melingkar): ... -2, -1, 0, 1, 2 ...
  const half = Math.floor(total / 2);
  const offsetOf = (i: number) => ((i - index + total + half) % total) - half;

  return (
    <>
      {/* ===== Slider di dalam kartu ===== */}
      <div className="relative overflow-hidden bg-ink-900" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${alt} - foto ${i + 1}`}
              draggable={false}
              onClick={() => setOpen(true)}
              className="aspect-video w-full shrink-0 cursor-zoom-in object-cover"
            />
          ))}
        </div>

        {total > 1 && (
          <>
            <button type="button" onClick={prev} aria-label="Foto sebelumnya" className={`${arrowClass} left-3`}>
              {ArrowLeft}
            </button>
            <button type="button" onClick={next} aria-label="Foto berikutnya" className={`${arrowClass} right-3`}>
              {ArrowRight}
            </button>

            <span className="absolute right-3 top-3 rounded-md bg-black/60 px-2 py-1 font-mono text-xs text-white">
              {index + 1} / {total}
            </span>

            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ke foto ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-5 bg-cyan-400' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ===== Galeri 3D coverflow (di luar kartu agar tidak terpotong) ===== */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#1d0f3a_0%,#07040f_75%)]"
            role="dialog"
            aria-modal="true"
            aria-label={`Galeri ${alt}`}
            onClick={() => setOpen(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Panggung 3D */}
            <div className="pointer-events-none relative h-full w-full" style={{ perspective: '1600px' }}>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {images.map((src, i) => {
                  const d = offsetOf(i);
                  const a = Math.abs(d);
                  const visible = a <= 2;
                  return (
                    <div
                      key={src}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (d !== 0) setIndex(i); // klik foto samping = jadikan foto utama
                      }}
                      className={`absolute w-[min(72vw,600px)] aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/60 ${
                        d === 0 ? 'cursor-default' : 'cursor-pointer'
                      }`}
                      style={{
                        transform: `translateX(${d * 100}%) translateZ(${-a * 200}px) rotateY(${-d * 38}deg) scale(${1 - a * 0.06})`,
                        opacity: visible ? 1 : 0,
                        filter: `brightness(${Math.max(0.25, 1 - a * 0.42)})`,
                        zIndex: 20 - a,
                        pointerEvents: visible ? 'auto' : 'none',
                        transition: 'transform .6s cubic-bezier(.22,.8,.3,1), opacity .6s, filter .6s',
                      }}
                      aria-hidden={d !== 0}
                    >
                      <img
                        src={src}
                        alt={`${alt} - foto ${i + 1}`}
                        draggable={false}
                        className="h-full w-full select-none object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setOpen(false); }}
              aria-label="Tutup"
              className="absolute right-4 top-4 z-30 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  aria-label="Foto sebelumnya"
                  className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3.5 text-white backdrop-blur transition hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 md:left-8"
                >
                  {ArrowLeft}
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  aria-label="Foto berikutnya"
                  className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3.5 text-white backdrop-blur transition hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 md:right-8"
                >
                  {ArrowRight}
                </button>
                <span className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 font-mono text-sm text-white backdrop-blur">
                  {index + 1} / {total}
                </span>
              </>
            )}
          </div>,
          document.body
        )}
    </>
  );
}