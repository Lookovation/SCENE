import React from 'react';
import { Scene } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Clock, TrendingUp, Sparkles } from 'lucide-react';

interface SceneSelectionScreenProps {
  scenes: Scene[];
  onSelect: (scene: Scene) => void;
  loading?: boolean;
}

export const SceneSelectionScreen: React.FC<SceneSelectionScreenProps> = ({ scenes, onSelect, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Analyzing Story...</h2>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            Our AI is identifying the most viral-worthy moments from your content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex items-start gap-3">
        <Sparkles className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <h3 className="text-sm font-bold text-blue-900">AI found {scenes.length} scenes</h3>
          <p className="text-xs text-blue-700 mt-1">Select the one you want to convert into a Reel.</p>
        </div>
      </div>

      <div className="space-y-4">
        {scenes.map((scene) => (
          <Card key={scene.id} className="group hover:border-blue-400" onClick={() => onSelect(scene)}>
             <div className="flex justify-between items-start mb-2">
               <span className="px-2 py-1 rounded bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                 {scene.type}
               </span>
               <div className="flex items-center gap-1 text-gray-400 text-xs">
                 <Clock size={12} />
                 <span>{scene.duration}s</span>
               </div>
             </div>
             <h3 className="font-bold text-gray-900 text-lg mb-2">{scene.title}</h3>
             <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
               "{scene.description}"
             </p>
             <Button variant="outline" fullWidth className="text-sm py-2 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200">
               Select This Scene
             </Button>
          </Card>
        ))}
      </div>
      
      <div className="pt-4 text-center">
        <button className="text-sm text-gray-500 font-medium underline">Highlight custom selection instead</button>
      </div>
    </div>
  );
};