import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiX, FiDownload } from 'react-icons/fi';
import { FaWhatsapp, FaLinkedinIn, FaGithub } from 'react-icons/fa';

// --- IMPORT GAMBAR LOGO (PASTI MUNCUL) ---
import logoUai from '../assets/LOGO_UAI.jpeg';
import logoSma from '../assets/LOGO_SMA.jpeg';
import logoSmp from '../assets/LOGO_SMPN250.png';

// ================= TIPE DATA =================
interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  image: string;
  images?: string[];
  description: string;
  features: string[];
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
}

// ================= DATA PROYEK =================
const projectsList: ProjectItem[] = [
  {
    id: 'snip-iy',
    number: '01',
    title: 'Snip.iy',
    category: 'WEB APPLICATION & URL SHORTENER',
    year: '2025',
    image: '/snip.iy/Snip-1.jpeg',
    images: Array.from({ length: 7 }, (_, i) => `/snip.iy/Snip-${i + 1}.jpeg`),
    description: 'Platform web pemendek tautan (URL Shortener) modern yang dilengkapi dengan fitur QR Code otomatis, analitik jumlah klik, dan kustomisasi alias URL.',
    features: ['Pemendek URL Instan', 'QR Code Generator Otomatis', 'Statistik Klik Real-time', 'Kustomisasi Tautan Alias'],
    technologies: ['React.js', 'Node.js', 'Tailwind CSS', 'MySQL'],
    demoUrl: 'https://truthful-joy-production-94784455.up.railway.app',
    repoUrl: 'https://github.com/username/url-shortener',
  },
  {
    id: 'katalog-film',
    number: '02',
    title: 'Katalog Film',
    category: 'STREAMING & DIRECTORY PLATFORM',
    year: '2025',
    image: '/projectwebmovies.jpeg',
    images: ['/projectwebmovies.jpeg'],
    description: 'Platform web katalog film interaktif yang menampilkan daftar film trending, rating, detail aktor, sinopsis lengkap, dan sutradara berbasis API TMDB.',
    features: ['Pencarian film & aktor populer', 'Halaman detail & trailer film', 'Daftar tontonan (Watchlist)', 'Desain responsif & modern'],
    technologies: ['React.js', 'Tailwind CSS', 'TypeScript', 'TMDB API'],
    demoUrl: 'https://truthful-joy-production-94784455.up.railway.app',
    repoUrl: 'https://github.com/username/movie-catalog',
  },
  {
    id: 'chit-chat',
    number: '03',
    title: 'Chit-Chat App',
    category: 'UI/UX DESIGN & MOBILE PROTO',
    year: '2024',
    image: '/chit-chat.jpeg',
    images: ['/chit-chat.jpeg'],
    description: 'Perancangan antarmuka (UI) dan alur pengalaman pengguna (UX) untuk aplikasi pesan instan modern dengan navigasi interaktif dan clean design system.',
    features: ['Splash screen & onboarding intuitif', 'Alur autentikasi aman', 'Ruang obrolan interaktif', 'Halaman profil pengguna'],
    technologies: ['Figma', 'UI/UX Design', 'Interactive Prototyping'],
    demoUrl: '',
    repoUrl: '',
  },
  {
    id: 'kemen-pu',
    number: '04',
    title: 'Kementerian PU',
    category: 'INTERNSHIP & SYSTEM ANALYSIS',
    year: '2025',
    image: '/Sertifikat_Magang.jpg',
    images: ['/Sertifikat_Magang.jpg'],
    description: 'Pengalaman magang profesional di Kementerian Pekerjaan Umum, berfokus pada analisis sistem, pemeliharaan data, dan efisiensi alur kerja digital instansi.',
    features: ['Analisis proses bisnis', 'Dokumentasi teknis sistem', 'Kolaborasi tim lintas fungsi'],
    technologies: ['Sistem Informasi', 'Manajemen Data', 'Analisis Teknis'],
    demoUrl: '',
    repoUrl: '',
  },
];

// ================= DATA PROSES KERJA =================
type ProcessStep = 'define' | 'design' | 'deliver';
interface StepInfo {
  id: ProcessStep;
  name: string;
  description: string;
  image: string;
  tag: string;
}

const processSteps: StepInfo[] = [
  { id: 'define', name: 'DEFINE', tag: '01 / DISCOVERY & SCOPE', description: 'Setiap proyek dimulai dengan pertanyaan, bukan dengan desain. Aditia memetakan tujuan, pengguna, dan batasan teknis lebih dulu sehingga ruang lingkupnya jelas sebelum satu baris kode pun ditulis.', image: '/process_define.jpg' },
  { id: 'design', name: 'DESIGN', tag: '02 / ARCHITECTURE & UI', description: 'Begitu parameter proyek ditetapkan, Aditia merancang solusi yang inovatif sekaligus memikat secara visual — menyusun prototipe dan antarmuka yang tidak hanya memenuhi, tetapi melampaui ekspektasi klien.', image: '/process_design.jpg' },
  { id: 'deliver', name: 'DELIVER', tag: '03 / CODE & DEPLOYMENT', description: 'Desain yang disetujui diterjemahkan menjadi produk yang hidup: komponen yang rapi, performa yang diuji, dan peluncuran yang didampingi sampai benar-benar berjalan di tangan pengguna.', image: '/process_deliver.jpg' },
];

// ================= DATA GAMBAR SKRIPSI =================
const thesisImagesData = [
  { title: 'Heatmap Korelasi', image: '/Heatmap_Korelasi.png', desc: 'Analisis korelasi antar fitur akademik terhadap status kelulusan.' },
  { title: 'Confusion Matrix', image: '/Confusion_Matrix.png', desc: 'Perbandingan hasil prediksi model Random Forest dan SVM.' },
  { title: 'Hasil Evaluasi', image: '/Evaluasi.png', desc: 'Perbandingan metrik Accuracy, Precision, Recall, dan F1-Score.' },
];

export default function EditorialPortfolio() {
  const [activeStep, setActiveStep] = useState<ProcessStep>('define');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [hireModalOpen, setHireModalOpen] = useState(false);
  
  // State untuk Modal Skripsi
  const [thesisModalOpen, setThesisModalOpen] = useState(false);
  const [activeThesisIdx, setActiveThesisIdx] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      return;
    }
    const progress = Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100));
    setScrollProgress(progress);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const offset = direction === 'left' ? -380 : 380;
    carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const activeStepData = processSteps.find((s) => s.id === activeStep) || processSteps[0];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 selection:bg-black selection:text-white antialiased font-sans">
      
      {/* ================= 1. FLOATING PILL NAVBAR ================= */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl">
        <nav className="flex items-center justify-between rounded-full bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-black/5 text-slate-900 transition-all">
          <a href="#hero" className="flex items-center gap-2.5 group">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white transition-transform group-hover:scale-105">
              <span className="flex items-center gap-0.5">
                <span className="w-1 h-3.5 bg-white rounded-full animate-pulse" />
                <span className="w-1 h-2 bg-white rounded-full animate-pulse [animation-delay:150ms]" />
                <span className="w-1 h-4 bg-white rounded-full animate-pulse [animation-delay:300ms]" />
              </span>
            </span>
            <span className="font-extrabold text-xs tracking-wider uppercase text-slate-950 font-sans">
              CODE BY ADITIA
            </span>
          </a>

          <div className="hidden md:flex items-center gap-3 text-xs font-bold tracking-wider uppercase text-slate-700">
            <a href="#hero" className="hover:text-black transition-colors">HOME</a>
            <span className="text-slate-300 font-normal">/</span>
            <a href="#about" className="hover:text-black transition-colors">ABOUT</a>
            <span className="text-slate-300 font-normal">/</span>
            <a href="#education" className="hover:text-black transition-colors">EDUCATION</a>
            <span className="text-slate-300 font-normal">/</span>
            <a href="#works" className="hover:text-black transition-colors">PORTFOLIO</a>
            <span className="text-slate-300 font-normal">/</span>
            <a href="#services" className="hover:text-black transition-colors">TECH STACK</a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHireModalOpen(true)}
              className="inline-flex items-center justify-center rounded-full border border-slate-950 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:bg-slate-950 hover:text-white"
            >
              HIRE ME
            </button>
          </div>
        </nav>
      </header>

      {/* ================= 2. HERO SECTION ================= */}
      <section id="hero" className="relative min-h-[92vh] md:min-h-screen bg-[#ececee] text-slate-950 flex flex-col justify-between pt-28 pb-10 px-6 md:px-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
          <svg className="w-[120vw] max-w-[1100px] aspect-square" viewBox="0 0 1000 1000" fill="none">
            <circle cx="500" cy="500" r="180" stroke="#000" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="500" cy="500" r="280" stroke="#000" strokeWidth="1" />
            <circle cx="500" cy="500" r="390" stroke="#000" strokeWidth="1" strokeDasharray="2 4" />
            <circle cx="500" cy="500" r="480" stroke="#000" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-20 flex justify-between items-start max-w-6xl mx-auto w-full">
          <div>
            <p className="text-base md:text-lg font-medium text-slate-900 leading-tight">Freelance</p>
            <p className="text-base md:text-lg font-medium text-slate-900 leading-tight">Web &amp; App Developer</p>
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            <span className="font-display text-[17vw] md:text-[18vw] leading-none uppercase tracking-tight text-slate-950 shrink-0 pr-8">
              FULL STACK DEVELOPER • FULL STACK DEVELOPER •&nbsp;
            </span>
            <span className="font-display text-[17vw] md:text-[18vw] leading-none uppercase tracking-tight text-slate-950 shrink-0 pr-8">
              FULL STACK DEVELOPER • FULL STACK DEVELOPER •&nbsp;
            </span>
          </div>
        </div>

        {/* BAGIAN FOTO */}
        <div className="relative z-10 flex justify-center items-end w-full h-[65vh] md:h-[85vh] pointer-events-none mt-10">
          <img
            src="/aditia_cutout.png"
            alt="Aditia Ihsan Akbar"
            className="w-auto max-h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] select-none pointer-events-auto"
          />
        </div>

        <div className="relative z-20 flex justify-end max-w-6xl mx-auto w-full">
          <a href="#about" className="flex flex-col items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-800 hover:text-black transition-colors">
            <span>Scroll down</span>
            <span className="text-base animate-bounce">↓</span>
          </a>
        </div>
      </section>

      {/* ================= 3. ABOUT SECTION ================= */}
      <section id="about" className="relative bg-[#0a0a0a] text-white py-24 md:py-36 px-6 md:px-14 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-end mb-6">
            <span className="font-mono text-xs tracking-widest text-neutral-500">02/06</span>
          </div>

          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <h2 className="font-display text-8xl sm:text-9xl md:text-[11rem] leading-none uppercase tracking-tighter text-white transition-all duration-500 hover:text-white hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.6)] cursor-default select-none">
                /ABOUT
              </h2>
              <div className="mt-4 text-6xl md:text-8xl text-neutral-600 font-light select-none">↗</div>
            </div>

            <div className="md:col-span-7 md:pt-6">
              <blockquote className="text-lg md:text-2xl font-light text-neutral-200 leading-relaxed">
                &ldquo;Hello! I'm Aditia Ihsan Akbar, a Computer Engineering graduate from Al-Azhar University Indonesia.
                <br/><br/>
                I'm deeply focused on Frontend & Backend Development, Product Design, and exploring Data Science & Machine Learning.
                <br/><br/>
                Currently, I am open to new job opportunities and exciting project collaborations.&rdquo;
              </blockquote>

              <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-neutral-400">STATUS AKTIF</p>
                  <p className="font-mono text-xs md:text-sm text-neutral-200 uppercase mt-1 tracking-wider">AVAILABLE FOR 2026 PROJECTS &amp; FULL-TIME ROLES</p>
                </div>
                <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest">JAKARTA, INDONESIA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. EDUCATION SECTION ================= */}
      <section id="education" className="relative bg-[#0a0a0a] text-white py-24 md:py-36 px-6 md:px-14 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-end mb-6">
            <span className="font-mono text-xs tracking-widest text-neutral-500">03/06</span>
          </div>

          <div className="mb-16">
            <p className="font-mono text-sm text-white mb-2 uppercase tracking-widest">// ACADEMIC</p>
            <h2 className="font-display text-8xl sm:text-9xl md:text-[11rem] leading-none uppercase tracking-tighter text-white transition-all duration-500 hover:text-white hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.6)] cursor-default select-none">
              /EDUCATION
            </h2>
          </div>

          <div className="relative ml-4 md:ml-8 pl-8 md:pl-12 border-l-2 border-neutral-800 space-y-16">
            
            {/* CARD 1: S1 UAI */}
            <div className="relative group">
              <span className="absolute -left-[41px] md:-left-[57px] top-8 w-4 h-4 rounded-full bg-white ring-4 ring-[#0a0a0a] group-hover:scale-125 transition-transform" />
              
              <div className="flex flex-col p-6 md:p-8 rounded-3xl border border-neutral-800 bg-[#111] hover:border-neutral-600 transition-colors">
                
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center p-2 shrink-0">
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

                {/* SKRIPSI SECTION (FOTO DIHAPUS, GAMBAR JADI 3D SLIDER) */}
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-4">
                    UNDERGRADUATE THESIS PROJECT:
                  </p>

                  <div className="flex flex-col bg-[#0a0a0a] p-6 rounded-2xl border border-neutral-800">
                    <div className="flex-1 flex flex-col justify-center mb-6">
                      <h4 className="text-base md:text-lg font-bold text-white leading-relaxed uppercase">
                        KLASIFIKASI KELULUSAN TEPAT WAKTU MAHASISWA INFORMATIKA UNIVERSITAS AL-AZHAR INDONESIA
                      </h4>
                      <p className="text-xs text-white mt-3 font-mono">
                        Machine Learning | Klasifikasi Data | Data Science
                      </p>
                    </div>

                    {/* 3 Gambar Evaluasi (Bisa diklik) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {thesisImagesData.map((item, idx) => (
                        <div 
                          key={idx}
                          onClick={() => {
                            setActiveThesisIdx(idx);
                            setThesisModalOpen(true);
                          }}
                          className="bg-[#0a0a0a] p-4 rounded-xl border border-white flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer group"
                        >
                          <h5 className="text-[11px] font-semibold text-white uppercase tracking-wider mb-3 text-center w-full transition-colors">
                            {item.title}
                          </h5>
                          <div className="w-full h-40 rounded-lg overflow-hidden border border-white/50 bg-[#111] flex items-center justify-center">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: SMA */}
            <div className="relative group">
              <span className="absolute -left-[41px] md:-left-[57px] top-8 w-4 h-4 rounded-full bg-white ring-4 ring-[#0a0a0a] group-hover:scale-125 transition-transform" />
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 rounded-3xl border border-neutral-800 bg-[#111] hover:border-neutral-600 transition-colors">
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center p-2 shrink-0">
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

            {/* CARD 3: SMP */}
            <div className="relative group">
              <span className="absolute -left-[41px] md:-left-[57px] top-8 w-4 h-4 rounded-full bg-white ring-4 ring-[#0a0a0a] group-hover:scale-125 transition-transform" />
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 rounded-3xl border border-neutral-800 bg-[#111] hover:border-neutral-600 transition-colors">
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center p-2 shrink-0">
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

      {/* ================= 5. RUNNING RIBBON DIVIDER MARQUEE ================= */}
      <div className="relative bg-black text-white border-y border-white/10 py-5 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <span className="font-display text-3xl md:text-5xl uppercase tracking-wider text-neutral-100 pr-10">
            DIGITAL PRODUCT AND BRAND ✱ AVAILABLE FOR 2026 ✱ CODE BY ADITIA ✱ CREATIVE ENGINEERING ✱ WEB &amp; MOBILE APPS ✱&nbsp;
          </span>
          <span className="font-display text-3xl md:text-5xl uppercase tracking-wider text-neutral-100 pr-10">
            DIGITAL PRODUCT AND BRAND ✱ AVAILABLE FOR 2026 ✱ CODE BY ADITIA ✱ CREATIVE ENGINEERING ✱ WEB &amp; MOBILE APPS ✱&nbsp;
          </span>
        </div>
      </div>

      {/* ================= 6. SELECTED WORKS SECTION ================= */}
      <section id="works" className="relative bg-[#f8f8fa] text-slate-950 py-24 md:py-32 px-6 md:px-14 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-end mb-4">
            <span className="font-mono text-xs tracking-widest text-slate-400">04/06</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-8xl sm:text-9xl md:text-[11rem] leading-none uppercase tracking-tighter text-slate-950 transition-all duration-500 hover:text-white hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] cursor-default select-none">
                /WORKS
              </h2>
              <p className="mt-4 text-base md:text-xl text-slate-700 font-light leading-relaxed">
                Transforming complex ideas into tangible digital products. Focused on scalability, performance, and user experience.
              </p>
            </div>

            <div className="shrink-0 flex justify-start md:justify-end">
              <button
                onClick={() => setHireModalOpen(true)}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-slate-300 flex flex-col items-center justify-center text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm group"
              >
                <span>GET IN</span>
                <span>TOUCH</span>
                <span className="text-xs mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500">SELECTED WORKS</span>
            <div className="flex items-center gap-2">
              <button onClick={() => scrollCarousel('left')} className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-black hover:bg-black hover:text-white transition">
                <FiChevronLeft size={16} />
              </button>
              <button onClick={() => scrollCarousel('right')} className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-black hover:bg-black hover:text-white transition">
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>

          <div ref={carouselRef} onScroll={handleCarouselScroll} className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2">
            {projectsList.map((item) => (
              <article key={item.id} onClick={() => setSelectedProject(item)} className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 cursor-pointer group select-none">
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-neutral-900 border border-slate-200 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 font-display text-lg text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{item.number}</span>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <FiArrowUpRight size={20} />
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-3xl uppercase tracking-tight text-slate-900 group-hover:text-black transition-colors">{item.title}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-500">{item.category} · {item.year}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 w-full h-[2px] bg-slate-200 relative overflow-hidden rounded-full">
            <div className="h-full bg-black transition-all duration-150 rounded-full" style={{ width: `${Math.max(12, scrollProgress)}%` }} />
          </div>
        </div>
      </section>

      {/* ================= 7. INTERACTIVE PROCESS SECTION ================= */}
      <section id="process" className="relative bg-[#0a0a0a] text-white py-24 md:py-36 px-6 md:px-14 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-end mb-6">
            <span className="font-mono text-xs tracking-widest text-neutral-500">05/06</span>
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-8 py-2">
                  {processSteps.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveStep(s.id)}
                      aria-label={`Pilih tahap ${s.name}`}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${activeStep === s.id ? 'bg-white scale-125 ring-4 ring-white/20' : 'bg-neutral-700 hover:bg-neutral-500'}`}
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-1">
                  {processSteps.map((s) => {
                    const isActive = activeStep === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setActiveStep(s.id)}
                        onMouseEnter={() => setActiveStep(s.id)}
                        className={`text-left font-display text-6xl sm:text-7xl md:text-8xl uppercase tracking-tighter leading-none transition-all duration-300 ${isActive ? 'text-white translate-x-2' : 'text-neutral-700 hover:text-neutral-400'}`}
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-10 pl-9 max-w-lg min-h-[110px]">
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">{activeStepData.tag}</p>
                <p className="text-base md:text-lg font-light text-neutral-300 leading-relaxed transition-opacity duration-300">{activeStepData.description}</p>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
                <img key={activeStepData.image} src={activeStepData.image} alt={activeStepData.name} className="w-full h-full object-cover animate-fadeUp duration-500" />
                <div className="absolute top-4 left-4 rounded-md bg-black/60 backdrop-blur px-3 py-1 font-mono text-xs text-white uppercase tracking-wider">{activeStepData.name} PHASE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. SERVICES & CAPABILITIES HIGHLIGHT (#services) ================= */}
      <section id="services" className="relative bg-[#0d0d0d] text-white py-20 px-6 md:px-14 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">KAPABILITAS &amp; LAYANAN UTAMA</span>
            <span className="font-mono text-xs text-neutral-500">STACK TECH 2026</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 transition">
              <span className="font-mono text-xs text-neutral-500">01</span>
              <h4 className="font-display text-2xl uppercase mt-2 text-white">Full-Stack Web</h4>
              <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">Pengembangan aplikasi web modern dengan React, TypeScript, Node.js, dan database terstruktur.</p>
            </div>
            <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 transition">
              <span className="font-mono text-xs text-neutral-500">02</span>
              <h4 className="font-display text-2xl uppercase mt-2 text-white">UI/UX Design</h4>
              <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">Perancangan antarmuka visual intuitif, wireframing di Figma, dan design system yang konsisten.</p>
            </div>
            <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 transition">
              <span className="font-mono text-xs text-neutral-500">03</span>
              <h4 className="font-display text-2xl uppercase mt-2 text-white">API &amp; Backend</h4>
              <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">Arsitektur RESTful API, integrasi layanan pihak ketiga, autentikasi aman, dan optimasi database.</p>
            </div>
            <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 transition">
              <span className="font-mono text-xs text-neutral-500">04</span>
              <h4 className="font-display text-2xl uppercase mt-2 text-white">Performance</h4>
              <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">Kecepatan loading tinggi, SEO optimal, responsive di semua ukuran layar ponsel hingga desktop.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 9. GRAND EDITORIAL FOOTER ================= */}
      <footer id="contact" className="relative bg-[#050505] text-white pt-24 pb-12 px-6 md:px-14 border-t border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-end mb-8">
            <span className="font-mono text-xs tracking-widest text-neutral-500">06/06</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 text-xs">
            <div>
              <p className="font-mono uppercase tracking-widest text-neutral-500 mb-4">MENU</p>
              <ul className="space-y-2.5 text-neutral-300">
                <li><a href="#hero" className="hover:text-white transition">Home</a></li>
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#education" className="hover:text-white transition">Education</a></li>
                <li><a href="#works" className="hover:text-white transition">Portfolio</a></li>
                <li><a href="#services" className="hover:text-white transition">Tech Stack</a></li>
              </ul>
            </div>

            <div>
              <p className="font-mono uppercase tracking-widest text-neutral-500 mb-4">LAYANAN</p>
              <ul className="space-y-2.5 text-neutral-300">
                <li><span className="hover:text-white cursor-pointer" onClick={() => setHireModalOpen(true)}>Landing Page</span></li>
                <li><span className="hover:text-white cursor-pointer" onClick={() => setHireModalOpen(true)}>Company Profile</span></li>
                <li><span className="hover:text-white cursor-pointer" onClick={() => setHireModalOpen(true)}>E-Commerce</span></li>
                <li><span className="hover:text-white cursor-pointer" onClick={() => setHireModalOpen(true)}>Web App</span></li>
                <li><span className="hover:text-white cursor-pointer" onClick={() => setHireModalOpen(true)}>UI/UX Design</span></li>
              </ul>
            </div>

            <div>
              <p className="font-mono uppercase tracking-widest text-neutral-500 mb-4">KONTAK</p>
              <ul className="space-y-2.5 text-neutral-300">
                <li>
                  <a href="https://wa.me/6281293630133" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1.5">
                    WhatsApp <FiArrowUpRight size={12} className="text-neutral-500" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/akbaraditiaihsan?srtk=YWZsbGJnaXJ2MnR0&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1.5">
                    Instagram <FiArrowUpRight size={12} className="text-neutral-500" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/aditia-ihsan-akbar-81a7b3448/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1.5">
                    LinkedIn <FiArrowUpRight size={12} className="text-neutral-500" />
                  </a>
                </li>
                <li>
                  <button onClick={() => setHireModalOpen(true)} className="hover:text-white transition flex items-center gap-1.5 text-left">
                    Form proyek <FiArrowUpRight size={12} className="text-neutral-500" />
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono uppercase tracking-widest text-neutral-500 mb-2">INDONESIA · REMOTE-FIRST</p>
              <p className="text-neutral-400 font-light leading-relaxed mt-3">
                Freelance full stack developer. Dari papan tulis kosong sampai rilis, dikerjakan sendiri dari ujung ke ujung.
              </p>
              <div className="mt-4">
                <a href="/path-to-cv.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-white font-mono uppercase tracking-wider underline hover:text-neutral-300">
                  <FiDownload size={13} /> Unduh Resume (CV)
                </a>
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden select-none my-8">
            <h1 className="font-display text-[19vw] leading-none text-white tracking-tighter text-center uppercase whitespace-nowrap">
              ADITIA
            </h1>
          </div>

          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
            <div>© 2026 ADITIA IHSAN AKBAR</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>OPEN FOR FREELANCE WORK</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MODAL 3D SLIDER PROYEK ================= */}
      {selectedProject && (
        <ModalProject project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {/* ================= MODAL 3D SLIDER SKRIPSI (BARU) ================= */}
      {thesisModalOpen && (
        <ThesisModal 
          images={thesisImagesData} 
          initialIndex={activeThesisIdx} 
          onClose={() => setThesisModalOpen(false)} 
        />
      )}

      {/* ================= MODAL "HIRE ME" ================= */}
      {hireModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4" role="dialog" aria-modal="true" onClick={() => setHireModalOpen(false)}>
          <div className="relative w-full max-w-lg rounded-3xl bg-neutral-950 border border-neutral-800 text-white shadow-2xl p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setHireModalOpen(false)} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition" aria-label="Tutup">
              <FiX size={18} />
            </button>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Available For Hire
            </span>
            <h3 className="font-display text-4xl uppercase tracking-tight mt-1">Let&apos;s Work Together</h3>
            <p className="mt-2 text-sm text-neutral-400 font-light leading-relaxed">Punya ide proyek, kebutuhan pembuatan web, atau tawaran kerja sama? Hubungi saya langsung melalui saluran berikut:</p>
            <div className="mt-6 space-y-3">
              <a href="https://wa.me/6281293630133?text=Halo%20Aditia,%20saya%20tertarik%20untuk%20bekerja%20sama%20dengan%20Anda." target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition group">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400"><FaWhatsapp size={20} /></span>
                  <div>
                    <p className="text-sm font-bold text-white">WhatsApp Chat</p>
                    <p className="text-xs text-emerald-400/80 font-mono">+62 812-9363-0133 (Fast Response)</p>
                  </div>
                </div>
                <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a href="mailto:aditiaakbar44@gmail.com?subject=Tawaran%20Proyek%20/%20Kerjasama" className="flex items-center justify-between p-4 rounded-2xl border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 transition group">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-neutral-800 text-white">✉</span>
                  <div>
                    <p className="text-sm font-bold text-white">Kirim Email</p>
                    <p className="text-xs text-neutral-400 font-mono">aditiaakbar44@gmail.com</p>
                  </div>
                </div>
                <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a href="https://www.linkedin.com/in/aditia-ihsan-akbar-81a7b3448/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-2xl border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 transition group">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-neutral-800 text-blue-400"><FaLinkedinIn size={18} /></span>
                  <div>
                    <p className="text-sm font-bold text-white">Profil LinkedIn</p>
                    <p className="text-xs text-neutral-400 font-mono">aditia-ihsan-akbar</p>
                  </div>
                </div>
                <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
            <button onClick={() => setHireModalOpen(false)} className="mt-6 w-full py-2.5 rounded-full border border-neutral-800 text-xs font-mono uppercase text-neutral-400 hover:text-white transition">Kembali ke Portofolio</button>
          </div>
        </div>
      )}

    </div>
  );
}

// ================= KOMPONEN MODAL 3D SLIDER PROYEK =================
function ModalProject({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const images = project.images && project.images.length > 0 ? project.images : [project.image];
  const total = images.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = oldOverflow;
    };
  }, [prev, next, onClose]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const half = Math.floor(total / 2);
  const offsetOf = (i: number) => ((i - index + total + half) % total) - half;

  const arrowClass = "absolute top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3.5 text-white backdrop-blur transition hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white";

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

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#1d0f3a_0%,#07040f_75%)]"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background 3D Slider (Foto-foto) */}
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
                  if (d !== 0) setIndex(i);
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
                  alt={`${project.title} - foto ${i + 1}`}
                  draggable={false}
                  className="h-full w-full select-none object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Tombol Navigasi Slider */}
      {total > 1 && (
        <>
          <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Foto sebelumnya" className={`${arrowClass} left-3 md:left-8`}>
            {ArrowLeft}
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Foto berikutnya" className={`${arrowClass} right-3 md:right-8`}>
            {ArrowRight}
          </button>
          <span className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 font-mono text-sm text-white backdrop-blur">
            {index + 1} / {total}
          </span>
        </>
      )}

      {/* Info Proyek (Di Bawah Slider) */}
      <div
        className="absolute bottom-0 left-0 right-0 z-40 bg-black/80 p-6 md:p-8 backdrop-blur-md border-t border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              {project.category} · {project.year}
            </span>
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight mt-1 text-white">
              {project.title}
            </h2>
            <p className="mt-2 text-sm text-neutral-300 font-light line-clamp-2">
              {project.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 shrink-0">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition">
                Live Demo <FiArrowUpRight size={14} />
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition">
                Source Code <FaGithub size={14} />
              </a>
            )}
            <button onClick={onClose} className="rounded-full border border-neutral-800 px-5 py-2.5 text-xs font-mono uppercase text-neutral-400 hover:text-white transition">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ================= KOMPONEN MODAL 3D SLIDER SKRIPSI (BARU) =================
function ThesisModal({ 
  images, 
  initialIndex, 
  onClose 
}: { 
  images: { title: string; image: string; desc: string }[]; 
  initialIndex: number; 
  onClose: () => void; 
}) {
  const [index, setIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = oldOverflow;
    };
  }, [prev, next, onClose]);

  const onTouchStart = (e: React.TouchEvent) => touchStartX.current = e.touches[0].clientX;
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const half = Math.floor(total / 2);
  const offsetOf = (i: number) => ((i - index + total + half) % total) - half;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#1d0f3a_0%,#07040f_75%)]"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="pointer-events-none relative h-full w-full" style={{ perspective: '1600px' }}>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          {images.map((item, i) => {
            const d = offsetOf(i);
            const a = Math.abs(d);
            const visible = a <= 2;
            return (
              <div
                key={item.image}
                onClick={(e) => {
                  e.stopPropagation();
                  if (d !== 0) setIndex(i);
                }}
                className={`absolute w-[min(85vw,800px)] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/60 p-4 ${
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
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white uppercase">{item.title}</h3>
                  <p className="text-sm text-neutral-400">{item.desc}</p>
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className="w-full h-auto max-h-[60vh] object-contain rounded-lg border border-white/5 bg-[#111]"
                />
              </div>
            );
          })}
        </div>
      </div>

      {total > 1 && (
        <>
          <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3 text-white hover:bg-black/80"><FiChevronLeft size={24} /></button>
          <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3 text-white hover:bg-black/80"><FiChevronRight size={24} /></button>
        </>
      )}
      <button onClick={onClose} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 rounded-full bg-white text-black px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-neutral-200 transition">
        Tutup
      </button>
    </div>,
    document.body
  );
}