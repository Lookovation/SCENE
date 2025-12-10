export enum Screen {
  HOME = 'HOME',
  INPUT = 'INPUT',
  SCENE_SELECTION = 'SCENE_SELECTION',
  CUSTOMIZE = 'CUSTOMIZE',
  GENERATING = 'GENERATING',
  PREVIEW = 'PREVIEW',
  POST = 'POST',
}

export enum InputType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  PDF = 'PDF',
  URL = 'URL',
  LIBRARY = 'LIBRARY',
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  type: string;
  duration: number; // in seconds
  viralityScore?: number;
}

export interface Frame {
  id: string;
  imagePrompt: string;
  duration: number;
  description: string;
  imageUrl?: string; // Placeholder for generated image
}

export interface DraftSettings {
  style: string;
  lead1: string;
  lead2: string;
  audioLanguage: string;
  subtitleLanguage: string;
  musicMood: string;
  reelDuration: number;
}

export interface DraftData {
  inputType?: InputType;
  rawContent?: string;
  genre?: string;
  detectedScenes: Scene[];
  selectedScene?: Scene;
  settings: DraftSettings;
  generatedFrames: Frame[];
  caption: string;
  hashtags: string[];
}

export const INITIAL_DRAFT: DraftData = {
  detectedScenes: [],
  settings: {
    style: 'Realistic',
    lead1: '',
    lead2: '',
    audioLanguage: 'en',
    subtitleLanguage: 'en',
    musicMood: 'auto',
    reelDuration: 30,
  },
  generatedFrames: [],
  caption: '',
  hashtags: [],
};