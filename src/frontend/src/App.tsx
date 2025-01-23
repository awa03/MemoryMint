import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from '@/pages/Home';
import SettingsPage from '@/pages/Settings';

interface GlobalSettings {
  user: {
    colorscheme: 'default' | 'dark' | 'light';
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

const App: React.FC = () => {
  const [settings, setSettings] = useState<GlobalSettings | null>(null);

  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/settings`);
        const data = await response.json();
        setSettings(data);

        // Apply theme
        const theme = data.user?.colorscheme || 'default';
        document.documentElement.setAttribute('data-theme', theme);
        
        // Optional: Apply specific theme colors
        if (theme === 'dark') {
          document.body.classList.add('bg-theme-dark-background', 'text-theme-dark-text');
        } else if (theme === 'light') {
          document.body.classList.add('bg-theme-light-background', 'text-theme-light-text');
        } else {
          document.body.classList.add('bg-theme-default-background', 'text-theme-default-text');
        }
      } catch (error) {
        console.error('Failed to load settings', error);
      }
    };

    fetchGlobalSettings();
  }, []);

  const updateSettings = (newSettings: Partial<GlobalSettings>) => {
    setSettings(prev => {
      const updatedSettings = prev ? { ...prev, ...newSettings } : null;
      
      if (updatedSettings && updatedSettings.user?.colorscheme) {
        document.documentElement.setAttribute('data-theme', updatedSettings.user.colorscheme);
      }
      
      return updatedSettings;
    });
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
