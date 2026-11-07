import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { api } from '../lib/api';
import { Empty, ErrorState, Loading } from '../components/States';
import type { TechItem } from '../types';

export default function Contact() {
  // Mengambil data tech stack (termasuk kolom description) dari database
  const { data, loading, error, reload } = useFetch<TechItem[]>(api.getTechStack);

  // Hanya satu kartu yang terbuka dalam satu waktu; klik lagi untuk menutup
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const toggle = (id: number) => setFlippedId((cur) => (cur === id ? null : id));

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      {/* Header Halaman - SUDAH DIUBAH MENJADI NEON DAN TANPA // MY SKILLS */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          Tech Stack
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-slate-400">
          Here are the technologies, programming languages, and tools I usually use to design and build a web project. Click the cards to see what they do.
        </p>
      </div>

      {/* Kondisi Loading, Error, dan Empty */}
      {loading && <Loading />}
      {error && <ErrorState message={error} onRetry={reload} />}
      {!loading && !error && !data?.length && <Empty label="Belum ada data tech stack." />}

      {/* Grid Kartu Tech Stack (bisa dibalik) */}
      {data && data.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((t) => {
            const isFlipped = flippedId === t.id;

            return (
              <div
                key={t.id}
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
                aria-label={`${t.name}: klik untuk ${isFlipped ? 'menutup' : 'melihat'} penjelasan`}
                onClick={() => toggle(t.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(t.id);
                  }
                }}
                className="group h-48 cursor-pointer perspective-1000 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
              >
                {/* Wadah yang berputar */}
                <div
                  className={`relative h-full w-full transition-transform duration-500 transform-style-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* SISI DEPAN: ikon + nama */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#111827] p-5 backface-hidden transition-colors group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                    <img src={t.icon_url} alt="" className="h-14 w-14 object-contain" loading="lazy" />
                    <span className="text-sm font-bold tracking-wide text-slate-200">{t.name}</span>
                    <span className="font-mono text-[10px] text-cyan-400">Klik untuk detail ↻</span>
                  </div>

                  {/* SISI BELAKANG: penjelasan dari database */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-cyan-500/50 bg-[#1e293b] p-4 text-center shadow-lg shadow-cyan-500/20 backface-hidden rotate-y-180">
                    <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-amber-400">{t.name}</h4>
                    <p className="text-xs leading-relaxed text-slate-200">
                      {t.description || 'Belum ada deskripsi.'}
                    </p>
                    <span className="mt-3 font-mono text-[10px] text-cyan-400">Klik untuk kembali ✕</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}