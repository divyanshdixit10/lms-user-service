import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if theme is saved in localStorage or use system preference
  const getInitialTheme = (): ThemeMode => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPreference = window.localStorage.getItem('theme');
      
      if (storedPreference) {
        return storedPreference as ThemeMode;
      }
      
      // Check for system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    
    return 'light';
  };

  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);

  // Apply theme class to HTML element
  const applyTheme = (newTheme: ThemeMode) => {
    const root = window.document.documentElement;
    
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
  };

  // Store theme in localStorage and apply it
  const setTheme = (newTheme: ThemeMode) => {
    localStorage.setItem('theme', newTheme);
    setThemeState(newTheme);
  };

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Apply theme when it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 