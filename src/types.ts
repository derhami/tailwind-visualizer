export interface Breakpoint {
  name: string;
  min: number;
  max: number | null;
  color: string;
  desc: string;
}

export interface DesignToken {
  name: string;
  value: string;
  desc: string;
}

export interface SearchItem {
  category: string;
  utility: string;
  css: string;
  description: string;
  descriptionEn?: string;
}

export interface Settings {
  theme: 'dark' | 'light' | 'system';
  dir: 'rtl' | 'ltr';
  animation: boolean;
  gridOverlay: boolean;
  measurementOverlay: boolean;
  containerOverlay: boolean;
}

export interface CheatsheetItem {
  title: string;
  titleEn?: string;
  code: string;
  explanation: string;
  explanationEn?: string;
}
