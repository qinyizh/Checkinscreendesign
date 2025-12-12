import { useState } from 'react';
import { CheckInScreen } from './components/CheckInScreen';
import { PlayerScreen } from './components/PlayerScreen';
import { AfterglowScreen } from './components/AfterglowScreen';

type MoodType = 'heavy' | 'anxious' | 'chaotic';
type Screen = 'checkin' | 'player' | 'afterglow';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('checkin');
  const [selectedMood, setSelectedMood] = useState<MoodType>('heavy');

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setCurrentScreen('player');
  };

  const handleSessionComplete = () => {
    setCurrentScreen('afterglow');
  };

  const handleDismiss = () => {
    setCurrentScreen('checkin');
  };

  return (
    <div className="size-full">
      {currentScreen === 'checkin' && (
        <CheckInScreen onSelectMood={handleMoodSelect} />
      )}
      
      {currentScreen === 'player' && (
        <PlayerScreen mood={selectedMood} onComplete={handleSessionComplete} />
      )}
      
      {currentScreen === 'afterglow' && (
        <AfterglowScreen onDismiss={handleDismiss} />
      )}
    </div>
  );
}
