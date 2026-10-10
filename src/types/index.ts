export type ModuleMode = 'home' | 'lifelens' | 'liferoute';

export interface ScenarioPreset {
  id: string;
  title: string;
  shortLabel: string;
  category: 'Major Purchase' | 'Relocation' | 'Housing' | 'Entrepreneurship' | 'Career' | 'Civic & Legal';
  description: string;
  iconName: string;
}

export interface ForesightVector {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  accentClass: string;
  bgLightClass: string;
  borderClass: string;
  sampleQuestions: string[];
}

