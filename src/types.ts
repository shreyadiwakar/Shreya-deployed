export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  category: 'Compiler & Systems' | 'Full-Stack' | 'Systems & AI' | 'Dev Tools' | 'Creative & Art';
  accentColor: 'yellow' | 'blue' | 'green' | 'pink' | 'purple';
  techStack: string[];
  metrics?: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  architectureHighlights?: string[];
}

export interface SkillCategory {
  title: string;
  accent: 'yellow' | 'blue' | 'green' | 'pink' | 'purple';
  skills: { name: string; level: number; iconName?: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  department?: string;
  rollNo?: string;
  period: string;
  gradeOrGpa: string;
  coursework: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
  accent: 'yellow' | 'blue' | 'green' | 'pink' | 'purple';
}

export interface ProfileData {
  name: string;
  title: string;
  roles: string[];
  email: string;
  location: string;
  college?: string;
  department?: string;
  rollNo?: string;
  hobby?: string;
  status: string;
  bio: string;
  shortBio: string;
  philosophy: string;
  github: string;
  linkedin: string;
  twitter?: string;
  leetcode?: string;
}
