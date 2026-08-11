'use client';

import React, { useState } from 'react';
import { User, ShieldCheck, X, ArrowRight, Shield } from 'lucide-react';

interface GuestLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string) => void;
  currentGuest: { username: string; token: string } | null;
}

export function GuestLoginModal({ isOpen, onClose, onLogin, currentGuest }: GuestLoginModalProps) {
  const [customName, setCustomName] = useState('Guest Educator');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    onLogin(customName.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="theme-bg-card rounded-3xl max-w-md w-full p-8 border theme-border shadow-2xl space-y-6 relative overflow-hidden">
        {/* Background Accent Gradient */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold theme-text-main">
            Guest Educator Access
          </h3>
          <p className="text-xs theme-text-muted leading-relaxed">
            Continue as a guest to explore caseload management and task tracking.
          </p>
        </div>

        {/* Current Guest Status */}
        {currentGuest && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 text-xs">
            <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Active Session
              </span>
              <span className="font-mono text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full">GUEST</span>
            </div>
            <div className="theme-text-main font-semibold">
              Signed in as: <span className="underline">{currentGuest.username}</span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold theme-text-main mb-1.5 uppercase tracking-wider">
              Educator Display Name
            </label>
            <input
              type="text"
              required
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Guest Educator"
              className="w-full px-4 py-3 rounded-xl border theme-border theme-bg-main theme-text-main text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition transform active:scale-98"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t theme-border text-center text-[11px] theme-text-muted flex items-center justify-center gap-1">
          <Shield className="w-3.5 h-3.5 text-sky-500" />
          <span>Guest session enabled</span>
        </div>
      </div>
    </div>
  );
}
