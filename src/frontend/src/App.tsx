import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from '@/pages/Home';
import SettingsPage from '@/pages/Settings';

interface GlobalSettings {
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

export const GlobalSettingsContext = React.createContext<{
  settings: GlobalSettings | null;
  updateSettings: (newSettings: Partial<GlobalSettings>) => void;
}>({
  settings: null,
  updateSettings: () => {}
});

/**
 * The main application component.
 * 
 * This component is responsible for fetching and applying global settings,
 * and providing the settings context to the rest of the application.
 * 
 * @returns The main application component.
 * 
 * @component
 * 
 * @example
 * ```tsx
 * import React from 'react';
 * import { App } from './App';
 * 
 * const Root = () => (
 *   <React.StrictMode>
 *     <App />
 *   </React.StrictMode>
 * );
 * 
 * export default Root;
 * ```
 * 
 * @remarks
 * This component uses the `useEffect` hook to fetch global settings from an API
 * and apply them to the document's root element. It also provides a context
 * for accessing and updating these settings throughout the application.
 * 
 * @hook
 * - `useState` to manage the global settings state.
 * - `useEffect` to fetch and apply global settings on component mount.
 * 
 * @context
 * - `GlobalSettingsContext` to provide the settings and update function.
 * 
 * @see {@link GlobalSettingsContext}
 * @see {@link GlobalSettings}
 */
const App: React.FC = () => {
  const [settings, setSettings] = useState<GlobalSettings | null>(null);

  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/settings`);
        const data = await response.json();
        setSettings(data);

        // Apply global settings
        document.documentElement.style.setProperty(
          '--user-font', 
          data.user?.font || 'Arial, sans-serif'
        );
        document.documentElement.style.setProperty(
          '--card-font', 
          data.cards?.font || 'Arial, sans-serif'
        );
        document.documentElement.setAttribute(
          'data-theme', 
          data.user?.colorscheme || 'default'
        );
      } catch (error) {
        console.error('Failed to load settings', error);
      }
    };

    fetchGlobalSettings();
  }, []);

  const updateSettings = (newSettings: Partial<GlobalSettings>) => {
    setSettings(prev => prev ? { ...prev, ...newSettings } : null);
  };

  return (
    <GlobalSettingsContext.Provider value={{ settings, updateSettings }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </GlobalSettingsContext.Provider>
  );
};

export default App;
