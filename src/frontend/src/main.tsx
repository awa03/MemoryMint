import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import settings from '@/config/settings.json';

// const root = document.documentElement;
// const userFont = settings.user?.font || 'Arial, sans-serif';
// const cardFont = settings.cards?.font || userFont; 

// root.style.setProperty('--user-font', userFont);
// root.style.setProperty('--card-font', cardFont);

// Render the React app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
