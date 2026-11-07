import { useState } from 'react';
import { api, assetUrl } from '../lib/api';
import { useFetch } from '../hooks/useFetch';
import { Empty, ErrorState, Loading } from '../components/States';
import type { Certificate, Project } from '../types';

type Tab = 'projects' | 'certificates';

const tabs: { id: Tab; label: string }[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
];

export default function Portfolio() {
  const [tab, setTab] = useState<Tab>('projects');

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      {/* Judul Besar dengan Warna Neon */}
      <div className="mb-10">
        <span className="font-mono text-xs text-cyan-400">// portfolio showcase</span>
        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          Portofolio
        </h1>
      </div>

      <div role="tablist" className="mt-8 inline-flex rounded-xl border border-white/10 bg-ink-800/60 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              tab === t.id ? 'bg-cyan-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 animate-fadeUp" key={tab}>
        {tab === 'projects' && <ProjectsTab />}
        {tab === 'certificates' && <CertificatesTab />}
      </div>
    </section>
  );
}

function ProjectsTab() {
  const { data, loading, error, reload } = useFetch<Project[]>(api.getProjects);
  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!data?.length) return <Empty label="Belum ada proyek." />;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {data.map((p) => (
        <article 
          key={p.id} 
          className="card overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-400/10 group cursor-pointer"
        >
          {p.image_url && (
            <div className="overflow-hidden aspect-video w-full bg-ink-900">
              <img 
                src={assetUrl(p.image_url) ?? ''} 
                alt={p.title} 
                loading="lazy" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:translate-x-1" 
              />
            </div>
          )}
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

            {(p.demo_url || p.repo_url) && (
              <div className="mt-5 flex gap-3">
                {p.demo_url && (
                  <a href={p.demo_url} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                    Live Demo
                  </a>
                )}
                {p.repo_url && (
                  <a href={p.repo_url} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2">
                    Source
                  </a>
                )}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function CertificatesTab() {
  const { data, loading, error, reload } = useFetch<Certificate[]>(api.getCertificates);
  const [active, setActive] = useState<Certificate | null>(null);

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!data?.length) return <Empty label="Belum ada sertifikat." />;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((c) => (
          <button key={c.id} onClick={() => setActive(c)} className="card group overflow-hidden text-left transition hover:border-cyan-400/40">
            <img src={assetUrl(c.image_url) ?? ''} alt={c.title} loading="lazy" className="aspect-[10/7] w-full object-cover transition group-hover:scale-[1.03]" />
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
            <img src={assetUrl(active.image_url) ?? ''} alt={active.title} className="max-h-[80vh] rounded-xl" />
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