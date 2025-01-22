import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Settings {
  user: {
    colorscheme: string;
    font: string;
    notifications: boolean;
  };
  cards: {
    order: string;
    font: string;
    difficulty: string;
  };
  animations: {
    show: boolean;
    speed: number;
  };
  audio: {
    on: boolean;
    volume: number;
    correct: string;
    incorrect: string;
  };
}

type SettingSection = keyof Settings;
type SettingValue = string | number | boolean;

const SettingsPage: React.FC = () => {
  const [settingsState, setSettingsState] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/settings`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSettingsState(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(`Failed to load settings: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (section: SettingSection, key: string, value: SettingValue): void => {
    if (!settingsState) return;
    
    setSettingsState(prev => ({
      ...prev!,
      [section]: {
        ...prev![section],
        [key]: value
      }
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, section: SettingSection, key: string): void => {
    handleChange(section, key, e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, section: SettingSection, key: string): void => {
    handleChange(section, key, e.target.checked);
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>, section: SettingSection, key: string): void => {
    handleChange(section, key, Number(e.target.value));
  };

  const handleSave = async (): Promise<void> => {
    if (!settingsState) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsState),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Failed to save settings: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  if (!settingsState) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-200 text-xl">No settings data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden bg-gray-900">
      <Navigation className="" />
      <div className="max-w-2xl mx-auto mt-5">
        <h1 className="text-3xl font-bold text-green-400 mb-8">Memory Mint Settings</h1>
        
        {/* User Settings */}
        <div className="mb-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-green-400 mb-4">User Interface</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-200 mb-2">Color Scheme</label>
              <select 
                value={settingsState.user.colorscheme}
                onChange={(e) => handleSelectChange(e, 'user', 'colorscheme')}
                className="w-full bg-gray-700 text-gray-200 p-2 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
              >
                <option value="default">Default</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-200 mb-2">Font</label>
              <select 
                value={settingsState.user.font}
                onChange={(e) => handleSelectChange(e, 'user', 'font')}
                className="w-full bg-gray-700 text-gray-200 p-2 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
              >
                <option value="Arial">Arial</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-200">Notifications</label>
              <input 
                type="checkbox"
                checked={settingsState.user.notifications}
                onChange={(e) => handleCheckboxChange(e, 'user', 'notifications')}
                className="h-4 w-4 text-green-400 rounded focus:ring-green-400 focus:ring-opacity-25 bg-gray-700 border-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Game Settings */}
        <div className="mb-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-green-400 mb-4">Game Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-200 mb-2">Card Order</label>
              <select 
                value={settingsState.cards.order}
                onChange={(e) => handleSelectChange(e, 'cards', 'order')}
                className="w-full bg-gray-700 text-gray-200 p-2 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
              >
                <option value="random">Random</option>
                <option value="sequential">Sequential</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-200 mb-2">Difficulty</label>
              <select 
                value={settingsState.cards.difficulty}
                onChange={(e) => handleSelectChange(e, 'cards', 'difficulty')}
                className="w-full bg-gray-700 text-gray-200 p-2 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
              >
                <option value="all">All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="mb-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-green-400 mb-4">Display Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-200">Show Animations</label>
              <input 
                type="checkbox"
                checked={settingsState.animations.show}
                onChange={(e) => handleCheckboxChange(e, 'animations', 'show')}
                className="h-4 w-4 text-green-400 rounded focus:ring-green-400 focus:ring-opacity-25 bg-gray-700 border-gray-600"
              />
            </div>
            <div>
              <label className="block text-gray-200 mb-2">Animation Speed</label>
              <input 
                type="range"
                min="0"
                max="200"
                step="10"
                value={settingsState.animations.speed}
                onChange={(e) => handleRangeChange(e, 'animations', 'speed')}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-400"
              />
            </div>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="mb-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-green-400 mb-4">Audio Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-200">Enable Audio</label>
              <input 
                type="checkbox"
                checked={settingsState.audio.on}
                onChange={(e) => handleCheckboxChange(e, 'audio', 'on')}
                className="h-4 w-4 text-green-400 rounded focus:ring-green-400 focus:ring-opacity-25 bg-gray-700 border-gray-600"
              />
            </div>
            <div>
              <label className="block text-gray-200 mb-2">Volume</label>
              <input 
                type="range"
                min="0"
                max="100"
                value={settingsState.audio.volume}
                onChange={(e) => handleRangeChange(e, 'audio', 'volume')}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-400"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <LoadingSpinner /> : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
