import React, { useState, useEffect } from 'react';
import { DraftSettings } from '../../types';
import { Button } from '../ui/Button';
import { STYLES, LANGUAGES, MUSIC_MOODS, ACTOR_SUGGESTIONS } from '../../constants';
import { Settings, Music, Mic, Users, Film } from 'lucide-react';

interface CustomizeScreenProps {
  initialSettings: DraftSettings;
  genre: string;
  onGenerate: (settings: DraftSettings) => void;
}

export const CustomizeScreen: React.FC<CustomizeScreenProps> = ({ initialSettings, genre, onGenerate }) => {
  const [settings, setSettings] = useState<DraftSettings>(initialSettings);
  const actors = ACTOR_SUGGESTIONS[genre as keyof typeof ACTOR_SUGGESTIONS] || ACTOR_SUGGESTIONS['Romance'];

  return (
    <div className="space-y-8">
      
      {/* Visual Style */}
      <section>
        <SectionHeader icon={<Film size={18} />} title="Visual Style" />
        <div className="grid grid-cols-3 gap-2 mt-3">
          {STYLES.map(style => (
             <button
               key={style}
               onClick={() => setSettings({...settings, style})}
               className={`px-2 py-2 rounded-lg text-xs font-medium border transition-all ${
                 settings.style === style 
                 ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                 : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
               }`}
             >
               {style}
             </button>
          ))}
        </div>
      </section>

      {/* Cast */}
      <section>
        <SectionHeader icon={<Users size={18} />} title="Cast" />
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Lead Actor 1</label>
            <select 
              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-blue-500 focus:outline-none"
              value={settings.lead1}
              onChange={(e) => setSettings({...settings, lead1: e.target.value})}
            >
              <option value="">Select...</option>
              {actors.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Lead Actor 2</label>
            <select 
              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-blue-500 focus:outline-none"
              value={settings.lead2}
              onChange={(e) => setSettings({...settings, lead2: e.target.value})}
            >
              <option value="">Select...</option>
              {actors.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Audio & Subtitles */}
      <section>
        <SectionHeader icon={<Mic size={18} />} title="Audio & Language" />
        <div className="space-y-3 mt-3">
          <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl">
             <span className="text-sm font-medium text-gray-700">Audio Language</span>
             <select 
               className="bg-gray-50 border-none rounded-lg text-sm font-medium text-blue-600 focus:ring-0 cursor-pointer"
               value={settings.audioLanguage}
               onChange={(e) => setSettings({...settings, audioLanguage: e.target.value})}
             >
               {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
             </select>
          </div>
          <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl">
             <span className="text-sm font-medium text-gray-700">Subtitle Language</span>
             <select 
               className="bg-gray-50 border-none rounded-lg text-sm font-medium text-blue-600 focus:ring-0 cursor-pointer"
               value={settings.subtitleLanguage}
               onChange={(e) => setSettings({...settings, subtitleLanguage: e.target.value})}
             >
               {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
             </select>
          </div>
        </div>
      </section>

      {/* Music */}
      <section>
        <SectionHeader icon={<Music size={18} />} title="Background Music" />
        <div className="mt-3">
           <select 
             className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-blue-500 focus:outline-none"
             value={settings.musicMood}
             onChange={(e) => setSettings({...settings, musicMood: e.target.value})}
           >
             {MUSIC_MOODS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
           </select>
        </div>
      </section>

      <Button fullWidth onClick={() => onGenerate(settings)} className="mt-8">
        Generate Reel
      </Button>
    </div>
  );
};

const SectionHeader: React.FC<{icon: React.ReactNode, title: string}> = ({icon, title}) => (
  <div className="flex items-center gap-2 text-gray-900 border-b border-gray-100 pb-2">
    <span className="text-gray-400">{icon}</span>
    <h3 className="font-semibold text-sm uppercase tracking-wide">{title}</h3>
  </div>
);