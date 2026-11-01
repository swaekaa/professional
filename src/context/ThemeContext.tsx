import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AccentColor {
  id: string;
  name: string;
  primary: string;
  hover: string;
  dim: string;
  glow: string;
}

export const ACCENT_COLORS: AccentColor[] = [
  { id: 'orange', name: 'Burnt Orange', primary: '#E45B43', hover: '#FF775E', dim: '#8B2E1E', glow: 'rgba(228, 91, 67, 0.35)' },
  { id: 'crimson', name: 'Crimson', primary: '#E11D48', hover: '#FB7185', dim: '#881337', glow: 'rgba(225, 29, 72, 0.35)' },
  { id: 'amber', name: 'Amber Gold', primary: '#F59E0B', hover: '#FBBF24', dim: '#92400E', glow: 'rgba(245, 158, 11, 0.35)' },
  { id: 'emerald', name: 'Emerald', primary: '#10B981', hover: '#34D399', dim: '#065F46', glow: 'rgba(16, 185, 129, 0.35)' },
  { id: 'cyan', name: 'Electric Cyan', primary: '#06B6D4', hover: '#22D3EE', dim: '#155E75', glow: 'rgba(6, 182, 212, 0.35)' },
  { id: 'indigo', name: 'Cobalt', primary: '#6366F1', hover: '#818CF8', dim: '#3730A3', glow: 'rgba(99, 102, 241, 0.35)' },
  { id: 'violet', name: 'Violet', primary: '#8B5CF6', hover: '#A78BFA', dim: '#5B21B6', glow: 'rgba(139, 92, 246, 0.35)' },
  { id: 'silver', name: 'Monochrome', primary: '#D4D4D8', hover: '#FFFFFF', dim: '#52525B', glow: 'rgba(212, 212, 216, 0.35)' },
];

interface ThemeContextType {
  accent: AccentColor;
  setAccentColor: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  accent: ACCENT_COLORS[0],
  setAccentColor: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccent] = useState<AccentColor>(() => {
    try {
      const saved = localStorage.getItem('ekaansh_accent');
      if (saved) {
        const found = ACCENT_COLORS.find((c) => c.id === saved);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    return ACCENT_COLORS[0];
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', accent.primary);
    root.style.setProperty('--accent-hover', accent.hover);
    root.style.setProperty('--accent-dim', accent.dim);
    root.style.setProperty('--accent-glow', accent.glow);

    try {
      localStorage.setItem('ekaansh_accent', accent.id);
    } catch {
      // ignore
    }
  }, [accent]);

  const setAccentColor = (id: string) => {
    const found = ACCENT_COLORS.find((c) => c.id === id);
    if (found) setAccent(found);
  };

  return (
    <ThemeContext.Provider value={{ accent, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

