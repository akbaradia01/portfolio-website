# Portfolio Website — Fullstack

Website portofolio bertema gelap (dark mode) dengan latar pola grid, transisi halaman halus, dan ID card di halaman utama.

## Tech Stack

| Bagian    | Teknologi                                   |
| --------- | ------------------------------------------- |
| Frontend  | React.js, TypeScript, Tailwind CSS, Vite    |
| Backend   | Node.js, Express, Multer (upload gambar)    |
| Database  | MySQL 8+                                    |
| Deploy    | Vercel (frontend)                           |

## Struktur Folder

```
portfolio-website/
├── database/
│   └── schema.sql            # struktur tabel + data contoh
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── db.js
│   │   └── routes/           # projects, certificates, techStack, comments, contact
│   ├── uploads/              # gambar komentar yang diunggah
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/       # Navbar, IDCard, States
    │   ├── pages/            # Home, About, Portfolio, Contact
    │   ├── data/profile.ts   # <-- EDIT DATA PRIBADI ANDA DI SINI
    │   ├── lib/api.ts
    │   └── hooks/useFetch.ts
    ├── vercel.json
    └── package.json
```

## Fitur

- **Home** — status *Available for Work*, peran Frontend Developer, tautan cepat, ID card.
- **About** — profil singkat, tombol **Unduh CV** (link Google Drive), tombol ke proyek.
- **Portfolio** — tab **Projects**, **Certificates** (galeri + lightbox), dan **Tech Stack** (ikon).
- **Contact** — form kirim pesan (tersimpan ke tabel `messages`) dan kolom komentar dengan unggah gambar.

## Cara Menjalankan (Lokal)

Prasyarat: Node.js 18+ dan MySQL.

### 1. Database
```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend
```bash
cd backend
cp .env.example .env      # isi DB_USER / DB_PASSWORD sesuai MySQL Anda
npm install
npm run dev               # http://localhost:5001
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev               # http://localhost:5173
```
Saat development, Vite otomatis mem-proxy `/api` dan `/uploads` ke backend, jadi `VITE_API_URL` dibiarkan kosong.

## Kustomisasi

1. Edit `frontend/src/data/profile.ts` — nama, peran, foto, link CV, teks About, sosial media.
2. Edit data proyek, sertifikat, dan tech stack di `database/schema.sql` (atau langsung lewat MySQL).
3. Ganti `image_url` sertifikat dengan gambar asli Anda (simpan di `frontend/public/` atau pakai URL).

## Deploy

- **Frontend → Vercel**: import folder `frontend`, framework *Vite*. Tambahkan environment variable `VITE_API_URL` berisi URL backend Anda. File `vercel.json` sudah menangani routing SPA.
- **Backend & MySQL**: Vercel tidak menyediakan MySQL dan penyimpanan file permanen. Host backend di layanan seperti Railway, Render, atau VPS, dan database di PlanetScale/Railway/Aiven. Set `CLIENT_ORIGIN` di backend ke domain `.vercel.app` Anda (pisahkan dengan koma jika lebih dari satu).
- Gambar komentar disimpan di `backend/uploads`. Di hosting dengan disk sementara, gunakan penyimpanan eksternal (mis. S3/Cloudinary).

## Endpoint API

| Method | Path                | Fungsi                              |
| ------ | ------------------- | ----------------------------------- |
| GET    | `/api/projects`     | Daftar proyek                       |
| GET    | `/api/certificates` | Daftar sertifikat                   |
| GET    | `/api/tech-stack`   | Daftar tech stack                   |
| GET    | `/api/comments`     | Daftar komentar                     |
| POST   | `/api/comments`     | Kirim komentar (`multipart`, `image` opsional, maks. 2 MB) |
| POST   | `/api/contact`      | Kirim pesan kontak (JSON)           |
