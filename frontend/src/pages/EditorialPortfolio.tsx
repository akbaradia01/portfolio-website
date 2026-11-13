import { useState, useRef, useEffect } from 'react';
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiX, FiDownload } from 'react-icons/fi';
import { FaWhatsapp, FaLinkedinIn, FaGithub } from 'react-icons/fa';

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

// ================= DATA PROYEK (Kombinasi Proyek Aditia & Video Showcase) =================
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
  {
    id: 'graphichunter',
    number: '05',
    title: 'GraphicHunter',
    category: 'DESIGN & DEVELOPMENT',
    year: '2025',
    image: '/work_01.jpg',
    images: ['/work_01.jpg'],
    description: 'Eksplorasi platform kurasi aset visual dan utilitas developer dengan layout grid fleksibel dan performa load tinggi.',
    features: ['Kurasi aset digital berkualitas tinggi', 'Sistem pencarian tag cepat', 'Optimasi performa gambar'],
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    demoUrl: '',
    repoUrl: '',
  },
  {
    id: 'andy-hard',
    number: '06',
    title: 'Andy Hard',
    category: 'WEB AND STRATEGY',
    year: '2025',
    image: '/work_02.jpg',
    images: ['/work_02.jpg'],
    description: 'Website portofolio agensi dan strategi digital kreatif yang menggabungkan storytelling editorial dengan animasi halus.',
    features: ['Arsitektur informasi terstruktur', 'Animasi interaksi dinamis', 'Tipografi editorial kontras tinggi'],
    technologies: ['TypeScript', 'Framer Motion', 'Tailwind'],
    demoUrl: '',
    repoUrl: '',
  },
  {
    id: 'avivo',
    number: '07',
    title: 'AVIVO',
    category: 'FILM PRODUCTION & MEDIA',
    year: '2024',
    image: '/work_03.jpg',
    images: ['/work_03.jpg'],
    description: 'Website showcase untuk rumah produksi film independen dengan dukungan galeri sinematik dan pemutaran showreel mulus.',
    features: ['Galeri video responsif', 'Dark cinematic aesthetic', 'Optimasi aset beresolusi tinggi'],
    technologies: ['React', 'Tailwind CSS', 'Vite'],
    demoUrl: '',
    repoUrl: '',
  },
  {
    id: 'northline',
    number: '08',
    title: 'Northline',
    category: 'BRAND & IDENTITY',
    year: '2024',
    image: '/work_04.jpg',
    images: ['/work_04.jpg'],
    description: 'Identitas merek digital dan platform web untuk studio arsitektur, menekankan ruang negatif, grid simetris, dan tipografi monokrom.',
    features: ['Desain sistem monokromatik', 'Layout arsitektural minimalis', 'Navigasi intuitif'],
    technologies: ['UI/UX', 'Figma', 'Webflow'],
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
  {
    id: 'define',
    name: 'DEFINE',
    tag: '01 / DISCOVERY & SCOPE',
    description:
      'Setiap proyek dimulai dengan pertanyaan, bukan dengan desain. Aditia memetakan tujuan, pengguna, dan batasan teknis lebih dulu sehingga ruang lingkupnya jelas sebelum satu baris kode pun ditulis.',
    image: '/process_define.jpg',
  },
  {
    id: 'design',
    name: 'DESIGN',
    tag: '02 / ARCHITECTURE & UI',
    description:
      'Begitu parameter proyek ditetapkan, Aditia merancang solusi yang inovatif sekaligus memikat secara visual — menyusun prototipe dan antarmuka yang tidak hanya memenuhi, tetapi melampaui ekspektasi klien.',
    image: '/process_design.jpg',
  },
  {
    id: 'deliver',
    name: 'DELIVER',
    tag: '03 / CODE & DEPLOYMENT',
    description:
      'Desain yang disetujui diterjemahkan menjadi produk yang hidup: komponen yang rapi, performa yang diuji, dan peluncuran yang didampingi sampai benar-benar berjalan di tangan pengguna.',
    image: '/process_deliver.jpg',
  },
];

export default function EditorialPortfolio() {
  // State untuk Tab Proses
  const [activeStep, setActiveStep] = useState<ProcessStep>('define');

  // State untuk Modal Proyek
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // State untuk Modal "Hire Me" / Kontak
  const [hireModalOpen, setHireModalOpen] = useState(false);

  // Ref untuk carousel karya
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update progress bar carousel saat di-scroll
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

  // Navigasi gambar di modal
  const currentImages = selectedProject?.images && selectedProject.images.length > 0
    ? selectedProject.images
    : (selectedProject ? [selectedProject.image] : []);

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  useEffect(() => {
    setActiveImageIdx(0);
  }, [selectedProject]);

  const activeStepData = processSteps.find((s) => s.id === activeStep) || processSteps[0];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 selection:bg-black selection:text-white antialiased font-sans">
      
      {/* ================= 1. FLOATING PILL NAVBAR ================= */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl">
        <nav className="flex items-center justify-between rounded-full bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-black/5 text-slate-900 transition-all">
          
          {/* Sisi Kiri: Badge Icon & Brand Name */}
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

          {/* Sisi Tengah: Menu Links */}
          <div className="hidden md:flex items-center gap-3 text-xs font-bold tracking-wider uppercase text-slate-700">
            <a href="#works" className="hover:text-black transition-colors">
              KARYA
            </a>
            <span className="text-slate-300 font-normal">/</span>
            <a href="#services" className="hover:text-black transition-colors">
              LAYANAN
            </a>
            <span className="text-slate-300 font-normal">/</span>
            <a href="#process" className="hover:text-black transition-colors">
              PROSES
            </a>
            <span className="text-slate-300 font-normal">/</span>
            <a href="#about" className="hover:text-black transition-colors">
              TENTANG
            </a>
          </div>

          {/* Sisi Kanan: Tombol CTA "HIRE ME" */}
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

      {/* ================= 2. HERO SECTION (LIGHT THEME) ================= */}
      <section
        id="hero"
        className="relative min-h-[92vh] md:min-h-screen bg-[#ececee] text-slate-950 flex flex-col justify-between pt-28 pb-10 px-6 md:px-14 overflow-hidden"
      >
        {/* Ornamen Garis Geometris Melingkar di Background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
          <svg className="w-[120vw] max-w-[1100px] aspect-square" viewBox="0 0 1000 1000" fill="none">
            <circle cx="500" cy="500" r="180" stroke="#000" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="500" cy="500" r="280" stroke="#000" strokeWidth="1" />
            <circle cx="500" cy="500" r="390" stroke="#000" strokeWidth="1" strokeDasharray="2 4" />
            <circle cx="500" cy="500" r="480" stroke="#000" strokeWidth="1" />
          </svg>
        </div>

        {/* Teks Kiri Atas */}
        <div className="relative z-20 flex justify-between items-start max-w-6xl mx-auto w-full">
          <div>
            <p className="text-base md:text-lg font-medium text-slate-900 leading-tight">
              Freelance
            </p>
            <p className="text-base md:text-lg font-medium text-slate-900 leading-tight">
              Web &amp; App Developer
            </p>
          </div>
        </div>

        {/* Marquee Teks Raksasa yang Berjalan Horizontal */}
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

        {/* Foto Aditia di Tengah Depan Teks (Transparan, Diperbesar, Tanpa Border) */}
        <div className="relative z-10 flex justify-center items-end h-[62vh] sm:h-[72vh] md:h-[82vh] pointer-events-none -mb-10">
          <div className="relative h-full flex items-end justify-center pointer-events-auto">
            <img
              src="/aditia_cutout.png"
              alt="Aditia Ihsan Akbar"
              className="h-full w-auto max-h-[82vh] object-contain object-bottom contrast-[1.05] filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] select-none"
            />
          </div>
        </div>

        {/* Sisi Bawah: Scroll Down */}
        <div className="relative z-20 flex justify-end max-w-6xl mx-auto w-full">
          <a
            href="#about"
            className="flex flex-col items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-800 hover:text-black transition-colors"
          >
            <span>Scroll down</span>
            <span className="text-base animate-bounce">↓</span>
          </a>
        </div>
      </section>

      {/* ================= 3. ABOUT SECTION (DARK THEME - 02/05) ================= */}
      <section id="about" className="relative bg-[#0a0a0a] text-white py-24 md:py-36 px-6 md:px-14 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* Index Section */}
          <div className="flex justify-end mb-6">
            <span className="font-mono text-xs tracking-widest text-neutral-500">
              02/05
            </span>
          </div>

          <div className="grid md:grid-cols-12 gap-10 items-start">
            {/* Kiri: Judul Masif /ABOUT & Panah */}
            <div className="md:col-span-5">
              <h2 className="font-display text-8xl sm:text-9xl md:text-[11rem] leading-none uppercase tracking-tighter text-white">
                /ABOUT
              </h2>
              <div className="mt-4 text-6xl md:text-8xl text-neutral-600 font-light select-none">
                ↗
              </div>
            </div>

            {/* Kanan: Paragraf Pengenalan & Status */}
            <div className="md:col-span-7 md:pt-6">
              <blockquote className="text-lg md:text-2xl font-light text-neutral-200 leading-relaxed">
                &ldquo;Hello! I'm Aditia Ihsan Akbar, a Computer Engineering graduate from Al-Azhar University Indonesia.

I'm deeply focused on Frontend & Backend Development, Product Design, and exploring Data Science & Machine Learning.

Currently, I am open to new job opportunities and exciting project collaborations.&rdquo;
              </blockquote>

              <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-neutral-400">
                    STATUS AKTIF
                  </p>
                  <p className="font-mono text-xs md:text-sm text-neutral-200 uppercase mt-1 tracking-wider">
                    AVAILABLE FOR 2026 PROJECTS &amp; FULL-TIME ROLES
                  </p>
                </div>
                <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                  JAKARTA, INDONESIA
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. RUNNING RIBBON DIVIDER MARQUEE ================= */}
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

      {/* ================= 5. SELECTED WORKS SECTION (LIGHT THEME - 03/05) ================= */}
      <section id="works" className="relative bg-[#f8f8fa] text-slate-950 py-24 md:py-32 px-6 md:px-14 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Index Section */}
          <div className="flex justify-end mb-4">
            <span className="font-mono text-xs tracking-widest text-slate-400">
              03/05
            </span>
          </div>

          {/* Header Bagian Karya: Title, Subtitle & Circular "Get in Touch" Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-8xl sm:text-9xl md:text-[11rem] leading-none uppercase tracking-tighter text-slate-950">
                /WORKS
              </h2>
              <p className="mt-4 text-base md:text-xl text-slate-700 font-light leading-relaxed">
                Aditia membawa nilai nyata di setiap proyek — konsisten melampaui ekspektasi klien dan menaikkan standar baru di dunia freelance design &amp; development.
              </p>
            </div>

            {/* Circular CTA Button */}
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

          {/* Subheader Carousel: Label & Arrow Buttons */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
              SELECTED WORKS
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                aria-label="Scroll left"
                className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-black hover:bg-black hover:text-white transition"
              >
                <FiChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                aria-label="Scroll right"
                className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-black hover:bg-black hover:text-white transition"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Carousel Slider Kartu Proyek */}
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2"
          >
            {projectsList.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedProject(item)}
                className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 cursor-pointer group select-none"
              >
                {/* Gambar Thumbnail dengan Nomor Badge */}
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-neutral-900 border border-slate-200 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Badge Nomor Pojok Kiri Atas */}
                  <span className="absolute top-3 left-3 font-display text-lg text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {item.number}
                  </span>

                  {/* Hover Icon Arrow di Tengah */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <FiArrowUpRight size={20} />
                    </span>
                  </div>
                </div>

                {/* Info Teks di Bawah Gambar */}
                <div className="mt-4">
                  <h3 className="font-display text-3xl uppercase tracking-tight text-slate-900 group-hover:text-black transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                    {item.category} · {item.year}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Baris Progress Scroll Carousel */}
          <div className="mt-4 w-full h-[2px] bg-slate-200 relative overflow-hidden rounded-full">
            <div
              className="h-full bg-black transition-all duration-150 rounded-full"
              style={{ width: `${Math.max(12, scrollProgress)}%` }}
            />
          </div>
        </div>
      </section>

      {/* ================= 6. INTERACTIVE PROCESS SECTION (DARK THEME - 04/05) ================= */}
      <section id="process" className="relative bg-[#0a0a0a] text-white py-24 md:py-36 px-6 md:px-14 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* Index Section */}
          <div className="flex justify-end mb-6">
            <span className="font-mono text-xs tracking-widest text-neutral-500">
              04/05
            </span>
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Kiri: Tab DEFINE / DESIGN / DELIVER */}
            <div className="md:col-span-6 flex flex-col justify-center">
              
              <div className="flex items-center gap-6">
                {/* Indikator 3 Titik Vertikal */}
                <div className="flex flex-col gap-8 py-2">
                  {processSteps.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveStep(s.id)}
                      aria-label={`Pilih tahap ${s.name}`}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeStep === s.id
                          ? 'bg-white scale-125 ring-4 ring-white/20'
                          : 'bg-neutral-700 hover:bg-neutral-500'
                      }`}
                    />
                  ))}
                </div>

                {/* Teks Judul Besar 3 Tahap */}
                <div className="flex flex-col gap-1">
                  {processSteps.map((s) => {
                    const isActive = activeStep === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setActiveStep(s.id)}
                        onMouseEnter={() => setActiveStep(s.id)}
                        className={`text-left font-display text-6xl sm:text-7xl md:text-8xl uppercase tracking-tighter leading-none transition-all duration-300 ${
                          isActive
                            ? 'text-white translate-x-2'
                            : 'text-neutral-700 hover:text-neutral-400'
                        }`}
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Paragraf Keterangan Tahap Aktif */}
              <div className="mt-10 pl-9 max-w-lg min-h-[110px]">
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
                  {activeStepData.tag}
                </p>
                <p className="text-base md:text-lg font-light text-neutral-300 leading-relaxed transition-opacity duration-300">
                  {activeStepData.description}
                </p>
              </div>
            </div>

            {/* Kanan: Foto Showcase Sesuai Tahap Aktif */}
            <div className="md:col-span-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
                <img
                  key={activeStepData.image}
                  src={activeStepData.image}
                  alt={activeStepData.name}
                  className="w-full h-full object-cover animate-fadeUp duration-500"
                />
                <div className="absolute top-4 left-4 rounded-md bg-black/60 backdrop-blur px-3 py-1 font-mono text-xs text-white uppercase tracking-wider">
                  {activeStepData.name} PHASE
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. SERVICES & CAPABILITIES HIGHLIGHT (#services) ================= */}
      <section id="services" className="relative bg-[#0d0d0d] text-white py-20 px-6 md:px-14 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              KAPABILITAS &amp; LAYANAN UTAMA
            </span>
            <span className="font-mono text-xs text-neutral-500">
              STACK TECH 2026
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 transition">
              <span className="font-mono text-xs text-neutral-500">01</span>
              <h4 className="font-display text-2xl uppercase mt-2 text-white">Full-Stack Web</h4>
              <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">
                Pengembangan aplikasi web modern dengan React, TypeScript, Node.js, dan database terstruktur.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 transition">
              <span className="font-mono text-xs text-neutral-500">02</span>
              <h4 className="font-display text-2xl uppercase mt-2 text-white">UI/UX Design</h4>
              <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">
                Perancangan antarmuka visual intuitif, wireframing di Figma, dan design system yang konsisten.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 transition">
              <span className="font-mono text-xs text-neutral-500">03</span>
              <h4 className="font-display text-2xl uppercase mt-2 text-white">API &amp; Backend</h4>
              <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">
                Arsitektur RESTful API, integrasi layanan pihak ketiga, autentikasi aman, dan optimasi database.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 transition">
              <span className="font-mono text-xs text-neutral-500">04</span>
              <h4 className="font-display text-2xl uppercase mt-2 text-white">Performance</h4>
              <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">
                Kecepatan loading tinggi, SEO optimal, responsive di semua ukuran layar ponsel hingga desktop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. GRAND EDITORIAL FOOTER (DARK THEME - 05/05) ================= */}
      <footer id="contact" className="relative bg-[#050505] text-white pt-24 pb-12 px-6 md:px-14 border-t border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Index Section */}
          <div className="flex justify-end mb-8">
            <span className="font-mono text-xs tracking-widest text-neutral-500">
              05/05
            </span>
          </div>

          {/* 3 Kolom Navigasi Footer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 text-xs">
            {/* Kolom 1: Menu */}
            <div>
              <p className="font-mono uppercase tracking-widest text-neutral-500 mb-4">
                MENU
              </p>
              <ul className="space-y-2.5 text-neutral-300">
                <li><a href="#hero" className="hover:text-white transition">Beranda</a></li>
                <li><a href="#about" className="hover:text-white transition">Tentang</a></li>
                <li><a href="#works" className="hover:text-white transition">Karya</a></li>
                <li><a href="#process" className="hover:text-white transition">Proses</a></li>
                <li><a href="#contact" className="hover:text-white transition">Kontak</a></li>
              </ul>
            </div>

            {/* Kolom 2: Layanan */}
            <div>
              <p className="font-mono uppercase tracking-widest text-neutral-500 mb-4">
                LAYANAN
              </p>
              <ul className="space-y-2.5 text-neutral-300">
                <li><span className="hover:text-white cursor-pointer" onClick={() => setHireModalOpen(true)}>Landing Page</span></li>
                <li><span className="hover:text-white cursor-pointer" onClick={() => setHireModalOpen(true)}>Company Profile</span></li>
                <li><span className="hover:text-white cursor-pointer" onClick={() => setHireModalOpen(true)}>E-Commerce</span></li>
                <li><span className="hover:text-white cursor-pointer" onClick={() => setHireModalOpen(true)}>Web App</span></li>
                <li><span className="hover:text-white cursor-pointer" onClick={() => setHireModalOpen(true)}>UI/UX Design</span></li>
              </ul>
            </div>

            {/* Kolom 3: Kontak Langsung */}
            <div>
              <p className="font-mono uppercase tracking-widest text-neutral-500 mb-4">
                KONTAK
              </p>
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

            {/* Kolom 4: Lokasi & Deskripsi Singkat */}
            <div>
              <p className="font-mono uppercase tracking-widest text-neutral-500 mb-2">
                INDONESIA · REMOTE-FIRST
              </p>
              <p className="text-neutral-400 font-light leading-relaxed mt-3">
                Freelance full stack developer. Dari papan tulis kosong sampai rilis, dikerjakan sendiri dari ujung ke ujung.
              </p>
              <div className="mt-4">
                <a
                  href="/path-to-cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-white font-mono uppercase tracking-wider underline hover:text-neutral-300"
                >
                  <FiDownload size={13} /> Unduh Resume (CV)
                </a>
              </div>
            </div>
          </div>

          {/* TIPOGRAFI RAKSASA NAMA BRAND DI FOOTER */}
          <div className="w-full overflow-hidden select-none my-8">
            <h1 className="font-display text-[19vw] leading-none text-white tracking-tighter text-center uppercase whitespace-nowrap">
              ADITIA
            </h1>
          </div>

          {/* Baris Paling Bawah: Hak Cipta & Status */}
          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
            <div>
              © 2026 ADITIA IHSAN AKBAR
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>OPEN FOR FREELANCE WORK</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MODAL DETAIL PROYEK ================= */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-neutral-800 text-white shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Tutup */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
              aria-label="Tutup modal"
            >
              <FiX size={20} />
            </button>

            {/* Slider / Preview Gambar Proyek */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 mb-6">
              <img
                src={currentImages[activeImageIdx]}
                alt={selectedProject.title}
                className="w-full h-full object-contain"
              />

              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    aria-label="Gambar sebelumnya"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-black transition"
                  >
                    <FiChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImage}
                    aria-label="Gambar berikutnya"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-black transition"
                  >
                    <FiChevronRight size={18} />
                  </button>

                  <span className="absolute bottom-3 right-3 rounded-full bg-black/70 backdrop-blur px-3 py-1 font-mono text-xs text-white">
                    {activeImageIdx + 1} / {currentImages.length}
                  </span>
                </>
              )}
            </div>

            {/* Thumbnail selector jika lebih dari 1 gambar */}
            {currentImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
                {currentImages.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActiveImageIdx(i)}
                    className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                      activeImageIdx === i ? 'border-white scale-105' : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Info Lengkap Proyek */}
            <div className="mt-4">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                {selectedProject.category} · {selectedProject.year}
              </span>
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight mt-1 text-white">
                {selectedProject.title}
              </h2>
              <p className="mt-4 text-neutral-300 font-light leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Fitur Utama */}
              {selectedProject.features && selectedProject.features.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">
                    FITUR UTAMA:
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm text-neutral-300">
                    {selectedProject.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <span className="text-emerald-400 text-xs">✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tag Teknologi */}
              <div className="mt-6 flex flex-wrap gap-2">
                {selectedProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Tombol Tautan Aksi */}
              <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-neutral-800">
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition"
                  >
                    Live Demo <FiArrowUpRight size={14} />
                  </a>
                )}
                {selectedProject.repoUrl && (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition"
                  >
                    Source Code <FaGithub size={14} />
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full border border-neutral-800 px-5 py-2.5 text-xs font-mono uppercase text-neutral-400 hover:text-white transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL "HIRE ME" / FORM PROYEK ================= */}
      {hireModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setHireModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-neutral-950 border border-neutral-800 text-white shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setHireModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition"
              aria-label="Tutup"
            >
              <FiX size={18} />
            </button>

            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Available For Hire
            </span>
            <h3 className="font-display text-4xl uppercase tracking-tight mt-1">
              Let&apos;s Work Together
            </h3>
            <p className="mt-2 text-sm text-neutral-400 font-light leading-relaxed">
              Punya ide proyek, kebutuhan pembuatan web, atau tawaran kerja sama? Hubungi saya langsung melalui saluran berikut:
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="https://wa.me/6281293630133?text=Halo%20Aditia,%20saya%20tertarik%20untuk%20bekerja%20sama%20dengan%20Anda."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition group"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <FaWhatsapp size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">WhatsApp Chat</p>
                    <p className="text-xs text-emerald-400/80 font-mono">+62 812-9363-0133 (Fast Response)</p>
                  </div>
                </div>
                <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <a
                href="mailto:aditiaakbar44@gmail.com?subject=Tawaran%20Proyek%20/%20Kerjasama"
                className="flex items-center justify-between p-4 rounded-2xl border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 transition group"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-neutral-800 text-white">
                    ✉
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">Kirim Email</p>
                    <p className="text-xs text-neutral-400 font-mono">aditiaakbar44@gmail.com</p>
                  </div>
                </div>
                <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <a
                href="https://www.linkedin.com/in/aditia-ihsan-akbar-81a7b3448/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 transition group"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-neutral-800 text-blue-400">
                    <FaLinkedinIn size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">Profil LinkedIn</p>
                    <p className="text-xs text-neutral-400 font-mono">aditia-ihsan-akbar</p>
                  </div>
                </div>
                <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>

            <button
              onClick={() => setHireModalOpen(false)}
              className="mt-6 w-full py-2.5 rounded-full border border-neutral-800 text-xs font-mono uppercase text-neutral-400 hover:text-white transition"
            >
              Kembali ke Portofolio
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
