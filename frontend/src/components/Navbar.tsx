'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LayoutGrid, List, Plus, User, ShieldCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  viewMode: 'board' | 'list';
  onViewChange: (mode: 'board' | 'list') => void;
  onOpenNewTask: () => void;
  guestUser: { username: string; token: string } | null;
  onGuestLogin: () => void;
}

export function Navbar({ viewMode, onViewChange, onOpenNewTask, guestUser, onGuestLogin }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 theme-bg-card border-b theme-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition">
            AS
          </div>
          <div>
            <span className="font-extrabold text-base theme-text-main tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition">
              AbleSpace
            </span>
            <span className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
              Task Engine
            </span>
          </div>
        </Link>

        {/* View Switcher & Theme Selector */}
        <div className="flex items-center gap-3">
          {/* Theme Selector */}
          <ThemeSwitcher />

          {/* View Toggle */}
          <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border theme-border">
            <button
              onClick={() => onViewChange('board')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                viewMode === 'board'
                  ? 'bg-white dark:bg-slate-700 theme-text-main shadow-sm'
                  : 'theme-text-muted hover:theme-text-main'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Board
            </button>
            <button
              onClick={() => onViewChange('list')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-700 theme-text-main shadow-sm'
                  : 'theme-text-muted hover:theme-text-main'
              }`}
            >
              <List className="w-3.5 h-3.5" /> List
            </button>
          </div>

          {/* Guest User / Login */}
          {guestUser ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden md:inline">{guestUser.username}</span>
            </div>
          ) : (
            <button
              onClick={onGuestLogin}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs border theme-border flex items-center gap-1.5 transition"
            >
              <User className="w-3.5 h-3.5 text-sky-500" /> Guest Login
            </button>
          )}

          {/* Create Task Button */}
          <button
            onClick={onOpenNewTask}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition transform active:scale-95"
          >
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>
      </div>
    </header>
  );
}
