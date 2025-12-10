import { Box, Book, MonitorPlay, Ghost, Smile, User, Heart, Swords, Skull, Zap, Music, Mic, Film } from 'lucide-react';

export const GENRES = [
  'Romance', 'Action', 'Manga', 'Horror', 'Comedy', 'Thriller', 'Fantasy', 'Drama'
];

export const STYLES = [
  'K-Drama', 'Bollywood', 'Hollywood', 'Anime', 'Manga', 'Realistic', 'Vintage'
];

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "ko", name: "Korean" },
  { code: "hi", name: "Hindi" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
];

export const MUSIC_MOODS = [
  { id: "auto", name: "Auto-match to scene" },
  { id: "romantic_soft", name: "Romantic / Soft" },
  { id: "dramatic_intense", name: "Dramatic / Intense" },
  { id: "action_epic", name: "Action / Epic" },
  { id: "sad_emotional", name: "Sad / Emotional" },
  { id: "happy_upbeat", name: "Happy / Upbeat" },
  { id: "horror_dark", name: "Horror / Dark" },
];

export const ACTOR_SUGGESTIONS = {
  "Romance": ["V (BTS)", "Jungkook", "IU", "Jennie", "Timothée Chalamet", "Zendaya"],
  "Action": ["Tom Cruise", "Jason Statham", "Chris Evans", "Gal Gadot"],
  "K-Drama": ["Park Seo Joon", "Hyun Bin", "Son Ye Jin"],
  "Bollywood": ["Shah Rukh Khan", "Deepika Padukone", "Ranbir Kapoor"],
};

export const TRENDING_SCENES = [
  { title: "The silent confession", source: "Love in Seoul", views: "45K", icon: Heart, color: "text-pink-500" },
  { title: "Final battle scene", source: "Shadow Warriors", views: "38K", icon: Swords, color: "text-red-500" },
  { title: "The awkward first date", source: "Clumsy Hearts", views: "29K", icon: Smile, color: "text-yellow-500" },
];

// Mock data to use when API key is missing or for simulation
export const MOCK_SCENES = [
  {
    id: "1",
    title: "The Confrontation",
    description: "She stood by the window, rain pouring outside, refusing to look at him.",
    type: "Emotional Drama",
    duration: 35
  },
  {
    id: "2",
    title: "The Doorbell",
    description: "After three years of silence, the doorbell rang. She knew exactly who it was.",
    type: "Romantic Tension",
    duration: 28
  },
  {
    id: "3",
    title: "The Reunion",
    description: "He stood there, soaking wet, holding the letter she wrote five years ago.",
    type: "Climax",
    duration: 45
  }
];

export const MOCK_FRAMES = [
  { id: '1', imagePrompt: 'Woman standing by rainy window, melancholic expression', duration: 3, description: 'Opening shot, rain sounds', imageUrl: 'https://picsum.photos/400/700?random=1' },
  { id: '2', imagePrompt: 'Close up of hand clutching a letter', duration: 5, description: 'Focus on the trembling hand', imageUrl: 'https://picsum.photos/400/700?random=2' },
  { id: '3', imagePrompt: 'Silhouette of a man in the doorway', duration: 4, description: 'The arrival', imageUrl: 'https://picsum.photos/400/700?random=3' },
  { id: '4', imagePrompt: 'Woman turns around slowly, tear on cheek', duration: 6, description: 'The reveal', imageUrl: 'https://picsum.photos/400/700?random=4' },
  { id: '5', imagePrompt: 'Two figures staring at each other across the room', duration: 4, description: 'Tension peak', imageUrl: 'https://picsum.photos/400/700?random=5' },
];