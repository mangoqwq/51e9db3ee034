'use client';

import { createContext, useContext, useCallback, useEffect, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

function getTheme(): Theme {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function setTheme(theme: Theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
}

const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
    listeners.add(onStoreChange);
    return () => listeners.delete(onStoreChange);
}

function notifyListeners() {
    listeners.forEach((fn) => fn());
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useSyncExternalStore(
        subscribe,
        getTheme,
        () => 'light' as Theme
    );

    // Sync localStorage → DOM on mount (in case inline script didn't run before hydration)
    useEffect(() => {
        const stored = localStorage.getItem('theme');
        const isDark = document.documentElement.classList.contains('dark');
        if (stored === 'dark' && !isDark) {
            document.documentElement.classList.add('dark');
            notifyListeners();
        } else if (stored === 'light' && isDark) {
            document.documentElement.classList.remove('dark');
            notifyListeners();
        }
    }, []);

    const toggleTheme = useCallback(() => {
        const next = getTheme() === 'dark' ? 'light' : 'dark';
        setTheme(next);
        notifyListeners();
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
