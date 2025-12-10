import React, { useState } from 'react';
import { InputType } from '../../types';
import { Button } from '../ui/Button';
import { Upload, FileText, Link, Camera } from 'lucide-react';

interface InputScreenProps {
  inputType: InputType;
  onAnalyze: (content: string, genre: string) => void;
}

export const InputScreen: React.FC<InputScreenProps> = ({ inputType, onAnalyze }) => {
  const [content, setContent] = useState('');
  const [genre, setGenre] = useState('Romance');
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);

  const handleAction = () => {
    if (inputType !== InputType.TEXT && !isSimulatingUpload) {
       // Simulate upload process
       setIsSimulatingUpload(true);
       setTimeout(() => {
         setIsSimulatingUpload(false);
         // Provide mock content for non-text inputs
         onAnalyze("Simulated extracted text from upload...", genre);
       }, 1500);
    } else {
       onAnalyze(content, genre);
    }
  };

  const renderInputArea = () => {
    switch(inputType) {
      case InputType.TEXT:
        return (
          <textarea 
            className="w-full h-64 bg-white border border-gray-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            placeholder="Paste your book excerpt, manga dialogue, or story here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        );
      case InputType.IMAGE:
      case InputType.PDF:
        return (
          <div className="w-full h-64 bg-white border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={handleAction}>
             {isSimulatingUpload ? (
               <div className="animate-pulse flex flex-col items-center">
                 <div className="w-12 h-12 bg-gray-200 rounded-full mb-3"></div>
                 <p className="text-sm text-gray-400">Scanning & Extracting...</p>
               </div>
             ) : (
               <>
                 <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                   {inputType === InputType.IMAGE ? <Camera size={32} /> : <FileText size={32} />}
                 </div>
                 <h3 className="font-semibold text-gray-900 mb-1">
                   Tap to Upload {inputType === InputType.IMAGE ? 'Image' : 'PDF'}
                 </h3>
                 <p className="text-xs text-gray-500 max-w-[200px]">
                   Supported: JPG, PNG, PDF. We'll extract text and scenes automatically.
                 </p>
               </>
             )}
          </div>
        );
      case InputType.URL:
        return (
          <div className="space-y-4">
             <div className="relative">
                <Link className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input 
                  type="url" 
                  className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="https://wattpad.com/story/..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
             </div>
             <p className="text-xs text-gray-500 px-2">Supported: Wattpad, AO3, Webtoon links.</p>
          </div>
        );
      default:
        return <div className="p-4 text-center">Library browser not implemented in MVP</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold text-gray-400 tracking-wider mb-2 uppercase">Title (Optional)</label>
        <input 
          type="text" 
          placeholder="Story Title..."
          className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 tracking-wider mb-2 uppercase">Genre Hint</label>
        <select 
          value={genre} 
          onChange={(e) => setGenre(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option value="Romance">Romance</option>
          <option value="Action">Action</option>
          <option value="Manga">Manga</option>
          <option value="Thriller">Thriller</option>
          <option value="Comedy">Comedy</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 tracking-wider mb-2 uppercase">Content</label>
        {renderInputArea()}
      </div>

      {inputType === InputType.TEXT && (
        <Button 
          fullWidth 
          onClick={() => onAnalyze(content, genre)}
          disabled={!content}
        >
          Analyze Content
        </Button>
      )}
    </div>
  );
};