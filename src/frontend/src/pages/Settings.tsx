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

/**
 * SettingsPage component is responsible for rendering and managing the settings of the Memory Mint application.
 * It fetches the settings from the backend API, allows the user to modify them, and saves the changes back to the API.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <SettingsPage />
 *
 * @typedef {Object} Settings - The settings object structure.
 * @property {Object} user - User-specific settings.
 * @property {string} user.colorscheme - The color scheme setting.
 * @property {string} user.font - The font setting.
 * @property {boolean} user.notifications - The notifications setting.
 * @property {Object} cards - Card-specific settings.
 * @property {string} cards.order - The card order setting.
 * @property {string} cards.difficulty - The card difficulty setting.
 * @property {Object} animations - Animation-specific settings.
 * @property {boolean} animations.show - The show animations setting.
 * @property {number} animations.speed - The animation speed setting.
 * @property {Object} audio - Audio-specific settings.
 * @property {boolean} audio.on - The enable audio setting.
 * @property {number} audio.volume - The audio volume setting.
 *
 * @typedef {string} SettingSection - The section of the settings (e.g., 'user', 'cards', 'animations', 'audio').
 * @typedef {string | boolean | number} SettingValue - The value of a setting.
 *
 * @function handleChange
 * @description Handles changes to the settings state.
 * @param {SettingSection} section - The section of the settings to update.
 * @param {string} key - The key of the setting to update.
 * @param {SettingValue} value - The new value of the setting.
 *
 * @function handleSelectChange
 * @description Handles changes to select inputs.
 * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event.
 * @param {SettingSection} section - The section of the settings to update.
 * @param {string} key - The key of the setting to update.
 *
 * @function handleCheckboxChange
 * @description Handles changes to checkbox inputs.
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
 * @param {SettingSection} section - The section of the settings to update.
 * @param {string} key - The key of the setting to update.
 *
 * @function handleRangeChange
 * @description Handles changes to range inputs.
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
 * @param {SettingSection} section - The section of the settings to update.
 * @param {string} key - The key of the setting to update.
 *
 * @function handleSave
 * @description Handles saving the settings to the backend API.
 * @returns {Promise<void>} A promise that resolves when the save operation is complete.
 */

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
      window.location.href = "/"
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
                <option value="Baskerville">Baskerville</option>
                <option value="Book Antiqua">Book Antiqua</option>
                <option value="Calibri">Calibri</option>
                <option value="Cambria">Cambria</option>
                <option value="Candara">Candara</option>
                <option value="Century Gothic">Century Gothic</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Consolas">Consolas</option>
                <option value="Courier New">Courier New</option>
                <option value="Cursive">Cursive (Generic)</option>
                <option value="Fantasy">Fantasy (Generic)</option>
                <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
                <option value="Futura">Futura</option>
                <option value="Garamond">Garamond</option>
                <option value="Georgia">Georgia</option>
                <option value="Gill Sans">Gill Sans</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Impact">Impact</option>
                <option value="Lucida Console">Lucida Console</option>
                <option value="Monaco">Monaco</option>
                <option value="Monospace">Monospace (Generic)</option>
                <option value="Optima">Optima</option>
                <option value="Palatino Linotype">Palatino Linotype</option>
                <option value="Rockwell">Rockwell</option>
                <option value="Sans-serif">Sans-serif (Generic)</option>
                <option value="Serif">Serif (Generic)</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Verdana">Verdana</option>
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
