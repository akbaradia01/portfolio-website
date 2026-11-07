import type { CommentItem, Certificate, ContactPayload, Project, TechItem } from '../types';

const BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';

/** Ubah path relatif (/uploads/..) menjadi URL absolut ke backend */
export const assetUrl = (path: string | null): string | null => {
  if (!path) return null;
  return /^https?:\/\//.test(path) ? path : `${BASE}${path}`;
};

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${url}`, init);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || 'Terjadi kesalahan');
  return data as T;
}

export const api = {
  getProjects: () => request<Project[]>('/api/projects'),
  getCertificates: () => request<Certificate[]>('/api/certificates'),
  getTechStack: () => request<TechItem[]>('/api/tech-stack'),
  getComments: () => request<CommentItem[]>('/api/comments'),
  postComment: (form: FormData) =>
    request<CommentItem>('/api/comments', { method: 'POST', body: form }),
  sendMessage: (payload: ContactPayload) =>
    request<{ success: boolean; message: string }>('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
};
