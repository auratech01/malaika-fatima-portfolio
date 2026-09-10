export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  stats?: { label: string; value: string }[];
  overview?: string;
  keyModules?: string[];
  protocols?: string[];
  milestones?: string[];
  codeSnippet?: {
    title: string;
    language: string;
    code: string;
  };
}

export interface LabExperiment {
  id: string;
  title: string;
  language: string;
  codeSnippet: string;
  outputPreview?: string;
  tags: string[];
  description: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: string[];
  highlight?: boolean;
}

export interface EducationData {
  degree: string;
  institution: string;
  progress: string;
  completedSemesters: number;
  totalSemesters: number;
  description: string;
  cgpa?: string;
  currentSemester?: string;
}

export interface ToolItem {
  name: string;
  category: string;
  iconName: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export interface ContactData {
  email: string;
  githubUrl: string;
  githubUsername: string;
  linkedinUrl?: string;
  whatsappNumber?: string;
  whatsappDisplay?: string;
  whatsappUrl?: string;
  availability: string;
}

export interface UserPortfolioData {
  name: string;
  handle: string;
  title: string;
  tagline: string;
  subtitle: string;
  aboutQuote: string;
  aboutParagraphs: string[];
  education: EducationData;
  skillCategories: SkillCategory[];
  toolsWorkflow: ToolItem[];
  certifications: CertificationItem[];
  contact: ContactData;
  learningJourneyText: string;
  philosophy: {
    mainQuote: string;
    bodyText: string;
    heartQuote: string;
  };
  visionText: string[];
  statusText: string;
  meshGenStatus: string;
  copyrightText: string;
  robotMedia: {
    type: 'image' | 'video';
    imageUrl: string;
    videoUrl?: string;
    alt: string;
  };
  navigation: { label: string; href: string }[];
  projects: ProjectItem[];
  labExperiments: LabExperiment[];
}

