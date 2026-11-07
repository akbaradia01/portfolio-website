import { motion } from 'framer-motion';
import { profile } from '../data/profile';

export default function IDCard() {
  return (
    <div className="flex items-center justify-center -mt-6 md:-mt-12 perspective-1000">
      <motion.div
        // Efek animasi berayun bolak-balik ke kanan dan kiri seperti bumerang
        animate={{ rotate: [-10, 10, -10] }}
        transition={{
          duration: 4, // Durasi satu siklus ayunan (dalam detik)
          repeat: Infinity,
          ease: "easeInOut"
        }}
        // Tetap bisa ditarik dan diberi efek interaktif saat kursor mendekat
        drag
        dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }}
        dragElastic={0.3}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-72 cursor-grab active:cursor-grabbing transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
      >
        {/* Tali lanyard */}
        <div className="mx-auto h-16 w-3 rounded-b bg-gradient-to-b from-accent/0 via-accent/60 to-accent" />
        
        {/* Body Kartu Utama */}
        <div className="relative -mt-1 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-ink-700 to-ink-900 p-5 shadow-2xl shadow-accent/10">
          
          {/* Efek pendaran cahaya di latar belakang */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent-violet/20 blur-2xl" />

          {/* Lubang atas ID Card */}
          <div className="relative mx-auto mb-4 h-5 w-16 rounded-full border border-white/20 bg-ink-950" />

          {/* Foto Profil */}
          <img
            src={profile.photoUrl}
            alt={`Foto ${profile.name}`}
            className="relative mx-auto h-44 w-36 rounded-2xl border border-white/10 object-cover pointer-events-none" 
          />

          {/* Nama & Role */}
          <div className="relative mt-4 text-center">
            <h3 className="text-lg font-bold text-white">{profile.name}</h3>
            <p className="font-mono text-xs text-accent">{profile.role}</p>
          </div>

          {/* Detail Info (ID, BASE, STATUS) */}
          <dl className="relative mt-4 space-y-1.5 border-t border-white/10 pt-3 font-mono text-[11px] text-slate-400">
            <div className="flex justify-between">
              <dt>ID</dt>
              <dd className="text-slate-200">{profile.nickname}</dd>
            </div>
            <div className="flex justify-between">
              <dt>BASE</dt>
              <dd className="text-slate-200">{profile.location}</dd>
            </div>
            <div className="flex justify-between">
              <dt>STATUS</dt>
              <dd className={profile.availableForWork ? 'text-emerald-400' : 'text-slate-400'}>
                {profile.availableForWork ? 'AVAILABLE' : 'BUSY'}
              </dd>
            </div>
          </dl>

          {/* Barcode / Equalizer di Bawah */}
          <div className="relative mt-3 flex h-6 items-end gap-[2px] opacity-60 pointer-events-none" aria-hidden>
            {Array.from({ length: 38 }).map((_, i) => (
              <span
                key={i}
                className="w-[3px] flex-1 bg-slate-300"
                style={{ height: `${40 + ((i * 7) % 60)}%` }}
              />
            ))}
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}