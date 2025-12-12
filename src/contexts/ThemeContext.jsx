import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage and apply to document
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.classList.toggle('light', !isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? {
      // Enhanced Dark theme colors - Modern Professional Palette
      background: 'from-slate-950 via-indigo-950 to-purple-950',
      surface: 'bg-slate-900/98',
      surfaceHover: 'hover:bg-slate-800/60',
      text: 'text-slate-50',
      textSecondary: 'text-slate-200',
      textMuted: 'text-slate-400',
      border: 'border-slate-700/60',
      accent: 'bg-gradient-to-r from-cyan-500 to-blue-600',
      accentHover: 'hover:from-cyan-400 hover:to-blue-500',
      cardBg: 'bg-gradient-to-br from-slate-800/90 to-slate-900/90',
      buttonPrimary: 'bg-gradient-to-r from-blue-600 to-purple-600',
      buttonSecondary: 'bg-gradient-to-r from-slate-700 to-slate-600'
    } : {
      // Enhanced Light theme colors - Clean Modern Palette
      background: 'from-slate-50 via-blue-50 to-indigo-50',
      surface: 'bg-white/98',
      surfaceHover: 'hover:bg-slate-100/60',
      text: 'text-slate-900',
      textSecondary: 'text-slate-700',
      textMuted: 'text-slate-500',
      border: 'border-slate-200/60',
      accent: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      accentHover: 'hover:from-blue-400 hover:to-indigo-500',
      cardBg: 'bg-gradient-to-br from-white/90 to-slate-50/90',
      buttonPrimary: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      buttonSecondary: 'bg-gradient-to-r from-slate-100 to-slate-200'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};