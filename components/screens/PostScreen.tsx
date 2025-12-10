import React from 'react';
import { DraftData } from '../../types';
import { Button } from '../ui/Button';
import { Share2, Download, Calendar, CheckCircle } from 'lucide-react';

interface PostScreenProps {
  draft: DraftData;
  onHome: () => void;
}

export const PostScreen: React.FC<PostScreenProps> = ({ draft, onHome }) => {
  return (
    <div className="space-y-8 text-center pt-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
        <CheckCircle size={32} />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Ready to Post!</h2>
        <p className="text-gray-500 mt-2">Your reel is rendered and saved.</p>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex gap-4 text-left">
         <div className="w-20 aspect-[9/16] bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            {draft.generatedFrames[0] && <img src={draft.generatedFrames[0].imageUrl} className="w-full h-full object-cover" />}
         </div>
         <div className="flex-1 min-w-0 py-1">
            <h3 className="font-bold text-gray-900 truncate">Book Reel #{Math.floor(Math.random()*1000)}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{draft.caption}</p>
            <div className="flex gap-2 mt-2">
               <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">0:30</span>
               <span className="text-[10px] bg-blue-50 px-2 py-0.5 rounded text-blue-600">HD</span>
            </div>
         </div>
      </div>

      <div className="space-y-3">
         <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            <PlatformRow name="TikTok" handle="@booklover" connected color="bg-black text-white" />
            <PlatformRow name="Instagram" handle="@book.reels" connected color="bg-pink-600 text-white" />
            <PlatformRow name="YouTube Shorts" handle="Connect Account" connected={false} color="bg-red-600 text-white" />
         </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
         <Button variant="outline" className="text-xs">
            <Calendar size={16} /> Schedule
         </Button>
         <Button variant="outline" className="text-xs">
            <Download size={16} /> Download
         </Button>
      </div>

      <Button fullWidth onClick={() => alert("Posted to selected platforms!")}>
         <Share2 size={18} /> Post Now
      </Button>
      
      <button onClick={onHome} className="text-gray-400 text-sm hover:text-gray-600">
         Back to Home
      </button>
    </div>
  );
};

const PlatformRow: React.FC<{name: string, handle: string, connected: boolean, color: string}> = ({name, handle, connected, color}) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
     <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
           {name[0]}
        </div>
        <div className="text-left">
           <h4 className="font-semibold text-sm text-gray-900">{name}</h4>
           <p className={`text-xs ${connected ? 'text-gray-500' : 'text-blue-500'}`}>{handle}</p>
        </div>
     </div>
     <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${connected ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'}`}>
        {connected && <CheckCircle size={12} />}
     </div>
  </div>
);