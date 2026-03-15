import React, { createContext, useContext, useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { MD3LightTheme, configureFonts } from "react-native-paper";
import { theme as defaultTheme } from "../theme/theme";
import { fontConfig } from "../theme/fontConfig";
import { fetchActiveTheme } from "../api/themeApi";
import { ThemeDto } from "../types/dto";

type AppTheme = typeof defaultTheme;

interface ThemeContextValue {
  appTheme: AppTheme;
  festivalTheme: ThemeDto | null;
}

const ThemeContext = createContext<ThemeContextValue>({
  appTheme: defaultTheme,
  festivalTheme: null,
});

export function useAppTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [festivalTheme, setFestivalTheme] = useState<ThemeDto | null>(null);

  const loadTheme = async () => {
    try {
      const data = await fetchActiveTheme();
      setFestivalTheme(data);
    } catch (error) {
      console.error("Failed to load festival theme:", error);
    }
  };

  // Load on mount
  useEffect(() => {
    loadTheme();
  }, []);

  // Reload when app comes to foreground (picks up theme changes without restart)
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextState: AppStateStatus) => {
        if (nextState === "active") {
          loadTheme();
        }
      }
    );
    return () => subscription.remove();
  }, []);

  // Build theme: merge festival colors on top of defaults
  const appTheme: AppTheme = festivalTheme
    ? {
        ...MD3LightTheme,
        colors: {
          ...MD3LightTheme.colors,
          ...defaultTheme.colors,
          ...festivalTheme.light,
        },
        fonts: configureFonts({ config: fontConfig }),
      }
    : defaultTheme;

  return (
    <ThemeContext.Provider value={{ appTheme, festivalTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
