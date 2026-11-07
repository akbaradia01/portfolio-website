# Portfolio Website — Frontend Only

Website portofolio bertema gelap (React + TypeScript + Tailwind + Vite). Tanpa backend dan database, jadi bisa langsung di-deploy ke Vercel.

## Menjalankan

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil build di frontend/dist
```

## Kustomisasi

- `frontend/src/data/profile.ts` — nama, peran, foto, link CV, teks About, sosial media.
- `frontend/src/data/content.ts` — daftar **projects**, **certificates**, dan **tech stack**.
- Gambar lokal: taruh di `frontend/public/` lalu tulis path-nya (mis. `/images/proyek1.png`), atau pakai URL.

## Deploy ke Vercel

Import repo, set **Root Directory** ke `frontend`, framework *Vite*. `vercel.json` sudah menangani routing SPA.
