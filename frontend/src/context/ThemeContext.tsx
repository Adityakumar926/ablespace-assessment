'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'emerald' | 'purple';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('light');

  useEffect(() => {
    // Read persisted theme from localStorage
    const saved = localStorage.getItem('ablespace_theme') as ThemeMode | null;
    if (saved && ['light', 'dark', 'emerald', 'purple'].includes(saved)) {
      setThemeState(saved);
      document.documentElement.className = saved;
    } else {
      document.documentElement.className = 'light';
    }
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('ablespace_theme', newTheme);
    document.documentElement.className = newTheme;

    // Optional API push to NestJS backend for preference syncing
    fetch('http://localhost:4000/api/themes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: newTheme }),
    }).catch(() => {});
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
