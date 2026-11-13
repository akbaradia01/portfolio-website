import { Fragment, useState } from 'react';

type Item = { href: string; label: string };

export default function HoverNav({ items }: { items: Item[] }) {
  const [pill, setPill] = useState({ left: 0, width: 0, show: false, animate: false });

  return (
    <div
      className="relative hidden md:flex items-center gap-1 text-xs font-bold tracking-wider uppercase text-slate-700"
      onMouseLeave={() => setPill(p => ({ ...p, show: false, animate: false }))}
    >
      {/* pill putih dengan border yang meluncur */}
      <span
        aria-hidden
        className={`pointer-events-none absolute top-1/2 h-8 -translate-y-1/2 rounded-full border border-slate-300 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] ${
          pill.animate ? 'transition-all duration-300 ease-out' : 'transition-opacity duration-200'
        }`}
        style={{ left: pill.left, width: pill.width, opacity: pill.show ? 1 : 0 }}
      />

      {items.map((item, i) => (
        <Fragment key={item.href}>
          {i > 0 && <span className="text-slate-300 font-normal">/</span>}
                    <a
            href={item.href}
            className="relative z-10 px-3 py-1.5 transition-colors hover:text-black focus:outline-none"
            onMouseEnter={e => {
              const el = e.currentTarget; // ambil elemen SEKARANG, sebelum event selesai
              const left = el.offsetLeft;
              const width = el.offsetWidth;
              setPill(p => ({ left, width, show: true, animate: p.show }));
            }}
          >
            {item.label}
          </a>
        </Fragment>
      ))}
    </div>
  );
}