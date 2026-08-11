'use client';

import React from 'react';
import { useTheme, ThemeMode } from '../context/ThemeContext';
import { Sun, Moon, Sparkles, Palette } from 'lucide-react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes: { id: ThemeMode; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5" />, color: 'bg-sky-500' },
    { id: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5" />, color: 'bg-slate-800' },
    { id: 'emerald', label: 'Emerald', icon: <Sparkles className="w-3.5 h-3.5" />, color: 'bg-emerald-600' },
    { id: 'purple', label: 'Purple', icon: <Palette className="w-3.5 h-3.5" />, color: 'bg-purple-600' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
            theme === t.id
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          title={`Switch to ${t.label} Theme`}
        >
          <span className={`w-2 h-2 rounded-full ${t.color}`}></span>
          {t.label}
        </button>
      ))}
    </div>
  );
}
