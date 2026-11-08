/**
 * ==== DATA KONTEN (pengganti database) ====
 * Edit/tambah item di sini, lalu simpan — halaman otomatis ikut berubah.
 * Gambar lokal: taruh di frontend/public/ lalu tulis path-nya, contoh '/images/proyek1.png'.
 */
import type { Certificate, Project, TechItem } from '../types';

const icon = (name: string, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

export const techStack: TechItem[] = [
  { id: 1, name: 'HTML5', icon_url: icon('html5'), category: 'frontend', description: 'The standard markup language used to structure the content of web pages.' },
  { id: 2, name: 'CSS3', icon_url: icon('css3'), category: 'frontend', description: 'Styles and lays out web pages: colors, spacing, responsive design, and animation.' },
  { id: 3, name: 'JavaScript', icon_url: icon('javascript'), category: 'frontend', description: 'The programming language of the web that makes pages interactive.' },
  { id: 4, name: 'TypeScript', icon_url: icon('typescript'), category: 'frontend', description: 'JavaScript with static types, which catches bugs early and makes code easier to maintain.' },
  { id: 5, name: 'React.js', icon_url: icon('react'), category: 'frontend', description: 'A component-based library for building fast, interactive user interfaces.' },
  { id: 6, name: 'Tailwind CSS', icon_url: icon('tailwindcss'), category: 'frontend', description: 'A utility-first CSS framework for building custom designs quickly.' },
  { id: 7, name: 'PHP', icon_url: icon('php'), category: 'backend', description: 'A server-side language widely used for building dynamic web applications.' },
  { id: 8, name: 'Node.js', icon_url: icon('nodejs'), category: 'backend', description: 'A JavaScript runtime for building servers and APIs.' },
  { id: 9, name: 'MySQL', icon_url: icon('mysql'), category: 'database', description: 'A popular relational database for storing and querying structured data.' },
  { id: 10, name: 'Git', icon_url: icon('git'), category: 'tools', description: 'A version control system for tracking changes and collaborating on code.' },
  { id: 11, name: 'Vercel', icon_url: icon('vercel'), category: 'tools', description: 'A platform for deploying and hosting frontend applications.' },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'Platform Streaming & Direktori Film',
    description: 'Aplikasi web modern untuk menjelajahi daftar film populer, mencari informasi detail aktor, dan mengelola daftar tontonan pribadi secara interaktif.',
    image_url: '/projectwebmovies.jpeg',
    features: [
      'Eksplorasi film populer & trending',
      'Pencarian film dan detail pemeran',
      'Manajemen daftar tontonan (Watchlist)'
    ],
    technologies: ['React', 'Tailwind CSS', 'TMDB API'],
  },
  {
    id: 2,
    title: 'App Chit-Chat UI/UX Design',
    description: 'Perancangan antarmuka dan pengalaman pengguna (UI/UX) aplikasi perpesanan seluler lengkap dengan alur autentikasi dan sistem navigasi.',
    image_url: '/chit-chat.jpeg',
    features: [
      'Desain alur autentikasi (Splash, Sign In, Register)',
      'Navigasi bawah (Bottom Bar) & Tab Bar interaktif',
      'Tampilan antarmuka ruang obrolan, riwayat panggilan, & profil'
    ],
    technologies: ['Figma', 'UI/UX Design', 'Prototyping'],
  },
];

export const certificates: Certificate[] = [
  {
    id: 1,
    title: 'Sertifikat Magang',
    issuer: 'Kementerian Pekerjaan Umum',
    issued_date: '2025-06-30',
    image_url: '/Sertifikat_Magang.jpg',
  },
];