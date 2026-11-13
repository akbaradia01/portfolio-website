import { useState, useRef, useEffect } from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Mengunci volume di 35% (0.35)
    if (audioRef.current) {
      audioRef.current.volume = 0.35;
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log("Audio diblokir atau gagal diputar:", error);
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Elemen Audio HTML5 dengan atribut loop */}
      <audio ref={audioRef} src="/bg-music.mp3" loop />

      {/* Tombol Kontrol Interaktif */}
      <button
        onClick={togglePlay}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 backdrop-blur-md shadow-lg ${
          isPlaying 
            ? 'bg-white/10 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-pulse' 
            : 'bg-[#111827]/80 border-white/10 text-slate-400 hover:text-white hover:border-white/30'
        }`}
        title={isPlaying ? "Matikan Musik" : "Putar Musik Latar"}
      >
        {isPlaying ? <FiVolume2 className="text-lg animate-bounce" /> : <FiVolumeX className="text-lg" />}
        <span className="text-xs font-mono font-medium hidden sm:inline">
          {isPlaying ? "Lo-Fi Beats: ON" : "Play Music"}
        </span>
      </button>
    </div>
  );
}