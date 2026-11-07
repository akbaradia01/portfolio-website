export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  features: string[];
  technologies: string[];
  demo_url: string | null;
  repo_url: string | null;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issued_date: string | null;
  image_url: string;
}

export interface TechItem {
  id: number;
  name: string;
  icon_url: string;
  category: string;
  description: string | null;
}

export interface CommentItem {
  id: number;
  name: string;
  message: string;
  image_url: string | null;
  created_at: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}
