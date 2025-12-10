import React, { useState } from 'react';
import { DraftData, Frame } from '../../types';
import { Button } from '../ui/Button';
import { Play, Pause, RefreshCw, Scissors, Volume2, Edit3, Trash2 } from 'lucide-react';

interface PreviewScreenProps {
  draft: DraftData;
  onApprove: (draft: DraftData) => void;
  onUpdateDraft: (draft: DraftData) => void;
}

export const PreviewScreen: React.FC<PreviewScreenProps> = ({ draft, onApprove, onUpdateDraft }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [editingFrame, setEditingFrame] = useState<Frame | null>(null);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleRemoveFrame = (id: string) => {
    const newFrames = draft.generatedFrames.filter(f => f.id !== id);
    onUpdateDraft({ ...draft, generatedFrames: newFrames });
    setEditingFrame(null);
  };

  const handleRegenerateFrame = (id: string) => {
    // Simulate regeneration by changing ID/URL
    const newFrames = draft.generatedFrames.map(f => {
       if (f.id === id) return { ...f, imageUrl: `https://picsum.photos/400/700?random=${Math.random()}` };
       return f;
    });
    onUpdateDraft({ ...draft, generatedFrames: newFrames });
    setEditingFrame(null);
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateDraft({ ...draft, caption: e.target.value });
  };

  const currentFrame = draft.generatedFrames[currentFrameIndex] || draft.generatedFrames[0];

  return (
    <div className="space-y-6">
      {/* Video Player Area */}
      <div className="relative aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-xl group">
        {currentFrame && (
          <img 
            src={currentFrame.imageUrl} 
            alt="Preview" 
            className="w-full h-full object-cover opacity-90"
          />
        )}
        
        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-between p-4">
           {/* Top Info */}
           <div className="flex justify-between items-start text-white text-xs drop-shadow-md">
              <span className="bg-black/40 px-2 py-1 rounded backdrop-blur-sm">Preview Mode</span>
              <div className="flex gap-2">
                 <button className="p-2 bg-black/40 rounded-full hover:bg-black/60"><Volume2 size={16} /></button>
              </div>
           </div>

           {/* Center Play Button */}
           <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={togglePlay}
                className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all active:scale-95"
              >
                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
              </button>
           </div>

           {/* Bottom Subtitles Preview */}
           <div className="mb-8 text-center">
              <p className="text-white font-bold text-lg drop-shadow-lg px-4 leading-tight">
                {currentFrame?.description}
              </p>
           </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
           <div className="h-full bg-blue-500 w-1/3"></div>
        </div>
      </div>

      {/* Frame Timeline/Editor */}
      <div>
        <div className="flex justify-between items-center mb-2">
           <h3 className="text-xs font-bold text-gray-400 tracking-wider">FRAME EDITOR</h3>
           <div className="flex gap-2">
              <button className="text-xs text-blue-600 flex items-center gap-1"><RefreshCw size={12}/> Regen All</button>
           </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
           {draft.generatedFrames.map((frame, idx) => (
             <div 
               key={frame.id} 
               onClick={() => setEditingFrame(frame)}
               className={`relative flex-shrink-0 w-20 aspect-[9/16] rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${editingFrame?.id === frame.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent'}`}
             >
               <img src={frame.imageUrl} className="w-full h-full object-cover" />
               <div className="absolute bottom-0 right-0 bg-black/60 text-white text-[10px] px-1 rounded-tl">
                 {frame.duration}s
               </div>
               <div className="absolute top-1 left-1 bg-white/80 text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                 {idx + 1}
               </div>
             </div>
           ))}
           <button className="flex-shrink-0 w-20 aspect-[9/16] rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-500">
              <span className="text-2xl">+</span>
           </button>
        </div>
      </div>

      {/* Frame Edit Modal (Inline for MVP) */}
      {editingFrame && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-bottom-4">
           <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-gray-900">Edit Frame</h4>
              <button onClick={() => setEditingFrame(null)} className="text-gray-400 hover:text-gray-600">✕</button>
           </div>
           <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" className="text-xs py-2" onClick={() => handleRegenerateFrame(editingFrame.id)}>
                 <RefreshCw size={14} /> Regenerate
              </Button>
              <Button variant="outline" className="text-xs py-2 text-red-600 border-red-100 hover:bg-red-50" onClick={() => handleRemoveFrame(editingFrame.id)}>
                 <Trash2 size={14} /> Remove
              </Button>
           </div>
           <div className="mt-3">
              <label className="text-xs text-gray-500">Prompt</label>
              <p className="text-xs text-gray-800 bg-gray-50 p-2 rounded mt-1">{editingFrame.imagePrompt}</p>
           </div>
        </div>
      )}

      {/* Caption & Metadata */}
      <div className="space-y-3">
         <div>
            <label className="block text-xs font-bold text-gray-400 mb-2">CAPTION</label>
            <textarea 
               value={draft.caption}
               onChange={handleCaptionChange}
               className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:ring-blue-500 focus:outline-none"
               rows={3}
            />
         </div>
         <div className="flex flex-wrap gap-2">
            {draft.hashtags.map(tag => (
               <span key={tag} className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-md">
                 {tag}
               </span>
            ))}
            <button className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1 hover:bg-gray-200">
               <Edit3 size={10} /> Edit Tags
            </button>
         </div>
      </div>

      <Button fullWidth onClick={() => onApprove(draft)} className="py-4 text-lg shadow-blue-300">
         Approve & Continue →
      </Button>
    </div>
  );
};