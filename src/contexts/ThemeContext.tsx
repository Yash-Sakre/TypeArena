import { createContext } from "react";

import { useTheme } from "../hooks/useTheme";

type ThemeContextType = ReturnType<typeof useTheme>;

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { themeName, setTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
