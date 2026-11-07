-- Database untuk Portfolio Website (MySQL 8+)
-- Jalankan: mysql -u root -p < database/schema.sql

CREATE DATABASE IF NOT EXISTS portfolio_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE portfolio_db;

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(255) NULL,
  features JSON NOT NULL,          -- ["Fitur 1", "Fitur 2"]
  technologies JSON NOT NULL,      -- ["React", "Tailwind CSS"]
  demo_url VARCHAR(255) NULL,
  repo_url VARCHAR(255) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  issuer VARCHAR(150) NOT NULL,
  issued_date DATE NULL,
  image_url VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tech_stack (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  icon_url VARCHAR(255) NOT NULL,
  category VARCHAR(40) NOT NULL DEFAULT 'general',  -- frontend | backend | database | tools
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  message TEXT NOT NULL,
  image_url VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(120) NOT NULL,
  subject VARCHAR(150) NULL,
  message TEXT NOT NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ DATA CONTOH ============
INSERT INTO tech_stack (name, icon_url, category, sort_order) VALUES
('HTML5',        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', 'frontend', 1),
('CSS3',         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', 'frontend', 2),
('JavaScript',   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 'frontend', 3),
('TypeScript',   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 'frontend', 4),
('React.js',     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'frontend', 5),
('Tailwind CSS', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', 'frontend', 6),
('PHP',          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', 'backend', 7),
('Node.js',      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 'backend', 8),
('MySQL',        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', 'database', 9),
('Git',          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', 'tools', 10),
('Vercel',       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', 'tools', 11);

INSERT INTO projects (title, description, image_url, features, technologies, demo_url, repo_url, sort_order) VALUES
('Sistem Informasi Sekolah',
 'Aplikasi web untuk mengelola data siswa, guru, dan nilai secara terpusat.',
 'https://placehold.co/800x450/0f172a/38bdf8?text=Project+1',
 JSON_ARRAY('Manajemen data siswa', 'Input & rekap nilai', 'Login multi-role'),
 JSON_ARRAY('PHP', 'MySQL', 'Tailwind CSS'),
 'https://example.vercel.app', 'https://github.com/username/project-1', 1),
('Landing Page Company Profile',
 'Website company profile responsif dengan animasi halus dan SEO dasar.',
 'https://placehold.co/800x450/0f172a/a78bfa?text=Project+2',
 JSON_ARRAY('Desain responsif', 'Animasi scroll', 'Form kontak'),
 JSON_ARRAY('React.js', 'TypeScript', 'Tailwind CSS'),
 'https://example.vercel.app', 'https://github.com/username/project-2', 2);

INSERT INTO certificates (title, issuer, issued_date, image_url, sort_order) VALUES
('Sertifikat PKL', 'PT Cakrawala Global Yaksa', '2025-06-30', 'https://placehold.co/800x560/0f172a/22d3ee?text=Sertifikat+PKL', 1);

INSERT INTO comments (name, message) VALUES
('Pengunjung', 'Desain portofolionya keren banget!');
