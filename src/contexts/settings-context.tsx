'use client';

import React, { createContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';

type Language = 'tenglish' | 'telugu';
type Theme = 'light' | 'dark';
type FontSize = 'sm' | 'md' | 'lg' | 'xl';
type LastRead = { book: string; chapter: number } | null;

interface SettingsContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  lastRead: LastRead;
  setLastRead: (location: LastRead) => void;
  isLoaded: boolean;
}

export const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

// Helper to get item from localStorage
function getInitialState<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key “${key}”:`, error);
    return defaultValue;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [language, setLanguageState] = useState<Language>('tenglish');
  const [theme, setThemeState] = useState<Theme>('dark');
  const [fontSize, setFontSizeState] = useState<FontSize>('md');
  const [lastRead, setLastReadState] = useState<LastRead>(null);

  useEffect(() => {
    setLanguageState(getInitialState('bible_language', 'tenglish'));
    setThemeState(getInitialState('bible_theme', 'dark'));
    setFontSizeState(getInitialState('bible_fontSize', 'md'));
    setLastReadState(getInitialState('bible_lastRead', null));
    setIsLoaded(true);
  }, []);
  
  useEffect(() => {
    if (isLoaded) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('bible_theme', JSON.stringify(theme));
    }
  }, [theme, isLoaded]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if(isLoaded) localStorage.setItem('bible_language', JSON.stringify(lang));
  }, [isLoaded]);
  
  const setTheme = useCallback((th: Theme) => {
    setThemeState(th);
  }, []);

  const setFontSize = useCallback((size: FontSize) => {
    setFontSizeState(size);
    if(isLoaded) localStorage.setItem('bible_fontSize', JSON.stringify(size));
  }, [isLoaded]);

  const setLastRead = useCallback((location: LastRead) => {
    setLastReadState(location);
    if(isLoaded) localStorage.setItem('bible_lastRead', JSON.stringify(location));
  }, [isLoaded]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    theme,
    setTheme,
    fontSize,
    setFontSize,
    lastRead,
    setLastRead,
    isLoaded,
  }), [language, setLanguage, theme, setTheme, fontSize, setFontSize, lastRead, setLastRead, isLoaded]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
