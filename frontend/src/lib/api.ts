import type { Certificate, Project, TechItem } from '../types';
import { certificates, projects, techStack } from '../data/content';

/** Path gambar tetap dipakai apa adanya (URL penuh atau file di /public) */
export const assetUrl = (path: string | null): string | null => path;

// Data sekarang berasal dari src/data/content.ts (tanpa backend).
// Tetap mengembalikan Promise agar kompatibel dengan hook useFetch.
export const api = {
  getProjects: () => Promise.resolve<Project[]>(projects),
  getCertificates: () => Promise.resolve<Certificate[]>(certificates),
  getTechStack: () => Promise.resolve<TechItem[]>(techStack),
};
