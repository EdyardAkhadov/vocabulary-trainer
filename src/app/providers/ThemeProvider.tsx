import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type AppTheme = 'system' | 'light' | 'dark';

type ThemeContextValue = {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'vocab-theme';

function isAppTheme(value: string | null): value is AppTheme {
  return value === 'system' || value === 'light' || value === 'dark';
}

function getInitialTheme(): AppTheme {
  const stored = localStorage.getItem(STORAGE_KEY);

  return isAppTheme(stored) ? stored : 'system';
}

function applyTheme(theme: AppTheme) {
  const root = document.documentElement;

  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const shouldUseDark = theme === 'dark' || (theme === 'system' && systemDark);

  root.classList.toggle('dark', shouldUseDark);

  root.style.colorScheme = shouldUseDark ? 'dark' : 'light';
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<AppTheme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);

    if (theme !== 'system') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function handleSystemThemeChange() {
      applyTheme('system');
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  function setTheme(nextTheme: AppTheme) {
    localStorage.setItem(STORAGE_KEY, nextTheme);

    setThemeState(nextTheme);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}
