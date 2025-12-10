import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { HomeScreen } from './components/screens/HomeScreen';
import { InputScreen } from './components/screens/InputScreen';
import { SceneSelectionScreen } from './components/screens/SceneSelectionScreen';
import { CustomizeScreen } from './components/screens/CustomizeScreen';
import { GenerationScreen } from './components/screens/GenerationScreen';
import { PreviewScreen } from './components/screens/PreviewScreen';
import { PostScreen } from './components/screens/PostScreen';
import { Screen, DraftData, INITIAL_DRAFT, InputType, Scene, DraftSettings } from './types';
import { MOCK_FRAMES } from './constants';
import { analyzeContent, generateCaption } from './services/geminiService';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  const [draft, setDraft] = useState<DraftData>(INITIAL_DRAFT);
  const [isLoading, setIsLoading] = useState(false);

  // --- Handlers ---

  const handleInputSelect = (type: InputType) => {
    setDraft({ ...INITIAL_DRAFT, inputType: type });
    setCurrentScreen(Screen.INPUT);
  };

  const handleAnalyze = async (content: string, genre: string) => {
    setIsLoading(true);
    setDraft(prev => ({ ...prev, rawContent: content, genre }));
    setCurrentScreen(Screen.SCENE_SELECTION);
    
    // Call Gemini (or Mock)
    const scenes = await analyzeContent(content, genre);
    
    setDraft(prev => ({ ...prev, detectedScenes: scenes }));
    setIsLoading(false);
  };

  const handleSceneSelect = async (scene: Scene) => {
    setDraft(prev => ({ ...prev, selectedScene: scene }));
    setCurrentScreen(Screen.CUSTOMIZE);
  };

  const handleGenerate = (settings: DraftSettings) => {
    setDraft(prev => ({ ...prev, settings }));
    setCurrentScreen(Screen.GENERATING);
  };

  const handleGenerationComplete = async () => {
    // Populate draft with mock generated data + AI Caption
    const { caption, hashtags } = await generateCaption(draft.selectedScene?.description || "");
    
    setDraft(prev => ({ 
      ...prev, 
      generatedFrames: MOCK_FRAMES, // In real app, this comes from video gen API
      caption,
      hashtags
    }));
    setCurrentScreen(Screen.PREVIEW);
  };

  const handleApprove = (finalDraft: DraftData) => {
    setDraft(finalDraft);
    setCurrentScreen(Screen.POST);
  };

  const handleBack = () => {
    // Simple history logic
    switch(currentScreen) {
      case Screen.INPUT: setCurrentScreen(Screen.HOME); break;
      case Screen.SCENE_SELECTION: setCurrentScreen(Screen.INPUT); break;
      case Screen.CUSTOMIZE: setCurrentScreen(Screen.SCENE_SELECTION); break;
      case Screen.PREVIEW: setCurrentScreen(Screen.CUSTOMIZE); break;
      case Screen.POST: setCurrentScreen(Screen.PREVIEW); break;
      default: break;
    }
  };

  // --- Render ---

  return (
    <Layout 
      title={currentScreen === Screen.HOME ? undefined : getTitle(currentScreen)} 
      onBack={currentScreen !== Screen.HOME && currentScreen !== Screen.GENERATING ? handleBack : undefined}
    >
      {currentScreen === Screen.HOME && (
        <HomeScreen onInputSelect={handleInputSelect} />
      )}

      {currentScreen === Screen.INPUT && draft.inputType && (
        <InputScreen inputType={draft.inputType} onAnalyze={handleAnalyze} />
      )}

      {currentScreen === Screen.SCENE_SELECTION && (
        <SceneSelectionScreen 
          scenes={draft.detectedScenes} 
          onSelect={handleSceneSelect} 
          loading={isLoading} 
        />
      )}

      {currentScreen === Screen.CUSTOMIZE && (
        <CustomizeScreen 
          initialSettings={draft.settings} 
          genre={draft.genre || "Romance"}
          onGenerate={handleGenerate} 
        />
      )}

      {currentScreen === Screen.GENERATING && (
        <GenerationScreen onComplete={handleGenerationComplete} />
      )}

      {currentScreen === Screen.PREVIEW && (
        <PreviewScreen 
          draft={draft} 
          onUpdateDraft={setDraft} 
          onApprove={handleApprove} 
        />
      )}

      {currentScreen === Screen.POST && (
        <PostScreen draft={draft} onHome={() => setCurrentScreen(Screen.HOME)} />
      )}
    </Layout>
  );
};

const getTitle = (screen: Screen): string => {
  switch(screen) {
    case Screen.INPUT: return "Add Content";
    case Screen.SCENE_SELECTION: return "Select Scene";
    case Screen.CUSTOMIZE: return "Customize Reel";
    case Screen.PREVIEW: return "Preview & Edit";
    case Screen.POST: return "Post Reel";
    default: return "";
  }
}

export default App;