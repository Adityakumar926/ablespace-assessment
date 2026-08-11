import './globals.css';
import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';

export const metadata = {
  title: 'AbleSpace | Task Management System',
  description: 'Task Management System technical assessment for AbleSpace Full Stack position.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="theme-bg-main theme-text-main antialiased min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
