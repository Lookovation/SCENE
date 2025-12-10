import React from 'react';
import { Card } from '../ui/Card';
import { InputType } from '../../types';
import { Clipboard, Camera, FileText, Link as LinkIcon, Library, Search } from 'lucide-react';
import { GENRES, TRENDING_SCENES } from '../../constants';

interface HomeScreenProps {
  onInputSelect: (type: InputType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onInputSelect }) => {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search books, authors, genres..."
          className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Input Methods */}
      <div>
        <h2 className="text-xs font-bold text-gray-400 tracking-wider mb-3">START CREATING</h2>
        <div className="grid grid-cols-3 gap-3">
          <QuickAction 
            icon={<Clipboard size={24} />} 
            label="Paste Text" 
            color="bg-blue-50 text-blue-600"
            onClick={() => onInputSelect(InputType.TEXT)}
          />
          <QuickAction 
            icon={<Camera size={24} />} 
            label="Upload Img" 
            color="bg-purple-50 text-purple-600"
            onClick={() => onInputSelect(InputType.IMAGE)}
          />
          <QuickAction 
            icon={<FileText size={24} />} 
            label="Upload PDF" 
            color="bg-orange-50 text-orange-600"
            onClick={() => onInputSelect(InputType.PDF)}
          />
          <QuickAction 
            icon={<LinkIcon size={24} />} 
            label="Paste URL" 
            color="bg-green-50 text-green-600"
            onClick={() => onInputSelect(InputType.URL)}
          />
          <QuickAction 
            icon={<Library size={24} />} 
            label="Library" 
            color="bg-pink-50 text-pink-600"
            className="col-span-2"
            onClick={() => onInputSelect(InputType.LIBRARY)}
          />
        </div>
      </div>

      {/* Trending Scenes */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xs font-bold text-gray-400 tracking-wider">TRENDING SCENES</h2>
          <span className="text-xs text-blue-600 font-medium">View All</span>
        </div>
        <div className="space-y-3">
          {TRENDING_SCENES.map((scene, idx) => (
            <Card key={idx} className="flex items-center gap-4 hover:bg-gray-50" onClick={() => onInputSelect(InputType.LIBRARY)}>
              <div className={`p-3 rounded-xl bg-gray-50 ${scene.color}`}>
                <scene.icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{scene.title}</h3>
                <p className="text-sm text-gray-500 truncate">from "{scene.source}"</p>
              </div>
              <div className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                {scene.views}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Genres */}
      <div>
        <h2 className="text-xs font-bold text-gray-400 tracking-wider mb-3">BROWSE BY GENRE</h2>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((genre) => (
            <span key={genre} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const QuickAction: React.FC<{
  icon: React.ReactNode; 
  label: string; 
  color: string; 
  className?: string;
  onClick?: () => void;
}> = ({icon, label, color, className, onClick}) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-95 ${className}`}
  >
    <div className={`mb-2 p-2 rounded-full ${color}`}>
      {icon}
    </div>
    <span className="text-xs font-medium text-gray-700">{label}</span>
  </button>
);