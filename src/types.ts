export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: 'fullstack' | 'frontend' | 'ai' | 'tools';
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'cloud-tools' | 'languages';
  level: number; // 0 to 100
  description?: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  type: 'work' | 'education';
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
