import React, { createContext, useContext, useCallback } from 'react';
import {
  ThemeProvider as ThemeProviderStyledComponents,
  DefaultTheme,
} from 'styled-components';

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

import usePersistedState from './usePersistedState';

interface ThemeContextData {
  theme: DefaultTheme;
  toggleTheme: () => void;
}

interface ThemeContextProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemeProvider = ({ children }: ThemeContextProps): React.ReactElement => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>(
    'ombro-amigo-theme',
    light,
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light);
  }, [theme.title, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProviderStyledComponents theme={theme}>
        {children}
      </ThemeProviderStyledComponents>
    </ThemeContext.Provider>
  );
};

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider2');
  }
  return context;
}

export { ThemeProvider, useTheme };
