import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { profile } from '../data/profile';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/education', label: 'Education' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Tech Stack' }, 
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      {/* Container utama dengan gaya Floating Pill, background hitam transparan & border halus */}
      <nav className="flex items-center justify-between gap-6 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl max-w-2xl w-full">
        {/* Logo */}
        <NavLink to="/" className="font-mono text-sm font-bold tracking-widest text-white pl-2">
          {profile.nickname}
        </NavLink>

        {/* Menu Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `relative px-4 py-1.5 text-xs font-medium transition-all duration-300 rounded-full ${
                    isActive ? 'text-white bg-neutral-900 border border-neutral-700 shadow-inner' : 'text-slate-400 hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Tombol Hamburger Mobile */}
        <button
          className="rounded-lg p-2 text-slate-300 hover:bg-white/5 md:hidden"
          aria-label="Buka menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {/* Dropdown Menu untuk Mobile */}
      {open && (
        <div className="absolute top-16 left-4 right-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl md:hidden">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                      isActive ? 'bg-neutral-900 text-white border border-neutral-800' : 'text-slate-400 hover:text-white'
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}