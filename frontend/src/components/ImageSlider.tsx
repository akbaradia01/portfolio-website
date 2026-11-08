import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  /** Daftar path gambar, contoh: ['/snip.iy/Snip-1.jpeg', '/snip.iy/Snip-2.jpeg'] */
  images: string[];
  alt: string;
}

/**
 * Slider gambar: panah kiri/kanan, titik indikator, geser (swipe) di HP,
 * dan klik gambar untuk memperbesar (tombol ← → dan Esc di keyboard).
 */
export default function ImageSlider({ images, alt }: Props) {
  const total = images.length;
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  // Keyboard hanya aktif saat tampilan besar terbuka
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, prev, next]);

  if (total === 0) return null;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const arrowClass =
    'absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2 text-white backdrop-blur transition hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent';

  const renderSlider = (big: boolean) => (
    <div
      className={`relative overflow-hidden bg-ink-900 ${big ? 'rounded-2xl' : ''}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Deretan gambar yang bergeser ke kiri/kanan */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} - foto ${i + 1}`}
            draggable={false}
            onClick={() => !big && setOpen(true)}
            className={`w-full shrink-0 object-contain ${
              big ? 'max-h-[80vh]' : 'aspect-video cursor-zoom-in object-cover'
            }`}
          />
        ))}
      </div>

      {total > 1 && (
        <>
          <button type="button" onClick={prev} aria-label="Foto sebelumnya" className={`${arrowClass} left-3`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" onClick={next} aria-label="Foto berikutnya" className={`${arrowClass} right-3`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <span className="absolute right-3 top-3 rounded-md bg-black/60 px-2 py-1 font-mono text-xs text-white">
            {index + 1} / {total}
          </span>

          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ke foto ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-5 bg-accent' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      {renderSlider(false)}

      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeri ${alt}`}
          onClick={() => setOpen(false)}
        >
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            {renderSlider(true)}
            <button type="button" onClick={() => setOpen(false)} className="btn-ghost mx-auto mt-4">
              Tutup (Esc)
            </button>
          </div>
        </div>
      )}
    </>
  );
}