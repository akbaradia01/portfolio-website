import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Portfolio from './pages/Portfolio';
import TechStack from './pages/TechStack';
import Contact from './pages/Contact';
import CustomCursor from './components/CustomCursor';
import BackgroundMusic from './components/BackgroundMusic';
import { profile } from './data/profile';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-fadeUp">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/education" element={<Education />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/tech-stack" element={<TechStack />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <CustomCursor />
      <BackgroundMusic />
      <ScrollToTop />
      
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="grid-bg absolute inset-0" />
        <div className="absolute left-1/2 top-[-10%] h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <Navbar />
      <main className="min-h-[calc(100vh-130px)]">
        <AnimatedRoutes />
      </main>
      <footer className="border-t border-white/5 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {profile.name}. Dibuat dengan React, TypeScript &amp; Tailwind CSS.
      </footer>
    </BrowserRouter>
  );
}