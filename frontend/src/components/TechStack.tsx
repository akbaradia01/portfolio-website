import { useState } from 'react';
import { 
  SiHtml5, SiCss, SiJavascript, SiTypescript, 
  SiReact, SiTailwindcss, SiPhp, SiPython, SiNodedotjs, 
  SiMysql, SiPostgresql, SiDocker, SiGit, SiVercel 
} from 'react-icons/si';

export default function TechStack() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const techs = [
    { name: "HTML5", icon: <SiHtml5 className="text-[#E34F26] text-5xl" />, desc: "Berfungsi sebagai kerangka dan struktur dasar untuk membangun halaman web." },
    { name: "CSS3", icon: <SiCss className="text-[#1572B6] text-5xl" />, desc: "Digunakan untuk mengatur gaya visual, warna, tata letak, dan animasi tampilan web." },
    { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E] text-5xl" />, desc: "Bahasa pemrograman yang memberikan interaktivitas dan logika dinamis pada web." },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6] text-5xl" />, desc: "Superset dari JavaScript dengan sistem tipe data statis untuk mengurangi error pada kode." },
    { name: "React.js", icon: <SiReact className="text-[#61DAFB] text-5xl" />, desc: "Library JavaScript untuk membangun antarmuka pengguna (UI) berbasis komponen." },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4] text-5xl" />, desc: "Framework CSS utility-first untuk mempercepat styling langsung di dalam markup." },
    { name: "PHP", icon: <SiPhp className="text-[#777BB4] text-5xl" />, desc: "Bahasa pemrograman server-side untuk memproses logika backend dan database." },
    { name: "Python", icon: <SiPython className="text-[#3776AB] text-5xl" />, desc: "Bahasa pemrograman serbaguna untuk pengembangan backend, otomatisasi, dan data science." },
    { name: "Node.js", icon: <SiNodedotjs className="text-[#339933] text-5xl" />, desc: "Runtime JavaScript agar dapat menjalankan kode JavaScript di luar browser (backend)." },
    { name: "MySQL", icon: <SiMysql className="text-[#4479A1] text-5xl" />, desc: "Sistem manajemen database relasional untuk menyimpan dan mengelola data aplikasi." },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1] text-5xl" />, desc: "Database relasional tingkat lanjut yang kuat dan skalabel untuk menangani data kompleks." },
    { name: "Docker", icon: <SiDocker className="text-[#2496ED] text-5xl" />, desc: "Platform kontainerisasi untuk mengemas aplikasi dan lingkungannya agar mudah dijalankan." },
    { name: "Git", icon: <SiGit className="text-[#F05032] text-5xl" />, desc: "Version control system untuk melacak perubahan kode dan kolaborasi tim." },
    { name: "Vercel", icon: <SiVercel className="text-white text-5xl" />, desc: "Platform cloud untuk melakukan deployment aplikasi web secara instan dan cepat." }
  ];

  const handleCardClick = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section id="services" className="min-h-screen bg-[#0a0a0a] text-white py-24 md:py-36 px-6 md:px-14 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        
        {/* HEADER SECTION - DIPERBARUI */}
        <div className="mb-16">
          <h1 className="font-display text-6xl sm:text-8xl md:text-[8rem] leading-[0.9] uppercase tracking-tighter text-white hover:text-transparent hover:[-webkit-text-stroke:2px_white] transition-all duration-500 cursor-default select-none mb-4">
            Tech Stack
          </h1>
          <p className="text-neutral-500 text-sm md:text-base mt-4 max-w-2xl transition-colors duration-300 hover:text-white cursor-default font-light leading-relaxed">
            Here are the technologies, programming languages, and tools I usually use to design and build a web project. Click the cards to see what they do.
          </p>
        </div>

        {/* Grid Kartu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {techs.map((tech, index) => {
            const isFlipped = flippedIndex === index;

            return (
              <div 
                key={index}
                className="h-48 perspective-1000 cursor-pointer group"
                onClick={() => handleCardClick(index)}
              >
                {/* Container yang berputar */}
                <div 
                  className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  
                  {/* SISI DEPAN KARTU */}
                  <div className="absolute inset-0 backface-hidden w-full h-full bg-[#111] border border-white/30 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300">
                    <div>{tech.icon}</div>
                    <span className="font-bold text-sm tracking-wide text-neutral-400 group-hover:text-white transition-colors duration-300">{tech.name}</span>
                    <span className="text-[10px] text-neutral-500 group-hover:text-white font-mono transition-colors duration-300">Klik untuk detail ↻</span>
                  </div>

                  {/* SISI BELAKANG KARTU */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full bg-[#1e293b] border border-white rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg shadow-white/10">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">{tech.name}</h4>
                    <p className="text-xs text-neutral-300 leading-relaxed">{tech.desc}</p>
                    <span className="text-[10px] text-neutral-400 mt-3 font-mono hover:text-white transition-colors duration-300">Klik untuk kembali ✕</span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}