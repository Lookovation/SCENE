import React, { useEffect, useState } from 'react';

interface GenerationScreenProps {
  onComplete: () => void;
}

export const GenerationScreen: React.FC<GenerationScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  const steps = [
    "Analyzing scene logic...",
    "Writing screenplay...",
    "Generating visuals (Shot 1/5)...",
    "Generating visuals (Shot 3/5)...",
    "Synthesizing voice actors...",
    "Composing background music...",
    "Final rendering..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Small delay before finishing
          return 100;
        }
        return prev + 2; // Increment progress
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Update text step based on progress
  useEffect(() => {
    const stepIndex = Math.floor((progress / 100) * steps.length);
    setStep(Math.min(stepIndex, steps.length - 1));
  }, [progress]);

  return (
    <div className="h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 relative mb-8">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={251.2}
            strokeDashoffset={251.2 - (251.2 * progress) / 100}
            className="text-blue-600 transition-all duration-300 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-900">{progress}%</span>
        </div>
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 mb-2">Creating Your Reel</h2>
      <p className="text-gray-500 font-medium h-6">{steps[step]}</p>
      
      <div className="mt-12 p-4 bg-yellow-50 rounded-xl border border-yellow-100 max-w-xs">
        <p className="text-xs text-yellow-700">
          💡 <strong>Tip:</strong> While you wait, think about hashtags! You can edit them in the next step.
        </p>
      </div>
    </div>
  );
};